// 路由的唯一UI文件
// 动态路由(可选的捕获)，params将传递给 layout.tsx, page.tsx, route, generateMetadata函数
// [...Route]: 可以捕获该动态路由的子路由， 也可以不捕获当前路由，如：/user，/user/buleak，/user/buleak/mors
// 返回的params为：{}，{userName: ['buleak']}，{userName: ['buleak', 'mors']}
interface Props {
  params:{
    userId: string[]
  },
  children: React.ReactNode
}
const User = ({params}:Props) => {
  return (
    <>
      <div>User ID： {params.userId[0]}</div>
    </>
  );
};
export default User;
