<template>
  <div>
    Colors:
    <div class="color-picker main">
      <div
        v-for="colorName in colorNames"
        :key="colorName"
        class="ma-1 elevation-4"
        :class="colorName === activeBase ? 'active' : null"
        :style="`background-color: ${colors[colorName].base}`"
        @click="activeBase = colorName"
      />
    </div>
    <div v-if="activeBase">Variants:</div>
    <div v-if="activeBase" class="color-picker sub">
      <div
        v-for="variant in variants"
        :key="variant"
        class="ma-1 elevation-4"
        :class="variant === activeVariant ? 'active' : null"
        :style="`background-color: ${colors[activeBase][variant]}; display: ${
          colors[activeBase][variant] ? 'inline-block' : 'none'
        }`"
        @click="activeVariant = variant"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { colors } from 'vuetify/lib'

@Component
export default class Home extends Vue {
  @Prop({ required: true, type: String }) readonly value!: string

  activeBase: keyof typeof colors | null = null
  activeVariant = 'base'

  variants = [
    'lighten5',
    'lighten4',
    'lighten3',
    'lighten2',
    'lighten1',
    'base',
    'accent1',
    'accent2',
    'accent3',
    'accent4',
    'darken1',
    'darken2',
    'darken3',
    'darken4',
  ]
  get colors() {
    return colors
  }

  get colorNames() {
    return Object.keys(colors).filter(color => color !== 'shades')
  }

  sendColor() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const localColors = colors as any
    /* eslint-enable @typescript-eslint/no-explicit-any */
    this.$emit(
      'input',
      this.activeBase ? localColors[this.activeBase][this.activeVariant] ?? localColors[this.activeBase].base : '',
    )
  }

  @Watch('activeBase')
  onActiveBaseChange() {
    this.sendColor()
  }

  @Watch('activeVariant')
  onActiveVariantChange() {
    this.sendColor()
  }
}
</script>

<style lang="scss" scoped>
.color-picker {
  white-space: normal;
  word-break: break-all;

  > hr {
    border: 0 none;
    border-top: 1px solid black;
  }

  > div {
    display: inline-block;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 50%;
    border: 2px solid white;

    &.active {
      border-color: black;
    }
  }
}
</style>
