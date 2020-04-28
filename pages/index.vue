<template>
  <div class="home-page">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="home-page__select">
            <SelectInput
              v-model="selectSingleOptions.value"
              v-bind="selectSingleOptions.props"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="home-page__select">
            <SelectInput
              v-model="selectSingleIds.value"
              v-bind="selectSingleIds.props"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="home-page__select">
            <SelectInput
              v-model="selectMultipleOptions.value"
              v-bind="selectMultipleOptions.props"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="home-page__select">
            <SelectInput
              v-model="selectMultipleIds.value"
              v-bind="selectMultipleIds.props"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SelectInput from '~/components/Base/Inputs/SelectInput.vue'

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
    SelectInput,
  },
})
export default class IndexPage extends Vue {
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
}
</script>

<style lang="stylus">
.home-page
  padding-top 400px

  &__select
    margin-bottom 50px
</style>
