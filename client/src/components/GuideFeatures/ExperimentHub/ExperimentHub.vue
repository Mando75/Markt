<template>
  <v-container fluid grid-list color="primary">
    <v-layout row wrap justify-start column fill-height>
      <v-flex v-if="apolloLoading" xs12>
        <LoadingBlock />
      </v-flex>
      <v-flex v-else-if="experiment">
        <RoundSummary
          v-if="experiment.status === 'round_summary'"
          :experiment="experiment"
        />
        <Joining
          v-else-if="experiment.status === 'joining'"
          :experiment="experiment"
        />
        <GuideSessionManager
          v-else-if="
            this.$credentials.exStatus === 'newRound' ||
              this.$credentials.exStatus === 'newSession' ||
              experiment.status === 'in_round'
          "
          :experiment="experiment"
        />

        <InstructionsFAB>
          <GuideScenarioInstructions :scenario="experiment.scenario" />
        </InstructionsFAB>
      </v-flex>
      <div v-else>1</div>
    </v-layout>
  </v-container>
</template>

<script>
import InstructionsFAB from "../../common/InstructionsFAB";
import { experimentHubController } from "../guideExperimentQueries.graphql";
import LoadingBlock from "../../common/loadingBlock";
import Joining from "./Joining";
import GuideScenarioInstructions from "../GuideScenarioInstructions";
import GuideSessionManager from "./GuideSessionManager";
import RoundSummary from "./RoundSummary";

export default {
  name: "ExperimentHub",
  components: {
    RoundSummary,
    GuideSessionManager,
    GuideScenarioInstructions,
    Joining,
    LoadingBlock,
    InstructionsFAB
  },
  data() {
    return {
      apolloLoading: 0,
      goBack: false
    };
  },
  apollo: {
    experiment: {
      query: experimentHubController,
      variables() {
        return {
          experimentId: this.$route.params.experimentId
        };
      },
      loadingKey: "apolloLoading"
    }
  }
};
</script>

<style scoped></style>
