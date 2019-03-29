<template>
  <div>
    <v-layout justify-start column fill-height v-if="apolloLoading">
      <LoadingBlock />
    </v-layout>
    <v-layout v-else justify-start column fill-height>
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
  </div>
</template>

<script>
import GuideScenarioInstructions from "./GuideScenarioInstructions";
import {
  experimentPlayerCount,
  experimentPlayerCountChanged
} from "./guideQueries.graphql";
import LoadingBlock from "../common/loadingBlock";
export default {
  name: "Joining",
  components: { LoadingBlock, GuideScenarioInstructions },
  props: {
    experiment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      apolloLoading: 0
    };
  },
  apollo: {
    experimentPlayerCount: {
      query: experimentPlayerCount,
      variables() {
        return {
          experimentId: this.experiment.id
        };
      },
      loadingKey: "apolloLoading",
      subscribeToMore: {
        document: experimentPlayerCountChanged,
        variables() {
          return {
            experimentId: this.experimentId
          };
        }
      },
      updateQuery(prev, { subscriptionData }) {
        this.experimentPlayerCount =
          subscriptionData.data.playerJoinedExperiment;
      }
    }
  }
};
</script>

<style scoped></style>
