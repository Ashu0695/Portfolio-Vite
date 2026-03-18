import { defineConfig } from 'vite'

export default defineConfig({
  // This ensures that all asset paths in the built index.html are relative (./) rather than absolute (/).
  // This is the most common reason why CSS/images fail to load on live previews and CDNs.
  base: './',
  build: {
    outDir: 'dist',
  }
})
