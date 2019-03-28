<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-model="fab"
        dark
        fab
        fixed
        bottom
        right
        v-on:click="openInstructions"
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
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <Instructions :scenario="scenario" :isLoading="isLoading" />
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Instructions from "./GuideFeatures/Instructions";
export default {
  name: "InstructionsFAB",
  components: { Instructions },
  props: {
    scenario: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Number,
      default: 0
    }
  },
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

<style scoped></style>
