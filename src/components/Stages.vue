<template>
  <Draggable class="horizontal-list pb-2" v-model="sortableStages" group="stages" handle=".handle">
    <Stage
      v-for="stage in stages"
      :key="stage.id"
      :dragging="dragging"
      :stage="stage"
      :colors-visible="colorsVisible"
      :reference-visible="referenceVisible"
      @start="dragging = true"
      @end="dragging = false"
    />
  </Draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Draggable from 'vuedraggable'
import { Actions, Getters } from '@/store'
import Stage from '@/components/Stage.vue'

@Component({
  components: {
    Stage,
    Draggable,
  },
})
export default class Stages extends Vue {
  @Prop({ required: true, type: Boolean }) readonly colorsVisible!: boolean
  @Prop({ required: true, type: Boolean }) readonly referenceVisible!: boolean

  @Getter stages!: Getters['stages']
  @Action reorderStages!: Actions['reorderStages']

  dragging = false

  get sortableStages() {
    return this.stages
  }
  set sortableStages(value) {
    this.reorderStages(value)
  }
}
</script>

<style scoped lang="scss">
.horizontal-list {
  display: flex;
  flex: 1 0 auto;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  overflow: auto;
}
</style>
