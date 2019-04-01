<template>
  <div>
    here is the ROUND summary:
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
          <v-card>
            <ApolloMutation
              :mutation="startNextSession"
              :variables="{ expId: experiment.id }"
              @done="beginSesh(code)"
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
          <v-card>
            <v-btn>Start New Round</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {
  startNextRound,
  startNextSession
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
    }
  },
  data() {
    return {
      status: "value",
      code: this.experiment.id,
      apolloLoading: 0,
      theNextRoundNum: 0,
      startNextRound,
      startNextSession
    };
  },
  methods: {
    beginSesh(code) {
      this.$router.push(`/guide/experiments/${code}`);
    }
  },
  apollo: {
    startNextSession: {
      mutation: startNextSession,
      variables() {
        return {
          experimentId: this.experiment.id
        };
      },
      warningMsg: []
    }
  }
};
</script>

<style scoped></style>
