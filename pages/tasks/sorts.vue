<template>
  <SortsVisualizerPage />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SortsVisualizerPage from '~/components/Pages/Tasks/SortsVisualizerPage.vue'

@Component({
  components: {
    SortsVisualizerPage,
  },
})
export default class SortsPage extends Vue {}
</script>
