<template>
  <div>
    <v-layout
      align-center
      justify-start
      column
      fill-height
      v-if="apolloLoading || !experimentPlayerCount"
    >
      <LoadingBlock />
    </v-layout>
    <v-layout v-else justify-start row wrap fill-height>
      <v-flex xs12 my-3>
        <span class="display-1">
          You are now live!
        </span>
      </v-flex>
      <v-flex xs12 my-3>
        <span class="display-3">
          Join Code: <strong>{{ experiment.joinCode }}</strong>
        </span>
      </v-flex>
      <v-flex my-3>
        <span class="display-1">
          Player Count: {{ experimentPlayerCount.numPlayers }}/{{
            experiment.scenario.maxPlayerSize
          }}
        </span>
      </v-flex>
      <v-flex xs12 my-3>
        <span v-if="experimentFull">Experiment is full</span>
        <span v-else class="animate-flicker">
          Waiting for players to join...</span
        >
      </v-flex>
      <v-flex xs8 md4 offset-xs2 offset-md4 align-bottom>
        <v-card class="ma-3" elevation="4" dark>
          <v-card-title primary-title>
            <v-flex>
              <span>Ready to start the first session?</span>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-btn color="primary">
              Start Session
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GuideScenarioInstructions from "../GuideScenarioInstructions";
import {
  experimentPlayerCount,
  experimentPlayerCountChanged
} from "../guideExperimentQueries.graphql";
import LoadingBlock from "../../common/loadingBlock";
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
  mounted() {
    this.$apollo.queries.experimentPlayerCount.skip = false;
  },
  computed: {
    experimentFull() {
      return this.experimentPlayerCount
        ? this.experimentPlayerCount.numPlayers ===
            this.experiment.scenario.maxPlayerSize
        : false;
    }
  },
  apollo: {
    experimentPlayerCount: {
      query: experimentPlayerCount,
      variables() {
        return {
          experimentId: this.experiment.id
        };
      },
      skip: true,
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
