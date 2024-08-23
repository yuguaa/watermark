// vite.config.js
import { format, resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Watermark',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'umd', 'cjs']
    }
  }
})
