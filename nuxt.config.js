export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  css: ['~/assets/styles/index.styl'],
  plugins: [
    '~/plugins/vuelidate.ts',
    '~/plugins/nuxt-client-init.client.ts',
    '~/plugins/uid.ts',
  ],
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    'cookie-universal-nuxt',
  ],
  axios: {},
  styleResources: {
    stylus: [
      '~/assets/styles/grid/vars/*.styl',
      '~/assets/styles/grid/mixins/*.styl',
      '~/assets/styles/vars/*.styl',
      '~/assets/styles/mixins/*.styl',
    ],
  },
  build: {
    extractCSS: true,
  },
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
}
