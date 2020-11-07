<template>
  <VApp>
    <VAppBar app color="primary" dark>
      <div class="d-flex align-center">
        <VImg
          alt="Canyon Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="120"
          :src="require('@/assets/logo.svg')"
        />
      </div>

      <VSpacer />

      <VBtn text @click="reset">
        <span class="mr-2">Reset the database</span>
      </VBtn>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  reset() {
    localStorage.removeItem('canyon-database')
    location.reload()
  }
}
</script>
