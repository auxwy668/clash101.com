import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ PER-SITE: change `site` to the actual domain
export default defineConfig({
  site: 'https://clash101.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: { cssMinify: false },
  },
});
