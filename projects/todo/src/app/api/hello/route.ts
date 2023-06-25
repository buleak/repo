// route.ts 不能与 app/page.tsx在同一层级+
// 支持： GET/POET/PUT/PATCH/DELETE/HEAD/OPTIONS
export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}
