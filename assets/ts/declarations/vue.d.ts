import Vue from 'vue'

declare module 'vue-router/types/router' {
  interface Route {
    meta: {
      layout?: string
      middleware: Middleware[]
    }
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
