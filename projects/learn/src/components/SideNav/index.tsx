import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useGetTheme } from "@/stores/getters";
import { staticNav } from "./staticNav";

const { Sider } = Layout;

const SideNav = () => {
  const theme = useGetTheme();
  const handleClickLink: MenuProps["onClick"] = e => {
    console.log("e ==>", e);
  };
  return (
    <Sider>
      <Menu
        mode="vertical"
        theme={theme}
        onClick={handleClickLink}
        items={staticNav}
      />
    </Sider>
  );
};
export default SideNav;
