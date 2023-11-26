declare global {
  interface ImportMeta {
    env: {
      VITE_MAIN_API: string | undefined;
    };
  }
}

export const envVariables = {
  mainApiUrl: import.meta.env.VITE_MAIN_API ?? '',
};
