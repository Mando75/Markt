<template>
  <v-layout row wrap>
    <v-flex xs12 my-3>
      <h3 class="display-1">Instructions for {{ scenario.name }}</h3>
    </v-flex>
    <v-flex xs6 offset-xs3 my-3>
      <h2 class="headline">Description</h2>
      {{ scenario.description }}
    </v-flex>
    <v-flex md6 my-3>
      <v-card dark flat color="primary darken-2">
        <v-card-text class="font-weight-medium">
          <span> Items in <b>"BOLD"</b> text denote actions to perform. </span>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md6 my-3>
      <v-card dark flat color="primary darken-2">
        <v-card-text class="font-weight-medium">
          <span> Items in <i>"ITALIC"</i> represent words to be said. </span>
        </v-card-text>
      </v-card>
    </v-flex>
    <!--tile 2-->
    <v-flex xs12 my-3>
      <InstructionViewer :instructions="scenario.instructions" />
    </v-flex>
  </v-layout>
</template>

<script>
import InstructionViewer from "../common/InstructionViewer";
export default {
  name: "GuideScenarioInstructions",
  components: { InstructionViewer },
  props: {
    scenario: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
