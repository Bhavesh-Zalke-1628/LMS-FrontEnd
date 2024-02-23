import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxy from 'proxy'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
