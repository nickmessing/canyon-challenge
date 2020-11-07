<template>
  <VContainer class="ma-0 py-0">
    <VRow>
      <VCol md="2" cols="6">
        <VSwitch v-model="colors" label="Show colors" hide-details />
      </VCol>
      <VCol md="2" cols="6">
        <VSwitch v-model="reference" label="Show reference" hide-details />
      </VCol>
      <VSpacer />
      <VCol md="2" cols="12">
        <VTextField
          v-model="stageTitle"
          label="New Stage Title"
          append-icon="mdi-plus"
          data-testid="add-stage-input"
          @keyup.prevent.enter="add"
          @click:append="add"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Actions } from '@/store'

@Component
export default class TopBar extends Vue {
  @Prop({ required: true, type: Boolean }) readonly colorsVisible!: boolean
  @Prop({ required: true, type: Boolean }) readonly referenceVisible!: boolean

  @Action addStage!: Actions['addStage']

  stageTitle = ''

  get colors() {
    return this.colorsVisible
  }
  set colors(value) {
    // eslint-disable-next-line vue/custom-event-name-casing
    this.$emit('update:colors-visible', value)
  }
  get reference() {
    return this.referenceVisible
  }
  set reference(value) {
    // eslint-disable-next-line vue/custom-event-name-casing
    this.$emit('update:reference-visible', value)
  }

  async add() {
    this.addStage(this.stageTitle)
    this.stageTitle = ''
  }
}
</script>
