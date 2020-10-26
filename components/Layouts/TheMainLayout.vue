<template>
  <div class="the-main-layout">
    <TheHeader />
    <main class="the-main-layout__content">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TheHeader from '~/components/TheHeader.vue'
import ThemeContainer from '~/components/Base/ThemeContainer.vue'

@Component({
  components: {
    TheHeader,
    ThemeContainer,
  },
})
export default class TheMainLayout extends Vue {}
</script>
