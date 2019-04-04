<template>
  <v-container>
    <LoadingBlock v-if="isLoading || !scenario" />
    <v-layout v-else column justify-start fill-height>
      <!-- Header and instruction -->
      <v-flex xs12>
        <h2 class="display-2">{{ scenario.name }} Preview</h2>
        <ActiveExperiments :scenario-id="scenario.id" class="my-4" />
        <v-card class="mt-4">
          <v-card-text>
            <GuideScenarioInstructions :scenario="scenario" class="mt-4" />
          </v-card-text>
        </v-card>
        <!--Confirmation things-->
        <v-layout align-center justify-center fill-height>
          <v-flex d-flex xs4 sm5 align-bottom>
            <ApolloMutation
              :mutation="startNewExperiment"
              :variables="{ guID: guideId, sceID: scenario.id }"
              @done="handleExperimentStart"
            >
              <v-card
                slot-scope="{ mutate, loading }"
                class="ma-3"
                dark
                elevation="4"
              >
                <span>
                  Are you ready to go live?
                </span>

                <v-btn
                  ref="goLive"
                  large
                  class="justify-center my-4"
                  color="primary"
                  :disabled="loading"
                  :loading="loading"
                  @click="mutate"
                >
                  Go Live
                </v-btn>
              </v-card>
            </ApolloMutation>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn
      v-show="showFab"
      color="primary"
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
import {
  startNewExperiment,
  scenario
} from "../guideExperimentQueries.graphql";
import LoadingBlock from "../../common/loadingBlock";
import GuideScenarioInstructions from "../GuideScenarioInstructions";
import ActiveExperiments from "./ActiveExperiments";

export default {
  name: "BeginExperiment",
  components: {
    ActiveExperiments,
    GuideScenarioInstructions,
    LoadingBlock
  },
  data() {
    return {
      guideId: this.$credentials.guideId,
      isLoading: 0,
      showFab: true,
      startNewExperiment
    };
  },
  mounted() {
    this.$apollo.queries.scenario.skip = false;
    document.onscroll = () => {
      this.showFab =
        window.innerHeight + window.scrollY < document.body.clientHeight;
    };
  },
  methods: {
    handleExperimentStart({ data }) {
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
      variables() {
        return {
          code: this.$route.params.scenarioCode
        };
      },
      loadingKey: "isLoading",
      skip: true
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
