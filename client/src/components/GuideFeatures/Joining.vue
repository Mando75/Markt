<template>
  <v-layout justify-start column fill-height>
    <v-flex xs12 d-flex>
      <h1 class="display-1">
        You are now live. Waiting for players to join...
      </h1>
      <h3 class="display-3">
        Join Code: <strong>{{ experiment.joinCode }}</strong>
      </h3>
    </v-flex>
    <v-flex xs12 d-flex>
      <GuideScenarioInstructions :scenario="experiment.scenario" />
    </v-flex>
  </v-layout>
</template>

<script>
import GuideScenarioInstructions from "./GuideScenarioInstructions";
import {
  experimentPlayerCount,
  experimentPlayerCountChanged
} from "./guideQueries.graphql";
export default {
  name: "Joining",
  components: { GuideScenarioInstructions },
  props: {
    experimentId: {
      type: Object,
      required: true
    }
  },
  apollo: {
    experiment: {
      query: experimentPlayerCount,
      variables() {
        return {
          experimentId: this.experimentId
        };
      },
      loadingKey: "isLoading",
      subscribeToMore: {
        document: experimentPlayerCountChanged,
        variables() {
          return {
            experimentId: this.experimentId
          };
        }
      },
      updateQuery(prev, { subscriptionData }) {
        this.experiment = subscriptionData.data.playerJoinedExperiment;
      }
    }
  }
};
</script>

<style scoped></style>
