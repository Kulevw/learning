import Vue from 'vue'


declare module 'vue/types/vue' {
  interface Vue {
    $meta(): VueMetaPlugin
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $uid?: number
    $id: (name?: string) => string
    $includeUid: boolean
  }
}
