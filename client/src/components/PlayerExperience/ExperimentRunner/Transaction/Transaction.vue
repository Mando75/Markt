<template>
  <v-container class="ma-auto pt-5">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h3 class="display-3"><strong>Your Player Code: </strong></h3>
        <br />
        <span class="display-3">{{ experimentPlayer.playerCode }}</span>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <component
          :is="loadTransactionComponent"
          :experiment-player="experimentPlayer"
          :experiment-id="experimentId"
          :transaction="transaction"
          @transactionMade="updateComponent"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Transaction",
  props: {
    experimentId: {
      type: String,
      required: true
    },
    experimentPlayer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      madeTransaction: false,
      transaction: {}
    };
  },
  computed: {
    loadTransactionComponent() {
      const allowSell = this.experimentPlayer.currentSessionRole.allowSell;
      if (this.madeTransaction) {
        // transaction is made
        return () => import("./TransactionMade");
      } else if (allowSell) {
        // seller
        return () => import("./SellerView");
      } else {
        // buyer
        return () => import("./BuyerView");
      }
    }
  },
  methods: {
    updateComponent(transaction) {
      this.madeTransaction = true;
      this.transaction = transaction;
    }
  }
};
</script>

<style scoped></style>
