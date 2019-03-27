<template>
  <v-container class="ma-auto pt-5">
    <v-layout>
      <v-flex v-if="canMakeTransaction" xs12 sm6 offset-sm3>
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
      </v-flex>
      <v-flex v-else-if="madeTransaction" xs12 sm6 offset-sm3>
        <h3 class="display-3">Nice!</h3>
        <h2 class="display-1">Please wait for the round to end</h2>
        <div class="ma-5 pa-5">
          <span class="animate-flicker"
            >Waiting on your guide to end the round...</span
          >
        </div>
      </v-flex>
      <v-flex v-else xs12>
        <h1 class="display-3 my-4">You cannot sell this round</h1>
        <h3 class="display-2 mt-4"><strong>Profit Equation</strong></h3>
        <span class="display-2">
          {{ experimentPlayer.currentSessionRole.profitEquation }}
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import InputValidationMixin from "../../../mixins/InputValidationMixin";
import { makeTransactionMutation } from "./experimentRunnerQueries.graphql";
import MutationErrorDisplay from "../../common/MutationErrorDisplay";

export default {
  name: "Transaction",
  components: { MutationErrorDisplay },
  mixins: [InputValidationMixin],
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
      makeTransactionMutation,
      sellerCode: this.experimentPlayer.playerCode,
      buyerCode: "",
      amount: "0",
      madeTransaction: false,
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
      validInput: false
    };
  },
  computed: {
    canMakeTransaction() {
      return (
        this.experimentPlayer.currentSessionRole.allowSell &&
        !this.madeTransaction
      );
    },
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
      this.madeTransaction = true;
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
