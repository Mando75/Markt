<template>
  <v-container>
    <LoadingBlock v-if="isLoading" />
    <v-layout v-else column justify-start fill-height>
      <!-- Header and instruction -->
      <v-flex xs12>
        <h2 class="display-2">{{ scenario.name }} Preview</h2>
        <v-card class="mt-4">
          <v-card-text>
            <GuideScenarioInstructions :scenario="scenario" class="mt-4" />
          </v-card-text>
        </v-card>
        <!--Confirmation things-->
        <v-layout align-center justify-center fill-height>
          <v-flex d-flex xs4 sm5 align-bottom>
            <v-card v-if="!experimentStarted" class="ma-3" dark elevation="4">
              <span>
                Are you ready to go live?
              </span>
              <ApolloMutation
                :mutation="startNewExperiment"
                :variables="{ guID: guideId, sceID: scenarioId }"
                @done="handleExperimentStart"
              >
                <v-btn
                  slot-scope="{ mutate, loading }"
                  ref="goLive"
                  large
                  class="justify-center my-4"
                  color="primary darken-2"
                  :disabled="loading"
                  @click="mutate"
                >
                  Go Live
                </v-btn>
              </ApolloMutation>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn
      v-show="showFab"
      color="secondary darken-3"
      large
      round
      fixed
      bottom
      right
      @click="$vuetify.goTo($refs.goLive)"
      ><v-icon>keyboard_arrow_down</v-icon> Go Live</v-btn
    >
  </v-container>
</template>
<script>
import { startNewExperiment, scenario } from "./guideQueries.graphql";
import LoadingBlock from "../common/loadingBlock";
import GuideScenarioInstructions from "./GuideScenarioInstructions";

export default {
  name: "BeginExperiment",
  components: {
    GuideScenarioInstructions,
    LoadingBlock
  },
  data() {
    return {
      guideId: this.$credentials.guideId,
      scenarioId: this.$credentials.scenarioId,
      isLoading: 0,
      showFab: true,
      startNewExperiment
    };
  },
  mounted() {
    document.onscroll = () => {
      this.showFab =
        window.innerHeight + window.scrollY < document.body.clientHeight;
    };
  },
  methods: {
    async handleExperimentStart({ data }) {
      this.$credentials.experimentId = data.startNewExperiment.id;
      this.$router.push(`/guide/experiment/${data.startNewExperiment.id}`);
    }
  },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    scenario: {
      // gql query
      query: scenario,
      // Static parameters
      variables: {
        code: "APPLMRKT"
      },
      loadingKey: "isLoading"
    }
  }
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
