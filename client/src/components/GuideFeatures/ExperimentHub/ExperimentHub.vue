<template>
  <v-container fluid grid-list color="primary">
    <v-layout row wrap justify-start column fill-height>
      <v-flex v-if="apolloLoading" xs12>
        <LoadingBlock />
      </v-flex>
      <v-flex v-else>
        <Joining v-if="joining" :experiment="experiment" />
        <GuideSessionManager v-if="sessionManager" :experiment="experiment" />
        <RoundSummary
          v-if="roundSummary"
          :experiment="experiment"
          :hide-round-summary="showRoundSummary"
        />
        <ExperimentSummary
          v-if="experimentSummary"
          :experimentId="experiment.id"
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
import ExperimentSummary from "../../common/ExperimentSummary";

export default {
  name: "ExperimentHub",
  components: {
    ExperimentSummary,
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
  computed: {
    joining() {
      return this.experiment.status === "joining";
    },
    sessionManager() {
      return (
        this.experiment.status === "session_start" ||
        this.experiment.status === "in_round"
      );
    },
    roundSummary() {
      return this.experiment.status === "round_summary";
    },
    experimentSummary() {
      return this.experiment.status === "closed";
    }
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
