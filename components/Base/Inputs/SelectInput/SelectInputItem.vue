<template>
  <li class="select__item" :class="itemClass">
    <span>{{ text }}</span>
    <div v-if="isSelected" class="select__item_check">
      <CheckSVG />
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import CheckSVG from '~/assets/images/svg/check-mark.svg'

@Component({
  components: {
    CheckSVG,
  },
})
export default class SelectInputItem extends Vue {
  @Prop({ required: true, type: Boolean }) readonly isSelected!: boolean
  @Prop({ required: true, type: Boolean }) readonly arrowSelected!: boolean
  @Prop({ required: true, type: String }) readonly text!: string

  get itemClass() {
    return {
      'select__item--selected': this.isSelected,
      'select__item--arrow': this.arrowSelected,
    }
  }
}
</script>
