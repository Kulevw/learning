import { createDecorator } from 'vue-class-component'

export function ValidateValue(field?: string) {
  return createDecorator(function(options, key) {
    options.computed = options.computed || {}
    options.computed[`${field || key}Valid`] = {
      get(this: Vue) {
        return !this.$v[key].value?.$invalid
      },
    }
  })
}
