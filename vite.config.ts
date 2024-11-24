import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/static': 'http://localhost:4000',
      },
    },
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@store': path.resolve(__dirname, 'src/store'),
      },
    },
    plugins: [react()],
  };
});
