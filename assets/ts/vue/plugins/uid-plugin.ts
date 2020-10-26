import Vue from 'vue'

const $id = function(this: Vue) {
  return `${this.$options.name}-${this.$uid}`
}

let counterUid = 0
export function VueUidPlugin(vue: typeof Vue) {
  vue.mixin({
    beforeCreate() {
      this.$uid = counterUid++
    },
  })
  vue.prototype.$id = $id
}
