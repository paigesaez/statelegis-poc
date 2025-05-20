/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 