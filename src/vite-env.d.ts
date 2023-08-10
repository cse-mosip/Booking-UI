/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_BACKEND_URL: string;
  readonly REACT_APP_SOCKET_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
