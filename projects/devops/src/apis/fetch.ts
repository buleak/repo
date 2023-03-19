import { useGetAccessToken } from "@/stores/getters";
import { IncomingHttpHeaders } from "http";
import { Navigate } from "react-router-dom";

export interface FetchInit {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: IncomingHttpHeaders;
  body?: string;
  // 请求模式: 跨域请求/简单请求/同源请求
  mode: "cors" | "no-cors" | "same-origin";
  // 发送凭证(cookie): 不发送/同源时发送/ 发送
  credentials: "omit" | "same-origin" | "include";
  // 缓存模式
  cache:
    | "default" // 有效期内使用缓存, 过期询问缓存是否变动, 未变动则使用缓存, 更新缓存
    | "no-cache" // 不关心缓存有效期, 直接询问缓存是否变动, 未变动则使用缓存, 更新缓存
    | "force-cache" // 不关心缓存有效期, 直接使用缓存, 无缓存则请求新数据, 更新缓存
    | "only-if-cached" // 不关心缓存有效期, 直接使用缓存, 无缓存则报错
    | "no-store" // 不使用缓存, 不更新缓存
    | "reload"; // 不使用缓存, 更新缓存
  // 重定向模式: 重定向/报错/手动指定是否重定向
  redirect: "follow" | "error" | "manual";
  // 请求来源
  referrer?: "no-referrer" | "client" | string;
  // 请求来源策略
  referrerPolicy:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url";
  integrity?: string;
}
// Omit<A, B>: 从A中剔除B
// Override<A, B>: 使用B替换A中的属性B
export declare type Override<T1, T2> = T2 extends any
  ? Omit<T1, keyof T2> & T2
  : never;
declare type CustomRequestInit = Override<
  RequestInit,
  {
    body?: any;
  }
>;

export const fetchInit: CustomRequestInit = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: [
    // 'Content-Type': 'text/plain',
    // 'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    ["Content-Type", "application/json;charset=utf-8"],
  ],
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

type InterceptorRequestFn = (
  init: CustomRequestInit | undefined
) => CustomRequestInit | undefined;
type InterceptorResponseFn = (res: Response) => any;
const interceptorRequest: InterceptorRequestFn[] = [];
const interceptorResponse: InterceptorResponseFn[] = [];

let progress = false;
interceptorRequest.push(init => {
  progress = true;
  // 如果有access_token, 加到header里
  const access_token = 111; //useGetAccessToken();
  console.log("access_token ==>", access_token);
  // 如果没有access_token, 重定向到 `/login`
  if (!access_token) {
    Navigate({
      to: "/login",
      replace: true,
      state: {
        from: location.href,
      },
    });
    return;
  }
  // const headers = new Headers();
  // headers.append("Authorization", `Bearer ${access_token}`);
  // init.headers = headers;
  return init;
});

interceptorResponse.push((res: Response) => {
  // 如果后端返回access_token过期, 传递refresh_token, 重新获取access_token
  progress = false;
  if (res.status === 401) {
    Navigate({
      to: "/login",
      replace: true,
      state: {
        from: location.href,
      },
    });
  }
  if (res.ok) {
    return res.json();
  }
});

export const axios = (url: string | Request, init?: CustomRequestInit) => {
  let newInit: CustomRequestInit | undefined = { ...fetchInit, ...init };

  // 请求拦截
  for (let fn of interceptorRequest) {
    newInit = fn(newInit);
    if (!newInit) return Promise.reject(newInit);
  }
  if (newInit && newInit?.method === "POST" && newInit?.body) {
    newInit.body = JSON.stringify(newInit.body);
  }

  return new Promise<Response>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, newInit)
      .then((res: Response) => {
        // 响应拦截
        interceptorResponse.forEach((fn: InterceptorResponseFn) => {
          res = fn(res);
        });
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
