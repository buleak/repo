use async_session::{MemoryStore, Session, SessionStore};
use axum::{
    async_trait,
    extract::{
        rejection::TypedHeaderRejectionReason, FromRef, FromRequestParts, Query, State, TypedHeader,
    },
    http::{header::SET_COOKIE, HeaderMap, StatusCode},
    response::{IntoResponse, Redirect, Response},
    routing::{get, post},
    Json, RequestPartsExt, Router, Server,
};
use http::{header, request::Parts};
use oauth2::{
    basic::BasicClient, reqwest::async_http_client, AuthUrl, AuthorizationCode, ClientId,
    ClientSecret, CsrfToken, RedirectUrl, Scope, TokenResponse, TokenUrl,
};
use serde::{Deserialize, Serialize};
use std::{env, net::SocketAddr};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

static COOKIE_NAME: &str = "SESSION";

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "example_oauth=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let store = MemoryStore::new();
    let oauth_client = oauth_client();
    let app_state = AppState {
        store,
        oauth_client,
    };

    let app = Router::new()
        .route("/", get(root))
        .route("/create_account", post(create_account))
        .route("/login_account", post(login_account))
        .route("/auth/discord", get(discord_auth))
        .route("/auth/authorized", get(login_authorized))
        .route("/protected", get(protected))
        .route("/logout", get(logout))
        .with_state(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::debug!("listening on {}", addr);

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
// 序列化
#[derive(Serialize)]
struct Account {
    id: i64,
    user_name: String,
}

#[derive(Deserialize)]
struct LoginAccount {
    user_name: String,
    pass_word: String,
}

#[derive(Clone)]
struct AppState {
    store: MemoryStore,
    oauth_client: BasicClient,
}
impl FromRef<AppState> for MemoryStore {
    fn from_ref(state: &AppState) -> Self {
        state.store.clone()
    }
}
impl FromRef<AppState> for BasicClient {
    fn from_ref(state: &AppState) -> Self {
        state.oauth_client.clone()
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct User {
    id: String,
    avatar: Option<String>,
    username: String,
    discriminator: String,
}

// 反序列化
#[derive(Deserialize)]
struct CreateAccount {
    user_name: String,
}

async fn root(user: Option<User>) -> impl IntoResponse {
    match user {
        Some(u) => format!("Hello {}! 你已经登录了! \n", u.username),
        None => "你没有登录".to_string(),
    }
}

async fn create_account(Json(payload): Json<CreateAccount>) -> impl IntoResponse {
    let account = Account {
        id: 123,
        user_name: payload.user_name,
    };
    (StatusCode::CREATED, Json(account))
}

async fn login_account(Json(payload): Json<LoginAccount>) -> impl IntoResponse {
    if payload.user_name == "buleak" && payload.pass_word == "123" {
        return (StatusCode::OK, Json(true));
    } else {
        return (StatusCode::UNAUTHORIZED, Json(false));
    };
}

fn oauth_client() -> BasicClient {
    // client_id & client_secret: 在github申请
    let client_id = env::var("CLIENT_ID").expect("沒有 client_id");
    let client_secret = env::var("CLIENT_SECRET").expect("沒有 client_secret");
    // github携带code 跳转到redirect_url接口路径，后端在该接口中使用code，向github请求token
    let redirect_url = env::var("REDIRECT_UTL")
        .unwrap_or_else(|_| "http://127.0.0.1:3000/auth/authorized".to_string());
    // 跳转到auth_url链接，进入github的授权页面，确定授权操作
    let auth_url = env::var("AUTH_URL").unwrap_or_else(|_| {
        "https://github.com/login/oauth/authorize".to_string()
    });
    // 拿到code后，请求token_url路径接口，获取access_token & refresh_token
    let token_url = env::var("TOKEN_URL")
        .unwrap_or_else(|_| "https://github.com/login/oauth/access_token".to_string());

    BasicClient::new(
        ClientId::new(client_id),
        Some(ClientSecret::new(client_secret)),
        AuthUrl::new(auth_url).unwrap(),
        Some(TokenUrl::new(token_url).unwrap()),
    )
    .set_redirect_uri(RedirectUrl::new(redirect_url).unwrap())
}

// 不一致auth
async fn discord_auth(State(client): State<BasicClient>) -> impl IntoResponse {
    let (auth_url, _csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        .add_scope(Scope::new("identify".to_string()))
        .url();

    Redirect::to(auth_url.as_ref())
}

//
#[derive(Debug, Deserialize)]
#[allow(dead_code)]
struct AuthRequest {
    code: String,
    state: String,
}

async fn login_authorized(
    Query(query): Query<AuthRequest>,
    State(store): State<MemoryStore>,
    State(oauth_client): State<BasicClient>,
) -> impl IntoResponse {
    let token = oauth_client
        .exchange_code(AuthorizationCode::new(query.code.clone()))
        .request_async(async_http_client)
        .await
        .unwrap();

    let client = reqwest::Client::new();
    let user_data = client
        .get("https://discordapp.com/api/users/@me")
        .bearer_auth(token.access_token().secret())
        .send()
        .await
        .unwrap()
        .json::<User>()
        .await
        .unwrap();

    let mut session = Session::new();
    session.insert("user", &user_data).unwrap();

    let cookie = store.store_session(session).await.unwrap().unwrap();

    let cookie = format!("{}={}; SameSite=Lax; Path=/", COOKIE_NAME, cookie);

    let mut header = HeaderMap::new();
    header.insert(SET_COOKIE, cookie.parse().unwrap());
    (header, Redirect::to("/"))
}

async fn logout(
    State(store): State<MemoryStore>,
    TypedHeader(cookies): TypedHeader<headers::Cookie>,
) -> impl IntoResponse {
    let cookie = cookies.get(COOKIE_NAME).unwrap();
    let session = match store.load_session(cookie.to_string()).await.unwrap() {
        Some(s) => s,
        None => return Redirect::to("/"),
    };

    store.destroy_session(session).await.unwrap();
    Redirect::to("/")
}

// 请求该接口，需要已获取token。如果没有token，将重定向到auth页面
async fn protected(user: User) -> impl IntoResponse {
    format!("欢迎来到保护区 ：）\n 这是您的信息吗？\n{:?}", user);
    (StatusCode::OK, Json(user))
}

//
struct AuthRedirect;
impl IntoResponse for AuthRedirect {
    fn into_response(self) -> Response {
        Redirect::temporary("/auth/discord").into_response()
    }
}

#[async_trait]
impl<S> FromRequestParts<S> for User
where
    MemoryStore: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AuthRedirect;
    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let store = MemoryStore::from_ref(state);

        let cookies = parts
            .extract::<TypedHeader<headers::Cookie>>()
            .await
            .map_err(|e| match *e.name() {
                header::COOKIE => match e.reason() {
                    TypedHeaderRejectionReason::Missing => AuthRedirect,
                    _ => panic!("unexpected error getting Cookie header(s): {}", e),
                },
                _ => panic!("unexpected error getting cookies: {}", e),
            })?;
        let session_cookie = cookies.get(COOKIE_NAME).ok_or(AuthRedirect)?;

        let session = store
            .load_session(session_cookie.to_string())
            .await
            .unwrap()
            .ok_or(AuthRedirect)?;

        let user = session.get::<User>("user").ok_or(AuthRedirect)?;

        Ok(user)
    }
}
