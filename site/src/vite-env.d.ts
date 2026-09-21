/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string
  readonly VITE_USE_MODELS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
