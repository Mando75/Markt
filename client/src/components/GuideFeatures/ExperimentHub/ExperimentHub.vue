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
        <GuideSessionManager v-else :experiment="experiment" />

        <InstructionsFAB>
          <GuideScenarioInstructions :scenario="experiment.scenario" />
        </InstructionsFAB>
      </v-flex>
      <RoundSummary
        v-if="experiment.status === 'round_summary'"
        :experiment="experiment"
      />
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
