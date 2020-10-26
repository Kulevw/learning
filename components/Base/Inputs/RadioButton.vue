<template>
  <div class="radio-button d-flex">
    <input
      :id="id"
      ref="input"
      v-model="syncValue"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :value="option"
      class="hidden"
      type="radio"
    />
    <label class="radio-button__box d-block" :for="id"></label>
    <label class="radio-button__label" :for="id">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop } from 'vue-property-decorator'
import { InputMixin } from '../../../assets/ts/vue/mixins/input-mixin'

@Component
export default class RadioButton extends InputMixin<Primitive> {
  @Prop({ required: true }) option!: Primitive

  @Ref('input') refInput!: HTMLInputElement
}
</script>
