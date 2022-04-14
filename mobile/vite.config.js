import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  // define env specific configuration
  modeConfig = {};
  if (mode === 'development') {
    modeConfig.server = {
      proxy : {
        '/api/v1': {
          target: 'https://inf.onivers.com/api/v1',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/v1/, '')
        }
      }
    }
  }

  return {

    plugins: [vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('a-')
        }
      }
    })],

    base: '',

    ...modeConfig

  }
});