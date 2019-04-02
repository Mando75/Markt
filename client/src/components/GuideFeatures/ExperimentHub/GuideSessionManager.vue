<template>
  <v-container>
    <div>
      <!--loading block-->
      <v-layout
        v-if="apolloLoading"
        align-center
        justify-start
        column
        fill-height
      >
        <LoadingBlock />
      </v-layout>
      <!--Main content-->
      <v-layout v-else justify-start row wrap fill-height>
        <v-flex>
          <InstructionViewer
            :instructions="activeRoundInstructions"
            :show-step="false"
          />
        </v-flex>
        <!--Card with ACTION-->
        <v-flex xs8 md4 offset-xs2 offset-md4 align-bottom>
          <v-card class="ma-3" elevation="4" dark>
            <v-card-title
              v-if="experiment.status === 'in_round'"
              class="subheading mBlack"
            >
              Round In Progress
              <v-progress-linear :width="3" color="green" indeterminate>
              </v-progress-linear>
            </v-card-title>
            <v-card-title v-else primary-title>
              <v-flex>
                <span>
                  Ready to start round
                  {{ roundNumberCheck }}
                  of
                  {{ experiment.activeSession.scenarioSession.numberOfRounds }}
                  ?
                </span>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <ApolloMutation
                :mutation="startNextRound"
                :variables="{ expId: experiment.id }"
                @done="beginRound"
              >
                <v-card slot-scope="{ mutate, loading }" flat>
                  <v-btn v-if="experiment.status === 'in_round'" disabled>
                    Start Round
                  </v-btn>
                  <v-btn
                    v-else
                    :disabled="loading"
                    :loading="loading"
                    color="primary"
                    @click="mutate"
                  >
                    Start Round
                  </v-btn>
                </v-card>
              </ApolloMutation>

              <!--endRound-->
              <ApolloMutation
                :mutation="endCurrentRound"
                :variables="{ expId: experiment.id }"
                @done="endRound"
              >
                <v-card slot-scope="{ mutate, loading }" flat>
                  <v-btn
                    v-if="experiment.status === 'in_round'"
                    :disabled="loading"
                    :loading="loading"
                    color="red"
                    @click="mutate"
                  >
                    End Round
                  </v-btn>
                  <v-btn v-else disabled>
                    End Round
                  </v-btn>
                </v-card>
              </ApolloMutation>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import LoadingBlock from "../../common/loadingBlock";
import InstructionViewer from "../../common/InstructionViewer";
import {
  startNextRound,
  endCurrentRound
} from "../guideExperimentQueries.graphql";

export default {
  name: "GuideSessionManager",
  components: { InstructionViewer, LoadingBlock },
  props: {
    experiment: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      apolloLoading: 0,
      theNextRoundNum: 0,
      roundIsRunning: false,
      theExperiment: this.experiment,
      startNextRound,
      endCurrentRound
    };
  },
  computed: {
    activeRoundInstructions() {
      const activeRound = this.experiment.activeRound;
      const index = activeRound ? activeRound.roundNumber - 1 : 0;
      return [
        this.experiment.activeSession.scenarioSession.instructions[index]
      ];
    },
    roundNumberCheck() {
      if (this.experiment.activeRound === null) {
        return 1;
      } else {
        return this.experiment.activeRound.roundNumber;
      }
    }
  },
  // mounted() {
  //   this.$apollo.queries.experimentStatus.skip = false;
  //   this.$apollo.subscriptions.experimentStatus.start();
  // },
  methods: {
    endRound() {
      this.roundIsRunning = false;
    },
    beginRound() {
      this.roundIsRunning = true;
    }
  }
  // apollo: {
  //   experimentStatus: {
  //     query: experimentStatus,
  //     loadingKey: "apolloLoading",
  //     fetchPolicy: "network-only",
  //     variables() {
  //       return {
  //         experimentId: this.$route.params.experimentId
  //       };
  //     },
  //     subscribeToMore: {
  //       document: experimentStatusChanged,
  //       variables() {
  //         return {
  //           experimentId: this.$route.params.experimentId
  //         };
  //       },
  //       updateQuery(prev, { subscriptionData }) {
  //         this.experiment = subscriptionData.data.experimentStatusChanged;
  //       }
  //     }
  //   }
  // }
};
</script>

<style scoped></style>
