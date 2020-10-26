<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Button extends Vue {}
</script>
