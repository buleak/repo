// 路由的唯一UI文件
// 动态路由，params将传递给 layout.tsx, page.tsx, route, generateMetadata函数
interface Props {
  params:{
    userId: string
  },
  children: React.ReactNode
}
const User = ({params}:Props) => {
  return (
    <>
      <div>User ID： {params.userId}</div>
    </>
  );
};
export default User;
