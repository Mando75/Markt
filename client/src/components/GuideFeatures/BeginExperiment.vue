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
              <v-btn
                large
                ref="goLive"
                class="justify-center my-4"
                color="primary darken-2"
                @click="startExperimentMutation"
              >
                Go Live
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn
      v-show="showFab"
      dark
      color="secondary darken-3"
      fixed
      large
      bottom
      round
      right
      @click="$vuetify.goTo($refs.goLive)"
      ><v-icon>keyboard_arrow_down</v-icon> Go Live</v-btn
    >
  </v-container>
</template>
<script>
import {
  startNewExperiment,
  scenario,
  experimentPlayerCount,
  experimentPlayerCountChanged
} from "./guideQueries.graphql";
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
      guID: "",
      sceID: "",
      warnings: "",
      successes: "",
      exId: "",
      joinCode: "",
      isLoading: 0,
      experimentStarted: false,
      showFab: true
    };
  },
  mounted() {
    document.onscroll = () => {
      this.showFab =
        window.innerHeight + window.scrollY < document.body.clientHeight;
    };
  },
  methods: {
    async startExperimentMutation() {
      const guID = this.$credentials.guideId;
      const sceID = this.$credentials.scenarioId;
      try {
        this.isLoading++;
        const { data } = await this.$apollo.mutate({
          mutation: startNewExperiment,
          variables: {
            guID,
            sceID
          }
        });
        this.exId = data.startNewExperiment.id;
        this.joinCode = data.startNewExperiment.joinCode;
        this.$credentials.experimentId = data.startNewExperiment.id;
      } catch (e) {
        this.warnings = e;
      }
      if (this.warnings === "") {
        this.successes = "Yay!";
        this.experimentStarted = true;
        this.$apollo.queries.experiment.skip = false;
      }
      this.isLoading--;
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
    },
    experiment: {
      query: experimentPlayerCount,
      variables() {
        return {
          experimentId: this.exId
        };
      },
      skip: true,
      loadingKey: "isLoading",
      subscribeToMore: {
        document: experimentPlayerCountChanged,
        variables() {
          return {
            experimentId: this.exId
          };
        }
      },
      updateQuery(prev, { subscriptionData }) {
        this.experiment = subscriptionData.data.playerJoinedExperiment;
      }
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
