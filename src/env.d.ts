/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly GOOGLE_PLACES_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
