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
        <h3 class="display-1">
          {{ sessionRole.allowSell ? "Seller" : "Buyer" }}
        </h3>
      </v-flex>
      <v-flex xs12 md6 my-4>
        <h3 class="display-1">
          <strong>Profit Equation</strong>
        </h3>
        <h3 class="display-1">{{ sessionRole.profitEquation }}</h3>
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

<style scoped>
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 3s infinite;
  -moz-animation: flickerAnimation 3s infinite;
  -o-animation: flickerAnimation 3s infinite;
  animation: flickerAnimation 3s infinite;
}
</style>
