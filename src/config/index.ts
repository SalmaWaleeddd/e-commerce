export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://fakestoreapi.com',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    key: import.meta.env.VITE_API_KEY,
  },
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'E-commerce Store',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
} as const;