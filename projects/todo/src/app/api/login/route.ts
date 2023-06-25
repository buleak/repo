import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import excuteQuery from '../db'
// export const runtime = "edge" // 指定运行时, edge | nodejs

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // 获取 path params 参数
  const slug = params.slug; // slug是自己设置的动态路由段名称 user/[slug]/xxx
  console.log("[10] slug >> ", slug);

  // 获取 get query 参数
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  console.log("[15] username >> ", username);

  // 获取 post body参数
  const res = await req.json();
  console.log("[20] res >> ", res);

  // 获取 cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // 获取 headers
  const headerStore = headers();
  const referer = headerStore.get("referer");

  // 重定向 redirect
  // redirect('/homepage')

  try {
    excuteQuery({
      query: 'select username,password from user where username = ?',
      values: 'buleak'
    })
  } catch (error) {
    
  }

  return NextResponse.json(
    {
      msg: "success",
    },
    {
      status: 206,
      headers: {
        "Set-Cookie": `token=${searchParams.get("w")}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
  // return new Response(JSON.stringify({
  //   a: 1,
  //   b: 2,
  //   resBody,
  //   q: searchParams.getAll("q"),
  // }), {
  //   status: 200,
  //   headers: {
  //     'Set-Cookie': `token=${searchParams.get("w")}`
  //   }
  // })
}
