<template>
  <div>
    <v-layout column>
      <v-flex xs12>
        <h3 class="display-2">Nice!</h3>
        <h2 class="headline">Please wait for the round to end</h2>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="headline">
          <strong>Amount: </strong> ${{ transaction.amount }}
        </h3>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="headline">
          <strong>Buyer Profit: </strong> ${{ transaction.buyerProfit }}
        </h3>
      </v-flex>
      <v-flex xs12 row class="ma-3">
        <h3 class="headline">
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

<style scoped></style>
