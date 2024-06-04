/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_YOUTUBE_KEY: string;
  readonly VITE_APP_USER_API_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
