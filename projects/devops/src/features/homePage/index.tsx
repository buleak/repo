import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SideNav from "@/components/SideNav";
import HeaderNav from '@/components/HeaderNav';

import { useDispatch } from "@/stores";
import { logOut } from "@/stores/slice_common";

const { Content } = Layout;

const HomePage = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };
  return (
    <Layout>
      <SideNav />
      <Layout>
        <HeaderNav />
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <div>
        {/* 侧边菜单 SideNav */}
        {/* 顶部Header */}
        {/* 主体Main Container */}
        {/* 底部Footer */}
        <button onClick={logout}>logout</button>
      </div>
    </Layout>
  );
};
export default HomePage;
