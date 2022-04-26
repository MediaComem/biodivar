import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  

  const config = {
    plugins: [vue({
      template: {
        compilerOptions: {
          // Allow A-Frame elements to be in Vue template
          isCustomElement: tag => tag.startsWith('a-')
        }
      }
    })],
    base: ''
  };

  // define specific env configuration
  /* if (mode === 'development') {
    config.server = {
      proxy : {
        '/api/v1': {
          target: 'https://inf.onivers.com/api/v1',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/v1/, '')
        }
      }
    }
  } */

  return config;

});