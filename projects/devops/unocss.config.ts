import "@unocss/core";
import {
  defineConfig,
  presetUno,
  presetIcons,
  presetTagify,
  presetWebFonts,
  presetTypography,
  presetAttributify,
} from "unocss";

// http://${Local}/__unocss: unocss检查器: 查看,播放,分析自定义规则和设置
export default defineConfig({
  // 预设
  presets: [
    presetUno(), // 默认预设, 支持tailwind, bootstrap, tachyons, windicss规则
    presetIcons({}), // 图标预设
    presetTagify({
      extraProperties(matched) {
        // 注入额外unocss规则
        // 当标签前缀为 `i-`时, 注入display: inline-block
        return matched.startsWith("i-") ? { display: "inline-block" } : {};
      },
      prefix: "un-", // 可以指定标签前缀: <un-text-red>
    }), // 标签模式: 仅单unocss规则: <text-red>
    presetWebFonts(), // 字体预设
    presetTypography(), // 排版预设
    presetAttributify(), // 属性模式 <div border="red rd solid">
  ],
  // css层级
  layers: {
    components: -1,
    default: 1,
    utilities: 2,
    custom_layer: 3,
  },
  // 扩展主题
  theme: {
    // 断点, 仅断点作为例外会覆盖默认值, 而不是合并
    breakpoints: {
      sm: "320px",
      md: "640px",
    },
    // 指定属性将合并到默认主题
    colors: {
      veryCool: "#0000ff", // class="test-very-cool"
      brand: {
        primary: "hsla(var(--hue, 217), 78%, 51%)", // class="bg-brand-primary"
      },
    },
  },
  // 自定义规则
  rules: [
    // [rule_name, style, layer]
    ["m-1", { margin: "0.25rem" }, { layer: "utilities" }],
    [/^p-(\d+)$/, (match: any) => ({ padding: `${match[1] / 4}rem` })],
    // 在自定义规则中使用theme
    [
      /^text-(.*)$/,
      (match: RegExpMatchArray, { theme }) => {
        const match_name = match[0];
        // 如果class= text-very-cool, 就会拿到 veryCool|very:{cool} 作为match_name
        const theme_color = theme.colors[match_name];
        if (theme_color) {
          return {
            color: theme_color,
          };
        }
      },
    ],
  ],
  // 快捷方式
  shortcuts: [
    {
      btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
    },
    [
      /^btn-(.*)$/,
      (match: RegExpMatchArray) =>
        `bg-${match[1]}-400 text-${match[1]}-100 py-2 ppx-4 rounded-lg`,
    ],
  ],
  // 安全列表: 始终生成指定的css
  safelist: ["p-1", "p-2", "m-1"],
});
