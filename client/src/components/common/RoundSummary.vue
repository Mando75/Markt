<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 my-4>
        <h1 class="display-3">Round Summary</h1>
      </v-flex>
      <v-flex v-for="data in dataPoints" :key="data.name" xs12 md6 my-4>
        <h3 class="display-1">
          {{ data.name }}
        </h3>
        <span class="display-1">
          {{ data.text }}
        </span>
      </v-flex>
      <v-flex xs12 my-4>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(t, i) in summary.transactions"
            :key="t.id"
          >
            <div slot="header">
              Transaction {{ i + 1 }} ({{ t.amount | formatCurrency }})
            </div>
            <v-card>
              <v-card-text>
                <v-layout mx-2 row wrap>
                  <v-flex xs12 md4 my-1>
                    <span>
                      <strong>Amount:</strong>
                      {{ t.amount | formatCurrency }}
                    </span>
                  </v-flex>
                  <v-flex xs12 md4 my-1>
                    <span>
                      <strong>Buyer:</strong>
                      {{ t.buyer.player.firstName }}
                      {{ t.buyer.player.lastName }}
                      ({{ t.buyer.player.playerCode }})
                    </span>
                    <br />
                    <span>
                      <strong>Profit:</strong>
                      {{ t.buyerProfit | formatCurrency }}
                    </span>
                  </v-flex>
                  <v-flex xs12 md4 my-1>
                    <span>
                      <strong>Seller:</strong>
                      {{ t.seller.player.firstName }}
                      {{ t.seller.player.lastName }}
                      ({{ t.seller.player.playerCode }})
                    </span>
                    <br />
                    <span>
                      <strong>Profit:</strong>
                      {{ t.sellerProfit | formatCurrency }}
                    </span>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RoundSummary",
  props: {
    summary: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    dataPoints() {
      return [
        {
          name: "Number of Transactions",
          text: this.summary.numTransactions
        },
        {
          name: "Average Price",
          text: this.$options.filters.formatCurrency(this.summary.averagePrice)
        },
        {
          name: "Max Price",
          text: this.$options.filters.formatCurrency(this.summary.maxPrice)
        },
        {
          name: "Min Price",
          text: this.$options.filters.formatCurrency(this.summary.minPrice)
        }
      ];
    }
  }
};
</script>

<style scoped></style>
