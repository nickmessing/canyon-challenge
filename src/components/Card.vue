<template>
  <VListItem
    class="ma-2 elevation-2"
    :two-line="referenceVisible"
    :style="colorsVisible ? `border-top: 4px solid ${card.color}` : ''"
  >
    <VListItemContent class="sub-handle">
      <VListItemSubtitle v-if="referenceVisible">#{{ card.reference }}</VListItemSubtitle>
      <VListItemTitle @dblclick="startRename">
        <div v-if="renaming">
          <VTextField
            v-model="renamingInput"
            ref="input"
            prepend-icon="mdi-undo"
            append-outer-icon="mdi-check"
            dense
            hide-details
            @click:prepend="cancelRename"
            @click:append-outer="submitRename"
            @keyup.prevent.esc="cancelRename"
            @keyup.prevent.enter="submitRename"
          />
        </div>
        <VTooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              {{ card.title }}
            </span>
          </template>
          <span> Double click to rename </span>
        </VTooltip>
      </VListItemTitle>
    </VListItemContent>
    <VListItemAction>
      <VBtn icon @click="remove">
        <VIcon>mdi-delete</VIcon>
      </VBtn>
    </VListItemAction>
  </VListItem>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Card, Stage } from '@/utils/api'
import { Actions } from '@/store'

@Component
export default class CardComponent extends Vue {
  $refs!: {
    input: Vue & { focus: () => void }
  }

  @Prop({ required: true, type: Object }) readonly card!: Card
  @Prop({ required: true, type: Object }) readonly stage!: Stage
  @Prop({ required: true, type: Boolean }) readonly colorsVisible!: boolean
  @Prop({ required: true, type: Boolean }) readonly referenceVisible!: boolean

  @Action removeCard!: Actions['removeCard']
  @Action renameCard!: Actions['renameCard']

  renaming = false
  renamingInput = ''

  async startRename() {
    this.renaming = true
    this.renamingInput = this.card.title
    await Vue.nextTick()
    this.$refs.input.focus()
  }
  cancelRename() {
    this.renaming = false
  }
  submitRename() {
    this.renaming = false
    this.renameCard({
      stage: this.stage,
      card: this.card,
      title: this.renamingInput,
    })
  }

  remove() {
    this.removeCard({
      stage: this.stage,
      card: this.card,
    })
  }
}
</script>
