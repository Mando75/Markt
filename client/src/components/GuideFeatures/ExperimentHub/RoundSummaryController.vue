<template>
  <div>
    <div v-if="hideRoundSummary">
      <span>BUTTS</span>
    </div>
    <div v-else>
      Here is the ROUND summary:
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
                @done="beginSesh"
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
          <v-flex>
            <v-card flat>
              <v-btn @click="dissmissSummary">Dismiss Round Summary</v-btn>
            </v-card>
          </v-flex>
          <v-flex>
            <ApolloMutation
              :mutation="endExperiment"
              :variables="{ expId: experiment.id }"
              @done="endExperimentFunc"
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

export default {
  name: "RoundSummary",
  components: { LoadingBlock },
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
      status: "value",
      code: this.experiment.id,
      apolloLoading: 0,
      theNextRoundNum: 0,
      startNextRound,
      startNextSession,
      endExperiment
    };
  },
  methods: {
    beginSesh() {
      this.status = "session_start";
    },
    dissmissSummary() {
      this.hideRoundSummary = !this.hideRoundSummary;
    },
    endExperimentFunc() {
      this.$router.push("/guide/home");
    }
  }
};
</script>

<style scoped></style>
