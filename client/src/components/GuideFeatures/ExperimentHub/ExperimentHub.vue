<template>
  <v-container fluid grid-list color="primary">
    <v-layout row wrap justify-start column fill-height>
      <v-flex v-if="apolloLoading" xs12>
        <LoadingBlock />
      </v-flex>
      <v-flex v-else-if="experiment">
        <Joining
          v-if="experiment.status === 'joining'"
          :experiment="experiment"
        />
        <GuideSessionManager
          v-else-if="experiment.status === 'session_start'"
          :experiment="experiment"
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

export default {
  name: "ExperimentHub",
  components: {
    GuideSessionManager,
    GuideScenarioInstructions,
    Joining,
    LoadingBlock,
    InstructionsFAB
  },
  data() {
    return {
      apolloLoading: 0
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
