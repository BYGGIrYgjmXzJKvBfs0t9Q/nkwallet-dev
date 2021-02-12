/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  // mode: 'spa', // or 'universal'
  head: {
    title: 'nkwallet-electron',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/global.scss'
  ],

  plugins: [
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [
    { path: '~/components', extensions: ['vue'] }
  ],

  buildModules: [
    
  ],


  modules: [
    
  ],
};
