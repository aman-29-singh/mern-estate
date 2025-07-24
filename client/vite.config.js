import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server:{ //we define this inside defineConfig()
    proxy:{//with proxy jaise url mein '/api' dikhega waise hii server 3000 par i.e browser par 3000 aa jayega
      '/api':{//jaise address mein starting mein '/api' dikhega app server 3000 par request send kar doge
        target:'http://localhost:3000',
        secure:false,
      },
    },
  },

  plugins: [react()],
   resolve: {
   dedupe: ['swiper'],  // 👈 This avoids duplicate swiper versions
  },
})
