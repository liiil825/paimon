export default {
  ssr: true,
  components: true,

  server: {
    port: 5000, // default: 3000
    host: '127.0.0.1' // default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: "utf-8" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/sass/main.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~plugins/cloudbase', ssr: false
  }, {
    src: '~plugins/filters', ssr: true
  }, {
    src: '~plugins/element-ui/index.ts', ssr: true
  }],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  styleResources: {
    sass: ['~assets/sass/main.sass'],
  },
  router: {
    base: "/nuxt-ssr"
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        [ 'component', 
          {
            'libraryName': 'element-ui',
            'styleLibraryName': '~theme'
          },
        ] 
      ],
      comments: true,
    },

    publicPath: '/nuxt-ssr/_nuxt/',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],
};
