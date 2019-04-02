<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 my-3>
        <h1 class="display-2">Instructions for {{ sessionRole.name }}</h1>
      </v-flex>
      <v-flex xs12 my-3>
        <h2 class="display-1">
          <strong>
            {{ sessionRole.allowSell ? "Seller " : "Buyer " }} Value
          </strong>
          <br />
          {{ sessionRole.value }}
        </h2>
      </v-flex>
      <v-flex xs12 my-3>
        <h2 class="display-1">
          <strong>
            Role
          </strong>
          <br />
          {{ isSeller ? "Seller " : "Buyer " }}
        </h2>
      </v-flex>
      <v-flex xs12 my-3>
        <h2 class="display-1">
          <strong>
            Profit Equation
          </strong>
          <br />
          {{ sessionRole.profitEquation }}
        </h2>
      </v-flex>
      <v-flex xs12 my-3>
        <InstructionViewer :instructions="sessionRole.instructions" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InstructionViewer from "../../common/InstructionViewer";
export default {
  name: "PlayerSessionInstructions",
  components: { InstructionViewer },
  props: {
    sessionRole: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed: {
    isSeller() {
      return this.sessionRole.allowSell;
    }
  }
};
</script>

<style scoped></style>
