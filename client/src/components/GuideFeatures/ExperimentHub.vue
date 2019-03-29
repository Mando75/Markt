<template>
  <v-container fluid grid-list color="secondary0">
    <v-layout row wrap justify-start column fill-height>
      <v-flex v-if="apolloLoading" xs12>
        <LoadingBlock />
      </v-flex>
      <v-flex v-else-if="experiment">
        <Joining
          v-if="experiment.status === 'joining'"
          :experiment="experiment"
        />
        <InstructionsFAB :scenario="experiment.scenario" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InstructionsFAB from "../common/InstructionsFAB";
import { experimentHubController } from "./guideQueries.graphql";
import LoadingBlock from "../common/loadingBlock";
import Joining from "./Joining";

export default {
  name: "ExperimentHub",
  components: { Joining, LoadingBlock, InstructionsFAB },
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
