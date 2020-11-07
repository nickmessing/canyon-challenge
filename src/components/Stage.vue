<template>
  <VCard
    class="ma-2 mb-0 pa-2"
    elevation="0"
    color="grey lighten-5"
    :class="{
      'stage-large': $vuetify.breakpoint.mdAndUp,
      'stage-small': !$vuetify.breakpoint.mdAndUp,
    }"
  >
    <VContainer class="text-subtitle-1">
      <VRow no-gutters>
        <VBtn icon class="handle">
          <VIcon>mdi-arrow-all</VIcon>
        </VBtn>
        <VCol @dblclick="startRename">
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
              <div class="text-center" v-bind="attrs" v-on="on">{{ stage.title }}</div>
            </template>
            <span>Double click to rename</span>
          </VTooltip>
        </VCol>
        <VBtn icon @click="remove">
          <VIcon>mdi-delete</VIcon>
        </VBtn>
      </VRow>
    </VContainer>
    <Cards
      :stage="stage"
      :dragging="dragging"
      :colors-visible="colorsVisible"
      :reference-visible="referenceVisible"
      @start="$emit('start')"
      @end="$emit('end')"
    />
  </VCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Stage } from '@/utils/api'
import { Actions } from '@/store'
import Cards from '@/components/Cards.vue'

@Component({
  components: {
    Cards,
  },
})
export default class Home extends Vue {
  $refs!: {
    input: Vue & { focus: () => void }
  }

  @Prop({ required: true, type: Object }) readonly stage!: Stage
  @Prop({ required: true, type: Boolean }) readonly dragging!: boolean
  @Prop({ required: true, type: Boolean }) readonly colorsVisible!: boolean
  @Prop({ required: true, type: Boolean }) readonly referenceVisible!: boolean

  @Action removeStage!: Actions['removeStage']
  @Action renameStage!: Actions['renameStage']

  renaming = false
  renamingInput = ''

  async startRename() {
    this.renaming = true
    this.renamingInput = this.stage.title
    await Vue.nextTick()
    this.$refs.input.focus()
  }
  cancelRename() {
    this.renaming = false
  }
  submitRename() {
    this.renaming = false
    this.renameStage({
      stage: this.stage,
      title: this.renamingInput,
    })
  }
  remove() {
    this.removeStage(this.stage)
  }
}
</script>

<style lang="scss" scoped>
.stage-large {
  flex: 0 0 350px;
}
.stage-small {
  flex: 0 0 250px;
}
</style>
