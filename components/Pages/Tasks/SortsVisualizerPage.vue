<template>
  <div class="container">
    <ArrayVisualizer :array="array" />
    <Button>
      Заполнить массив
    </Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ArrayVisualizer from '~/components/Common/ArrayVisualizer.vue'
import Button from '~/components/Base/Inputs/Button.vue'
import { makeArray } from '~/assets/ts/sorts/sorts-helpers'

@Component({
  components: {
    Button,
    ArrayVisualizer,
  },
})
export default class SortsVisualizerPage extends Vue {
  array: number[] = makeArray(100)
}
</script>
