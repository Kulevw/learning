<template>
  <div>
    <div class="select" :class="selectClass">
      <div
        class="select__inner"
        @mouseup.prevent.stop="clickSelectHandler"
        @mousedown.prevent
      >
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
            @keydown="keyDownHandler"
            @keyup="keyUpHandler"
          />
        </label>
        <div v-if="!searchable" class="select__value">
          <span v-if="valueIsEmpty || multiple" class="sub-text">
            {{ placeholder }}
          </span>
          <span v-else-if="!multiple">
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
        <Transition name="select__list">
          <ul
            v-show="opened"
            ref="list"
            class="select__list"
            @mousedown.prevent
          >
            <SelectInputItem
              v-for="(option, i) in options"
              :key="keyOption(option)"
              :ref="keyOption(option)"
              :arrow-selected="i === arrowIndex"
              :is-selected="isSelected(option)"
              :text="option[byName]"
              @click.native="toggleSelect(option)"
            />
          </ul>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop, Watch, Mixins } from 'vue-property-decorator'
import scrollIntoView from 'scroll-into-view-if-needed'
import { InputMixin } from '~/assets/ts/vue/mixins/input-mixin'
import { SelectMixin, SelectObject } from '~/assets/ts/vue/mixins/select-mixin'
import { ArrowSelectMixin } from '~/assets/ts/vue/mixins/arrow-select-mixin'
import ArrowSVG from '~/assets/images/svg/arrow.svg'
import SelectInputItem from '~/components/Base/Inputs/SelectInput/SelectInputItem.vue'

@Component({
  components: {
    ArrowSVG,
    SelectInputItem,
  },
})
export default class SelectInput extends Mixins(
  InputMixin,
  SelectMixin,
  ArrowSelectMixin
) {
  @Prop({ type: String, default: null }) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly searchable!: string
  @Prop({ type: String, default: null }) readonly query!: string

  @Ref('input') readonly refInput!: HTMLInputElement
  @Ref('list') readonly refList!: HTMLElement

  opened: boolean = false

  get type() {
    return this.searchable ? 'text' : 'submit'
  }

  get selectClass() {
    return {
      'select--searchable': this.searchable,
      'select--focus': this.localFocused,
    }
  }

  get inputLabelClass() {
    return {
      hidden: !this.searchable,
    }
  }

  get toggleClass() {
    return {
      'select__toggle--opened': this.opened,
    }
  }

  @Watch('opened')
  changedOpenedHandler(opened: boolean) {
    if (!opened) {
      this.arrowIndex = null
    } else if (!this.valueIsEmpty) {
      if (this.multiple) {
        this.scrollToItem((this.selected as SelectObject[])[0])
      } else {
        this.scrollToItem(this.selected as SelectObject)
      }
    }
  }

  @Watch('localFocused')
  changedLocalFocusedHandler(val: boolean) {
    if (!val) {
      this.opened = false
    }
  }

  @Watch('arrowIndex')
  changedArrowIndexHandler(index: number) {
    this.scrollToItem(this.options[index])
  }

  clickSelectHandler() {
    this.localFocused = true
    this.updateOpened(!this.opened)
  }

  updateOpened(opened: boolean) {
    this.opened = opened
  }

  getRefItem(option: SelectObject) {
    return (this.$refs[this.keyOption(option)] as Vue[])[0] as Vue
  }

  scrollToItem(option: SelectObject) {
    if (option) {
      scrollIntoView(this.getRefItem(option).$el, {
        boundary: this.refList,
      })
    }
  }

  keyValueOption(option: SelectObject) {
    return `value-${option[this.byKey]}`
  }

  keyOption(option: SelectObject) {
    return `option-${option[this.byKey]}`
  }

  indexOf(option: SelectObject) {
    return this.options.findIndex(
      (opt: SelectObject) => opt[this.byKey] === option[this.byKey]
    )
  }

  upArrowIndex(e: KeyboardEvent) {
    this.arrowIndex = this.arrowIndexDecrement(
      this.arrowIndex ?? 0,
      this.countOptions
    )
    e.preventDefault()
  }

  downArrowIndex(e: KeyboardEvent) {
    this.arrowIndex = this.arrowIndexIncrement(
      this.arrowIndex ?? -1,
      this.countOptions
    )
    e.preventDefault()
  }

  keyDownHandler(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        this.upArrowIndex(e)
        break
      case 'ArrowDown':
        this.downArrowIndex(e)
        break
    }
  }

  keyUpHandler(e: KeyboardEvent) {
    switch (e.key) {
      case ' ':
        this.updateOpened(!this.opened)
        e.preventDefault()
        break
    }
  }
}
</script>
