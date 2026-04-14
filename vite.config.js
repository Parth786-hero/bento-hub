// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   base: process.env.VITE_BASE_URL || "/",
//   // base: "/bento-hub-ui/",

//   plugins: [react(),tailwindcss()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/bento-hub-ui/" : "/",
    plugins: [react(), tailwindcss()],
  }
})
