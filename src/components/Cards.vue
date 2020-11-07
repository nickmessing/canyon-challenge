<template>
  <VList class="pa-0 pt-1">
    <Draggable
      v-model="sortableCards"
      class="pa-2"
      group="cards"
      handle=".sub-handle"
      @start="$emit('start')"
      @end="$emit('end')"
    >
      <Card
        v-for="card in sortableCards"
        :key="card.id"
        :stage="stage"
        :card="card"
        :colors-visible="colorsVisible"
        :reference-visible="referenceVisible"
      />
    </Draggable>
    <VListItem>
      <VListItemContent v-if="creating">
        <div>
          <VTextField
            v-model="creatingInput"
            ref="input"
            label="Card Title"
            prepend-icon="mdi-undo"
            append-outer-icon="mdi-check"
            dense
            hide-details
            @click:prepend="cancelCardCreation"
            @click:append-outer="submitCardCreation"
            @keyup.prevent.esc="cancelCardCreation"
            @keyup.prevent.enter="submitCardCreation"
          />
          <ColorPicker v-model="creatingColor" />
        </div>
      </VListItemContent>
      <VListItemAction v-else>
        <VBtn icon data-testid="add-card-button" @click="startCardCreation">
          <VIcon>mdi-plus</VIcon>
        </VBtn>
      </VListItemAction>
    </VListItem>
    <VListItem dense>
      <VListItemSubtitle>
        <span>{{ stage.cards.length }} card{{ stage.cards.length === 1 ? '' : 's' }}</span>
      </VListItemSubtitle>
    </VListItem>
  </VList>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import Draggable from 'vuedraggable'
import { DBStage } from '@/utils/db'
import { Actions } from '@/store'
import Card from '@/components/Card.vue'
import ColorPicker from '@/components/ColorPicker.vue'

@Component({
  components: {
    Card,
    ColorPicker,
    Draggable,
  },
})
export default class Cards extends Vue {
  $refs!: {
    input: Vue & { focus: () => void }
  }

  @Prop({ required: true, type: Object }) readonly stage!: DBStage
  @Prop({ required: true, type: Boolean }) readonly dragging!: boolean
  @Prop({ required: true, type: Boolean }) readonly colorsVisible!: boolean
  @Prop({ required: true, type: Boolean }) readonly referenceVisible!: boolean

  @Action addCard!: Actions['addCard']
  @Action reorderCards!: Actions['reorderCards']

  creating = false
  creatingInput = ''
  creatingColor = ''

  get sortableCards() {
    return this.stage.cards
  }
  set sortableCards(value) {
    this.reorderCards({
      stage: this.stage,
      cards: value,
    })
  }

  async startCardCreation() {
    this.creating = true
    await Vue.nextTick()
    this.$refs.input.focus()
  }
  submitCardCreation() {
    this.addCard({
      stage: this.stage,
      title: this.creatingInput,
      color: this.creatingColor,
    })
    this.cancelCardCreation()
  }
  cancelCardCreation() {
    this.creating = false
    this.creatingInput = ''
    this.creatingColor = ''
  }
}
</script>
