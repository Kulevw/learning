<template>
  <div class="home-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="fs-1">Очень большой текст</h1>
          <h2 class="fs-2">Большой текст</h2>
          <p class="fs-3">Текст</p>
          <p class="fs-4">Маленький текст</p>
          <p class="fs-5">Очень маленький текст</p>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <SelectInput
              v-model="selectSingleOptions.value"
              v-bind="selectSingleOptions.props"
            />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <SelectInput
              v-model="selectSingleIds.value"
              v-bind="selectSingleIds.props"
            />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <SelectInput
              v-model="selectMultipleOptions.value"
              v-bind="selectMultipleOptions.props"
            />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <SelectInput
              v-model="selectMultipleIds.value"
              v-bind="selectMultipleIds.props"
            />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <RadioButton v-model="currentTheme" name="theme" option="light">
              Светлая тема
            </RadioButton>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <RadioButton v-model="currentTheme" name="theme" option="dark">
              Темная тема
            </RadioButton>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="home-page__select">
            <RadioButton v-model="currentTheme" name="theme" :option="null">
              Авто
            </RadioButton>
          </div>
        </div>
        <div class="col-12">
          <div class="home-page__select">
            <ArrayVisualizer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import ThemeablePageMixin from '~/assets/ts/vue/mixins/themeable-page-mixin'
import SelectInput from '~/components/Base/Inputs/SelectInput/SelectInput.vue'
import RadioButton from '~/components/Base/Inputs/RadioButton.vue'
import ArrayVisualizer from '~/components/Common/ArrayVisualizer.vue'
import { AppTheme } from '~/assets/ts/app-theme'

const makeOptions = (optionName: string) => {
  const result = []
  for (let i = 0; i < 10; i += 1) {
    result.push({
      id: i + 1,
      name: `${optionName} ${i + 1}`,
    })
  }
  return result
}

@Component({
  components: {
    RadioButton,
    SelectInput,
    ArrayVisualizer,
  },
  validations: {
    selectSingleOptions: {
      value: {
        required,
      },
    },
  },
})
export default class IndexPage extends ThemeablePageMixin {
  selectSingleOptions = {
    props: {
      options: makeOptions('SingleOptions'),
      primitive: false,
      multiple: false,
      placeholder: 'SingleOptions',
    },
    value: null,
  }

  selectSingleIds = {
    props: {
      options: makeOptions('SingleIds'),
      primitive: true,
      multiple: false,
      placeholder: 'SingleIds',
    },
    value: null,
  }

  selectMultipleOptions = {
    props: {
      options: makeOptions('MultipleOptions'),
      primitive: false,
      multiple: true,
      placeholder: 'MultipleOptions',
    },
    value: [],
  }

  selectMultipleIds = {
    props: {
      options: makeOptions('MultipleIds'),
      primitive: true,
      multiple: true,
      placeholder: 'MultipleIds',
    },
    value: [],
  }

  get currentTheme(): AppTheme {
    return this.$store.getters.getCurrentTheme
  }

  set currentTheme(theme: AppTheme) {
    this.$store.commit('setTheme', theme)
  }
}
</script>

<style lang="stylus">
.home-page
  height 8000px
  &__select
    margin-bottom 50px
</style>
