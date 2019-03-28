<template>
  <ApolloMutation
    :mutation="makeTransactionMutation"
    :variables="transactionVars"
    @done="handlePlayerTransaction"
  >
    <v-card
      slot-scope="{ mutate, loading, error }"
      dark
      flat
      height="600"
      elevation="4"
    >
      <v-card-title primary-title class="text-xs-center">
        <v-flex xs12>
          <h1 class="text-xs-center">Make A Transaction</h1>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-form v-model="validInput">
          <v-flex xs12 md6 offset-md3>
            <v-text-field
              v-model="sellerCode"
              label="Seller Code"
              disabled
              :rules="[
                textValidationRules.required,
                textValidationRules.validLength(6)
              ]"
              required
              class="my-4"
            />
            <v-text-field
              v-model="buyerCode"
              label="Buyer Code"
              :rules="[
                textValidationRules.required,
                textValidationRules.validLength(6)
              ]"
              required
              class="my-4"
            />
            <v-currency-field
              v-model="amount"
              label="Transaction Amount"
              v-bind="currencyConfig"
              class="my-4"
              :rules="[textValidationRules.required]"
              required
              type="number"
            />
          </v-flex>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-flex xs12>
          <v-btn
            :disabled="!validInput || loading || parsedAmount === 0"
            :loading="loading"
            color="primary3"
            @click="mutate"
          >
            Make Transaction
          </v-btn>
        </v-flex>
      </v-card-actions>
      <v-card-text v-if="error">
        <MutationErrorDisplay :error="error" />
      </v-card-text>
    </v-card>
  </ApolloMutation>
</template>

<script>
import InputValidationMixin from "../../../../mixins/InputValidationMixin";
import MutationErrorDisplay from "../../../common/MutationErrorDisplay";
import { makeTransactionMutation } from "./transactionQueries.graphql";

export default {
  name: "SellerView",
  components: { MutationErrorDisplay },
  mixins: [InputValidationMixin],
  props: {
    experimentPlayer: {
      type: Object,
      required: true
    },
    experimentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      amount: "0",
      currencyConfig: {
        decimal: ".",
        thousands: ",",
        prefix: "$",
        precision: 2,
        masked: true,
        allowBlank: false,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
      },
      buyerCode: "",
      makeTransactionMutation,
      sellerCode: this.experimentPlayer.playerCode,
      validInput: false
    };
  },
  computed: {
    parsedAmount() {
      return parseFloat(this.amount.replace(",", ""));
    },
    transactionVars() {
      return {
        experimentId: this.experimentId,
        sellerCode: this.sellerCode,
        buyerCode: this.buyerCode,
        amount: this.parsedAmount
      };
    }
  },
  methods: {
    handlePlayerTransaction({ data }) {
      alert("handled");
      console.log(data);
      this.$emit("transactionMade", data.makeTransaction);
    }
  }
};
</script>

<style scoped></style>
