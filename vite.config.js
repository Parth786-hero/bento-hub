  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig(({ mode }) => {
    return {
      base: mode === "production" ? "/bento-hub-ui/" : "/",
      plugins: [react(), tailwindcss()]
    }
  })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig(({ mode }) => {
//   return {
//     base: mode === "production" ? "/bento-hub-ui/" : "/",
//     plugins: [react(), tailwindcss()],
//     build: {
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             react: ['react', 'react-dom'],
//             ui: ['framer-motion', 'lucide-react'],
//             utils: ['lodash', 'axios']
//           }
//         }
//       },
//       // chunkSizeWarningLimit: 1000 // optional, raises the warning threshold
//     }
//   }
// })

