import { FC } from "react";
interface Props {
  size?: string;
  style?: string;
}
const Logo: FC<Props> = ({ size = "w-24 h-24", style }) => {
  return (
    <svg
      className={`i-carbon-logo-github text-blue bg-blue-2 shadow-2xl shadow-coolGray ${size} ${style}`}
    />
  );
};
export default Logo;
