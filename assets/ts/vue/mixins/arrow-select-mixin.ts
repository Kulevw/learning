import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export class ArrowSelectMixin extends Vue {
  arrowIndex: number | null = null

  arrowIndexIncrement(cur: number, length: number) {
    const index = (cur + 1) % length
    console.log(index)
    return index
  }

  arrowIndexDecrement(cur: number, length: number) {
    const index = (length + cur - 1) % length
    console.log(index)
    return index
  }
}
