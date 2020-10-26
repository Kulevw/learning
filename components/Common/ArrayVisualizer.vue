<template>
  <div ref="container" class="array-visualizer"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { SVG, Svg } from '@svgdotjs/svg.js'
import { makeArray, reverseArray, shuffleArray } from '~/assets/ts/sorts/sorts-helpers'
import { BubbleSort, QuickSort, ShellSort, Sort, ViewArray } from '~/assets/ts/sorts/sorts'

@Component
export default class ArrayVisualizer extends Vue {
  @Prop({ type: Object, required: true }) sort!: Sort
  @Prop({ type: Array, default: () => shuffleArray(makeArray(100)) })
  array!: number[]

  @Ref('container') refContainer!: HTMLElement

  draw?: Svg
  viewArray?: ViewArray

  mounted() {
    this.draw = SVG()
      .addTo(this.refContainer)
      .size('100%', 500)
    this.viewArray = new ViewArray(this.draw).setArray(this.array).draw()
  }
}
</script>

<style lang="stylus">
.array-visualizer
  background-color black
  border 1px solid black

  & > svg
    display block
</style>
