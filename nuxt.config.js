export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'expense',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/_main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: 'AIzaSyDnpBZqHvq4K2qk5OlaapWwALEd5jMetVM',
    //       authDomain: 'expense-cbf76.firebaseapp.com',
    //       projectId: 'expense-cbf76',
    //       storageBucket: 'expense-cbf76.appspot.com',
    //       messagingSenderId: '646757079218',
    //       appId: '1:646757079218:web:e095c9b87fcce8c71151ab',
    //       measurementId: 'G-55JE4HTPL5',
    //       databaseURL: 'https://expense-cbf76-default-rtdb.firebaseio.com/',
    //     },
    //     services: {
    //       database: true,
    //       auth: true,
    //     },
    //   },
    // ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  styleResources: {
    scss: ['./assets/scss/_main.scss'],
  },
};
