<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-model="fab"
        dark
        color="secondary darken-1"
        fab
        fixed
        bottom
        right
        @click="openInstructions"
      >
        <v-icon>live_help</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary darken-1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Instructions Quick Look</v-toolbar-title>
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "InstructionsFAB",
  data() {
    return {
      dialog: false,
      fab: true
    };
  },
  methods: {
    openInstructions() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style scoped>
.modernClass {
  background-color: #adadad;
}
</style>
