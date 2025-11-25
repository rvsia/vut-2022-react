import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Mkcert()],
});
