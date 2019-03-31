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
            :instructions="[
              experiment.activeSession.scenarioSession.instructions[0]
            ]"
            :show-step="false"
          />
        </v-flex>
        <!--Card with ACTION-->
        <v-flex xs8 md4 offset-xs2 offset-md4 align-bottom>
          <v-card class="ma-3" elevation="4" dark>
            <v-card-title v-if="!roundIsRunning" primary-title>
              <v-flex>
                <span
                  >Ready to start round {{ roundNumberCheck }} of
                  {{ experiment.activeSession.scenarioSession.numberOfRounds }}
                  ?</span
                >
              </v-flex>
            </v-card-title>
            <v-card-title v-else class="subheading mBlack">
              Round In Progress
              <v-progress-linear :width="3" color="green" indeterminate>
              </v-progress-linear>
            </v-card-title>
            <v-card-text>
              <v-btn v-if="!roundIsRunning" @click="beginRound" color="primary">
                Start Round
              </v-btn>
              <v-btn v-else disabled>
                Start Round
              </v-btn>
              <v-btn v-if="roundIsRunning" @click="endRound" color="red">
                End Round
              </v-btn>
              <v-btn v-else disabled>End Round</v-btn>

              <!--TODO go until end round on this branch-->
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
// import { startNextSession } from "../guideExperimentQueries.graphql";

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
      roundIsRunning: false
    };
  },
  computed: {
    roundNumberCheck() {
      if (this.experiment.activeRound === null) {
        return 1;
      } else {
        return this.experiment.activeRound.roundNumber + 1;
      }
    }
  },
  methods: {
    beginRound() {
      this.roundIsRunning = !this.roundIsRunning;
    },
    endRound() {
      this.roundIsRunning = !this.roundIsRunning;
    }
  }
  // apollo: {
  //   session:{
  //     mutation:
  //   }
  // }
};
</script>

<style scoped>
/*.should {*/
/*disabled: true;*/
/*}*/
</style>
