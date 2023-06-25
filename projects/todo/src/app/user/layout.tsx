// 为该路由及其子级创建共同的UI

interface Props {
  children: React.ReactNode;
}

// 当前页面的元数据
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default ({ children }: Props) => {
  return (
    <html>
      <body>
        <header>this is header</header>
        <section>{children}</section>
        <footer>this is footer</footer>
      </body>
    </html>
  );
};