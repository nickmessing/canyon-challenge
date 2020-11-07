<template>
  <VContainer>
    <VSheet class="mx-auto">
      <TopBar :colors-visible.sync="colorsVisible" :reference-visible.sync="referenceVisible" />
      <Stages :colors-visible="colorsVisible" :reference-visible="referenceVisible" />
    </VSheet>
  </VContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Actions } from '@/store'
import TopBar from '@/components/TopBar.vue'
import Stages from '@/components/Stages.vue'

@Component({
  components: {
    TopBar,
    Stages,
  },
})
export default class Board extends Vue {
  @Action loadData!: Actions['loadData']

  colorsVisible = true
  referenceVisible = true

  mounted() {
    this.loadData()
  }
}
</script>
