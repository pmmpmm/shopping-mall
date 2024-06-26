/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_DB_URL: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_USER_ROLE: string;
  readonly VITE_FIREBASE_ACCESS_TOKEN: string;
  readonly VITE_FIREBASE_REFRESH_TOKEN: string;
  readonly VITE_CLOUDINARY_PRESET_NAME: string;
  readonly VITE_CLOUDINARY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
