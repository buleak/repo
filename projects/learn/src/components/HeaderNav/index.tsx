import { Layout } from "antd";
import {Logo} from '@/components/Icons';

const { Header } = Layout;

const HeaderNav = () => {
  return (
    <Header>
      <Logo size="w-20 h-20" />
    </Header>
  );
};
export default HeaderNav;
