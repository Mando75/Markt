<template>
  <v-container class="ma-auto pt-5">
    <v-layout row wrap justify-start>
      <v-flex xs12>
        <v-card flat color="mBackground">
          <v-card-title class="headline font-weight-bold">
            Your Player Code: {{ experimentPlayer.playerCode }}
          </v-card-title>
          <v-divider color="primary" />
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 d-flex offset-sm3>
        <v-card flat color="mBackground">
          <component
            :is="loadTransactionComponent"
            :experiment-player="experimentPlayer"
            :experiment-id="experimentId"
            :transaction="transaction"
            @transactionMade="updateComponent"
          />
        </v-card>
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
