import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { AppTheme } from '~/assets/ts/app-theme'

@Component({
  head(this: ThemeablePageMixin) {
    const themeClass = this.currentTheme ? `theme-${this.currentTheme}` : ''
    return {
      htmlAttrs: {
        class: themeClass,
      },
    }
  },
})
export default class ThemeablePageMixin extends Vue {
  get currentTheme(): AppTheme {
    return this.$store.getters.getCurrentTheme
  }
}
