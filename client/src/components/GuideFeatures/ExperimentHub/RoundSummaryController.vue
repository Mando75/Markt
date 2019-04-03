<template>
  <div>
    <div v-if="hideRoundSummary">
      <span>BUTTS</span>
    </div>
    <div v-else>
      <RoundSummary :summary="experiment.lastRoundSummaryReport" />
      <ScenarioOverview :overview="currentOverview" />
      <v-layout
        v-if="apolloLoading"
        align-center
        justify-start
        column
        fill-height
      >
        <LoadingBlock />
      </v-layout>
      <v-container v-else>
        <v-layout>
          <v-flex>
            <v-card flat>
              <ApolloMutation
                :mutation="startNextSession"
                :variables="{ expId: experiment.id }"
              >
                <v-card slot-scope="{ mutate, loading }" flat>
                  <v-btn
                    :disabled="loading"
                    :loading="loading"
                    color="primary"
                    @click="mutate"
                  >
                    Start Next Session
                  </v-btn>
                </v-card>
              </ApolloMutation>
            </v-card>
          </v-flex>
          <v-flex v-if="canStartRound">
            <ApolloMutation
              :mutation="startNextRound"
              :variables="{ expId: experiment.id }"
            >
              <v-card slot-scope="{ mutate, loading }" flat>
                <v-btn
                  :disabled="loading"
                  :loading="loading"
                  color="primary"
                  @click="mutate"
                >
                  Start Next Round
                </v-btn>
              </v-card>
            </ApolloMutation>
          </v-flex>
          <v-flex>
            <ApolloMutation
              :mutation="endExperiment"
              :variables="{ expId: experiment.id }"
              @done="print"
              @error="print"
            >
              <v-card slot-scope="{ mutate, loading }" flat>
                <v-btn
                  :disabled="loading"
                  :loading="loading"
                  color="primary"
                  @click="mutate"
                >
                  End the Experiment
                </v-btn>
              </v-card>
            </ApolloMutation>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  startNextRound,
  startNextSession,
  endExperiment
} from "../guideExperimentQueries.graphql";
import LoadingBlock from "../../common/loadingBlock";
import RoundSummary from "../../common/RoundSummary";
import ScenarioOverview from "../ScenarioOverview";

export default {
  name: "RoundSummaryController",
  components: { ScenarioOverview, RoundSummary, LoadingBlock },
  props: {
    experiment: {
      type: Object,
      required: true,
      default: () => ({})
    },
    hideRoundSummary: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      code: this.experiment.id,
      apolloLoading: 0,
      theNextRoundNum: 0,
      startNextRound,
      startNextSession,
      endExperiment
    };
  },
  computed: {
    canStartRound() {
      const as = this.experiment.activeSession;
      return as ? as.ranRounds !== as.scenarioSession.numberOfRounds : true;
    },
    currentOverview() {
      const scenario = this.experiment.scenario;
      const index = this.experiment.activeSession.sessionNumber - 1;
      return scenario.overview[index];
    }
  },
  methods: {
    print(val) {
      console.log(val);
      // this.$router.push("/guide/home");
    }
  }
};
</script>

<style scoped></style>
