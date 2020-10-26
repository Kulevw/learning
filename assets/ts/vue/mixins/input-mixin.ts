import Vue from 'vue'
import {
  Component,
  Prop,
  PropSync,
  Model,
  Emit,
  Watch
} from 'vue-property-decorator'

export interface InputMixin<TValue> {
  readonly refInput: HTMLInputElement
}

const defaultId = () =>
  function(this: Vue) {
    return this.$id(this.$options.name)
  }

@Component
export class InputMixin<TValue> extends Vue {
  // region Props
  @Prop({ type: String, default: defaultId() }) readonly id!: string
  @Prop({ type: String }) readonly name!: string
  @Prop({ type: Boolean, default: true }) readonly valid!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: Boolean, default: false }) readonly focused!: boolean
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean
  // endregion

  // region Model
  @Model('update:value', { default: null }) readonly value!: TValue
  // endregion

  // region State
  localFocused: boolean = this.focused
  // endregion

  // region syncProps
  @PropSync('value') syncValue!: TValue
  // endregion

  // region Emits
  @Emit('update:value')
  updateValue(value: TValue) {
    return value
  }

  @Emit('update:focused')
  updateFocused(hasFocus: boolean) {
    return hasFocus
  }
  // endregion

  // region Watch
  @Watch('localFocused')
  private $changedLocalFocusedHandler(localFocused: boolean) {
    localFocused ? this.refInput.focus() : this.refInput.blur()
    this.updateFocused(localFocused)
  }

  @Watch('focused')
  private $changedFocusedHandler(focused: boolean) {
    focused ? this.refInput.focus() : this.refInput.blur()
  }
  // endregion

  // region Hooks
  mounted() {
    this.onEvents()
  }

  beforeDestroy() {
    this.offEvents()
  }
  // endregion

  // region Methods
  onEvents() {
    this.refInput.addEventListener('focus', this.inputFocusHandler)
    this.refInput.addEventListener('blur', this.inputBlurHandler)
  }

  offEvents() {
    this.refInput.removeEventListener('focus', this.inputFocusHandler)
    this.refInput.removeEventListener('blur', this.inputBlurHandler)
  }

  inputFocusHandler() {
    this.localFocused = true
  }

  inputBlurHandler() {
    this.localFocused = false
  }
  // endregion
}
