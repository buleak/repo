import type { MenuProps } from "antd";
export type MenuItem = Required<MenuProps>["items"][number];
export const staticNav: MenuItem[] = [
  {
    label: "首页",
    key: "/",
    icon: "i-carbon-home",
    children: [{ label: "children1", key: "/children1" }],
  },
];
