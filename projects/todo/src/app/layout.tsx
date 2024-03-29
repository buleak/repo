import './globals.css'

// 将元数据添加到html中。 即<head> ... </head>
// 也可以通过 generateetadata函数 去请求动态的元数据
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout默认是Server Component
  // 根Layout必须包含 html & body， 子Layout不用
  // 根Layout不可以设置为Client Component， 子Layout可以
  // 无法在父子Layout间传递数据，但是可以在两个Layout中都请求该数据，React会自动删除重复请求， 不会影响性能
  // 可以通过`路由组`创建多个根Layout
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
