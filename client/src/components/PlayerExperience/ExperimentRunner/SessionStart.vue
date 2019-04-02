<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 my-4>
        <h1 class="display-3">{{ sessionRole.name }}</h1>
      </v-flex>
      <v-flex xs12 md6 my-4>
        <h3 class="display-1">
          <strong>Role </strong>
        </h3>
        <span class="display-1">
          {{ sessionRole.allowSell ? "Seller" : "Buyer" }}
        </span>
      </v-flex>
      <v-flex xs12 md6 my-4>
        <h3 class="display-1">
          <strong>Profit Equation</strong>
        </h3>
        <span class="display-1">{{ sessionRole.profitEquation }}</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12><h2 class="display-2">Role Description</h2></v-flex>
      <v-flex xs12 my-4>
        <InstructionViewer :instructions="sessionRole.instructions" />
      </v-flex>
      <v-flex xs12>
        <span class="animate-flicker"
          >Waiting on your guide to start the next round...</span
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InstructionViewer from "../../common/InstructionViewer";
export default {
  name: "SessionStart",
  components: { InstructionViewer },
  props: {
    sessionRole: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
