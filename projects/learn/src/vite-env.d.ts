/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASE_URL: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}