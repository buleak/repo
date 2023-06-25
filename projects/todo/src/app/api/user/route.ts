// api端点
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
// 动态api： GET方法有传入参数， 或其他方法，或使用了动态函数：如cookies & headers
// 静态api
export const GET = async () => {
  const data = { name: "mors", key: 12 };
  return NextResponse.json({ data });
};

// 动态api（因为要接收client传入的参数）
export const POST = async (request: NextRequest, {params}:{params:any}) => {
  const headerList = headers();
  const referer = headerList.get("referer");
  // const res = await fetch(`http://data/.../${userId}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "APT-key": process.env.NODE_ENV，
  //      "Set-Cookie": `token=${token}`
  //   }
  // })
  // const data = await res.json();

  const data = { name: "mors", key: 12 };
  return NextResponse.json({ data });
};
