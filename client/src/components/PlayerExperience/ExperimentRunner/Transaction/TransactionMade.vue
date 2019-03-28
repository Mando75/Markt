<template>
  <div>
    <v-layout column>
      <v-flex xs12>
        <h3 class="display-3">Nice!</h3>
        <h2 class="display-1">Please wait for the round to end</h2>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="display-1">
          <strong>Amount: </strong> ${{ transaction.amount }}
        </h3>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="display-1">
          <strong>Buyer Profit: </strong> ${{ transaction.buyerProfit }}
        </h3>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="display-1">
          <strong>Seller Profit: </strong> ${{ transaction.sellerProfit }}
        </h3>
      </v-flex>
      <v-flex xs12 class="ma-3 pa-5">
        <span class="animate-flicker">
          Waiting on your guide to end the round...
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "TransactionMade",
  props: {
    transaction: {
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
