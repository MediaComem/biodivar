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

  return config;

});