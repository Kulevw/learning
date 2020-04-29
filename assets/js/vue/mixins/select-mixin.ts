import { Component, Prop, Mixins } from 'vue-property-decorator'
import { InputMixin } from '~/assets/js/vue/mixins/input-mixin'

export type SelectPrimitive = string | number | boolean
export type SelectObject = { [key: string]: SelectPrimitive }
export type SelectPrimitiveValue = null | SelectPrimitive | SelectPrimitive[]
export type SelectOptionValue = null | SelectObject | SelectObject[]
export type SelectValue = SelectPrimitiveValue | SelectOptionValue

abstract class Selector<TValue extends SelectValue = SelectValue> {
  private ctx: SelectMixin

  constructor(ctx: SelectMixin) {
    this.ctx = ctx
  }

  get value() {
    return this.ctx.value as TValue
  }

  set value(value: TValue) {
    this.ctx.updateValue(value)
  }

  get byKey() {
    return this.ctx.byKey
  }

  get options() {
    return this.ctx.options
  }

  abstract get selected(): SelectOptionValue

  abstract isSelected(option: SelectObject): boolean
  abstract select(option: SelectObject): void
  abstract unselect(option: SelectObject): void
}

class SelectorSinglePrimitive extends Selector<SelectPrimitive | null> {
  isSelected(option: SelectObject): boolean {
    return this.value === option[this.byKey]
  }

  select(option: SelectObject): void {
    this.value = option[this.byKey]
  }

  unselect(option: SelectObject): void {
    if (this.value === option[this.byKey]) {
      this.value = null
    }
  }

  get selected(): SelectOptionValue {
    return this.options.find((t) => t[this.byKey] === this.value) || null
  }
}

class SelectorMultiplePrimitive extends Selector<SelectPrimitive[]> {
  isSelected(option: SelectObject): boolean {
    return this.value.findIndex((t) => t === option[this.byKey]) !== -1
  }

  select(option: SelectObject): void {
    if (this.isSelected(option)) {
      return
    }
    this.value = [...this.value, option[this.byKey]]
  }

  unselect(option: SelectObject): void {
    if (!this.isSelected(option)) {
      return
    }
    const i = this.value.findIndex((t) => t === option[this.byKey])
    this.value = [...this.value.slice(0, i), ...this.value.slice(i + 1)]
  }

  get selected(): SelectOptionValue {
    return this.value.reduce((acc: SelectObject[], prev) => {
      const opt = this.options.find((t) => t[this.byKey] === prev)
      if (opt) {
        acc.push(opt)
      }
      return acc
    }, [])
  }
}

class SelectorSingleOption extends Selector<SelectObject | null> {
  isSelected(option: SelectObject): boolean {
    return this.value === option
  }

  select(option: SelectObject): void {
    this.value = option
  }

  unselect(option: SelectObject): void {
    if (this.value && this.value[this.byKey] === option[this.byKey]) {
      this.value = null
    }
  }

  get selected(): SelectOptionValue {
    return this.value
  }
}

class SelectorMultipleOption extends Selector<SelectObject[]> {
  isSelected(option: SelectObject): boolean {
    return (
      this.value.findIndex((t) => t[this.byKey] === option[this.byKey]) !== -1
    )
  }

  select(option: SelectObject): void {
    if (this.isSelected(option)) {
      return
    }
    this.value = [...this.value, option]
  }

  unselect(option: SelectObject): void {
    if (!this.isSelected(option)) {
      return
    }
    const i = this.value.findIndex((t) => t[this.byKey] === option[this.byKey])
    this.value = [...this.value.slice(0, i), ...this.value.slice(i + 1)]
  }

  get selected(): SelectOptionValue {
    return this.value
  }
}

export interface SelectMixin extends InputMixin<SelectValue> {}

@Component
export class SelectMixin extends InputMixin<SelectValue> {
  @Prop({ type: Boolean, default: false }) readonly primitive!: boolean
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  @Prop({ type: String, default: 'id' }) readonly byKey!: string
  @Prop({ type: String, default: 'name' }) readonly byName!: string
  @Prop({ type: Array, default: () => [] }) readonly options!: SelectObject[]

  private get selector(): Selector {
    if (this.primitive) {
      if (this.multiple) {
        return new SelectorMultiplePrimitive(this)
      }
      return new SelectorSinglePrimitive(this)
    }
    if (this.multiple) {
      return new SelectorMultipleOption(this)
    }
    return new SelectorSingleOption(this)
  }

  get selected(): SelectOptionValue {
    return this.selector.selected
  }

  isSelected(option: SelectObject): boolean {
    return this.selector.isSelected(option)
  }

  select(option: SelectObject): void {
    this.selector.select(option)
  }

  unselect(option: SelectObject): void {
    this.selector.unselect(option)
  }

  toggleSelect(option: SelectObject): void {
    this.isSelected(option) ? this.unselect(option) : this.select(option)
  }
}
