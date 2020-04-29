<template>
  <div>
    <div class="select" :class="selectClass">
      <div class="select__inner" @click="clickSelectHandler" @mousedown.prevent>
        <slot name="before">
          <div style="width: 14px"></div>
        </slot>
        <label class="select__input_label" :class="inputLabelClass">
          <input
            :id="id"
            ref="input"
            class="select__input"
            :name="name"
            :type="type"
            :disabled="disabled"
            :placeholder="placeholder"
          />
        </label>
        <div v-if="!multiple" class="select__value">
          <span v-if="!selected">
            {{ placeholder }}
          </span>
          <span v-else>
            {{ selected[byName] }}
          </span>
        </div>
        <div class="select__toggle" :class="toggleClass">
          <ArrowSVG />
        </div>
        <slot name="after">
          <div style="width: 14px"></div>
        </slot>
      </div>
      <div class="select__list_wrapper">
        <ul v-show="opened" class="select__list" @mousedown.prevent>
          <SelectInputItem
            v-for="option in options"
            :key="keyOption(option)"
            :is-selected="isSelected(option)"
            :text="option[byName]"
            @click.native="toggleSelect(option)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { SelectMixin } from '~/assets/js/vue/mixins/select-mixin'
import ArrowSVG from '~/assets/images/svg/arrow.svg'
import SelectInputItem from '~/components/Base/Inputs/SelectInputItem.vue'

@Component({
  components: {
    ArrowSVG,
    SelectInputItem,
  },
})
export default class SelectInput extends SelectMixin {
  @Prop({ type: String }) readonly placeholder!: string

  @Ref('input') readonly refInput!: HTMLInputElement

  opened: boolean = false

  get type() {
    return this.multiple ? 'text' : 'submit'
  }

  get selectClass() {
    return {
      'select--multiple': this.multiple,
      'select--focus': this.localFocused,
    }
  }

  get inputLabelClass() {
    return {
      hidden: !this.multiple,
    }
  }

  get toggleClass() {
    return {
      'select__toggle--opened': this.opened,
    }
  }

  @Watch('localFocused')
  changedLocalFocusedHandler(val: boolean) {
    if (!val) {
      this.opened = false
    }
  }

  clickSelectHandler() {
    this.localFocused = true
    this.opened = !this.opened
  }

  keyValueOption(option: any) {
    return `value-${option[this.byKey]}`
  }

  keyOption(option: any) {
    return `option-${option[this.byKey]}`
  }
}
</script>
