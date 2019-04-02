<template>
  <v-container fluid grid-list color="primary">
    <v-layout row wrap justify-start column fill-height>
      <v-flex v-if="apolloLoading" xs12>
        <LoadingBlock />
      </v-flex>
      <v-flex v-else>
        <Joining
          v-if="experiment.status === 'joining'"
          :experiment="experiment"
        />
        <GuideSessionManager
          v-if="
            experiment.status === 'session_start' ||
              experiment.status === 'in_round' ||
              experiment.status === 'round_summary'
          "
          :experiment="experiment"
        />
        <RoundSummary
          v-if="experiment.status === 'round_summary'"
          :experiment="experiment"
          :hide-round-summary="showRoundSummary"
        />
        <InstructionsFAB>
          <GuideScenarioInstructions :scenario="experiment.scenario" />
        </InstructionsFAB>
      </v-flex>
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
import RoundSummary from "./RoundSummaryController";

export default {
  name: "ExperimentHub",
  components: {
    GuideSessionManager,
    GuideScenarioInstructions,
    RoundSummary,
    Joining,
    LoadingBlock,
    InstructionsFAB
  },
  data() {
    return {
      apolloLoading: 0,
      showRoundSummary: false
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
