<template>
  <TheMainLayout>
    <Nuxt />
  </TheMainLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TheMainLayout from '~/components/Layouts/TheMainLayout.vue'

@Component({
  components: {
    TheMainLayout,
  },
})
export default class DefaultLayoutNuxt extends Vue {}
</script>
