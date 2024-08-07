// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === "production" ? false : true },

  app: {
    head: {
      title: "Marie-Claire Balabanian | Portfolio",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      htmlAttrs: {
        lang: "en-US",
      },
      meta: [
        {
          name: "author",
          content: "Marie-Claire Balabanian",
        },
        {
          name: "description",
          content:
            "Marie-Claire Balabanian has been building engaging user experiences for over 5 years as a professional web developer. She likes making beautiful things.",
        },
        {
          name: "keywords",
          content:
            "Web Developer, Web Development, Frontend, Backend, HTML, CSS, Javascript, JavaScript, Vue, Nuxt, Wordpress, Django, Wagtail, Marketing, Digital Marketing, Website, Web App, API",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/img/favicon/favicon.ico",
        },
        {
          rel: "shortcut icon",
          type: "image/png",
          sizes: "192x192",
          href: "/img/favicon/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/img/favicon/android-chrome-512x512.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/img/favicon/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/img/favicon/favicon-32x32.png",
        },
        {
          rel: "preconnect",
          href: `${process.env.SANITY_ID}.api.sanity.io`,
        },
        {
          rel: "dns-prefetch",
          href: `${process.env.IMAGEKIT}.api.sanity.io`,
        },
      ],
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxtjs/sanity"],

  components: {
    dirs: [
      {
        path: "~/components",
        global: true,
      },
      "~/components",
    ],
  },

  runtimeConfig: {
    public: {
      sanity_media: process.env.SANITY_MEDIA,
      imagekit: process.env.IMAGEKIT,
      sendgrid_api_key: process.env.SENDGRID_API_KEY,
      sendgrid_from: process.env.SENDGRID_FROM,
      sendgrid_to: process.env.SENDGRID_TO,
    },
  },

  sanity: {
    projectId: process.env.SANITY_ID,
    apiVersion: "2022-03-25",
    useCdn: true,
  },

  imports: {
    dirs: ["stores", "composables"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },

  plugins: ["~/plugins/sanityImageBuilder"],
  compatibilityDate: "2024-07-24",
});