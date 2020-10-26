<template>
  <div class="theme-container" :class="containerClass">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { AppTheme } from '~/assets/ts/app-theme'

@Component
export default class ThemeContainer extends Vue {
  @Prop({ required: true, type: String }) theme?: AppTheme

  get containerClass() {
    if (!this.theme) {
      return {}
    }
    return {
      [`theme-${this.theme}`]: true,
    }
  }
}
</script>
