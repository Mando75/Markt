<template>
  <v-container>
    <LoadingBlock v-if="apolloLoading" />
    <v-layout v-else row wrap>
      <v-flex xs12 my-4>
        <h1 class="display-3">Experiment Summary</h1>
      </v-flex>
      <v-flex xs12 my-4>
        <h3 class="display-1">
          Total Number of Transactions: {{ experimentSummary.numTransactions }}
        </h3>
      </v-flex>
      <v-flex xs12 my-4>
        <v-card>
          <v-card-title primary-title>
            <h3 class="display-1">
              Player Profits
            </h3>
          </v-card-title>

          <v-list>
            <v-list-tile
              v-for="player in experimentSummary.players"
              :key="player.id"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ player.player.firstName }} {{ player.player.lastName }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  {{ player.totalProfit | formatCurrency }}
                </v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { experimentSummary } from "./experimentSummaryQueries.graphql";
import LoadingBlock from "./loadingBlock";
export default {
  name: "ExperimentSummary",
  components: { LoadingBlock },
  props: {
    experimentId: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      apolloLoading: 0
    };
  },
  apollo: {
    experimentSummary: {
      query: experimentSummary,
      update(data) {
        console.log(data);
        return data.experiment.experimentSummaryReport;
      },
      loadingKey: "apolloLoading",
      variables() {
        return {
          experimentId: this.experimentId
        };
      }
    }
  }
};
</script>

<style scoped></style>
