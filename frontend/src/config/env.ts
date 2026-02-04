export const ENV = import.meta.env.VITE_ENV as
  | "development"
  | "test"
  | "production";

export const API_URL: string = import.meta.env.VITE_API_URL;

export const MAX_CODE_SIZE: number = Number(
  import.meta.env.VITE_MAX_CODE_SIZE
);
