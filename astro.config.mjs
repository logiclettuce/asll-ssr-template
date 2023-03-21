import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind({
    config: { path: './tailwind.config.mjs' },
  })],
});

// https://github.com/jonasmerlin/astro-seo for seo
// nanostore for persisting user data
// <Image/> for image optimization https://docs.astro.build/en/guides/images/
// tailwind for css
// ssr (by default) and node deployment
// custom auth

// do not forget!!! useful for auth https://astro.build/blog/experimental-server-side-rendering/