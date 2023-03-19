// 解决 tsx不识别 unocss属性模式, 报错问题
import type { AttributifyAttributes } from "unocss/preset-attributify";
declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    // 自定义属性
    prose?: string;
  }
}
