<template>
  <div>
    <v-container v-if="!experimentStarted">
      <v-layout row wrap justify-start column fill-height>
        <v-flex md12 d-flex>
          <v-alert color="success" :value="true">
            Are you ready for players to join?
            <v-btn @click="startExperimentMutation">
              Go Live
            </v-btn>
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="experimentStarted && experiment">
      <v-layout row wrap justify-start column fill-height>
        <v-flex md12 d-flex>
          <h3>Join Code: {{ experiment.joinCode }}</h3>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="this.$credentials.sSelect === ''">
      <v-layout row wrap justify-start column fill-height>
        <v-flex md12 d-flex>
          <v-card flat>
            <v-img></v-img>
            <h1 class="display-1 justify-center ">
              Wait! Go Back!
            </h1>
            <v-card-text>
              You need to select a scenario before starting an experiment.
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <LoadingBlock v-if="isLoading" />
    <v-container v-else fluid grid-list color="secondary0">
      <!--begin exp title or header thing.-->
      <v-layout justify-start column fill-height>
        <v-flex xs12>
          <v-card flat fill-height class="pt-3">
            <h1 class="display-2">Instructions for {{ scenario.name }}</h1>
            <br />
          </v-card>
          <v-divider />
        </v-flex>
      </v-layout>

      <!--description card-->
      <v-layout cloumn justify-start>
        <v-flex d-flex xs12>
          <v-card flat>
            <v-card-text class="font-weight-thin  block-comment subheading ">
              <v-flex sm6 offset-xs3>
                <div class="headline">Description</div>
                {{ scenario.description }}
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!--Important info Cards-->
      <!--tile 1-->
      <v-layout wrap row>
        <v-flex xs6 order-lg1 d-flex>
          <v-card dark tile flat color="primary darken-4">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <b>"BOLD"</b> text denote actions to perform.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 2-->
        <v-flex xs6 order-lg1 d-flex>
          <v-card dark tile flat color="primary darken-4">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <i>"ITALIC"</i> represent words to be said.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 3-->
        <v-flex xs12 order-md2>
          <v-card persistent dark tile flat color="primary darken-4 lighten-1">
            <v-card-text
              v-if="experimentStarted && experiment"
              class="title font-weight-black"
            >
              Students Joined Count: {{ experiment.numPlayers }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!--bullet points-->
      <InstructionViewer :instructions="scenario.instructions" />
      <v-flex> <v-divider /> </v-flex>
      <!--The warning before confirmation-->
      <v-layout cloumn justify-start>
        <v-flex d-flex xs12>
          <v-card flat>
            <v-card-text class="font-weight-thin  block-comment subheading ">
              <v-flex>
                <!--Once an experiment has begun, you will not be able to add more-->
                <!--users. <br />-->
                Make sure the players are invited and the correct scenario is
                selected.
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!--Confirmation things-->
      <v-layout align-center justify-center fill-height>
        <v-flex d-flex xs4 sm5 align-bottom>
          <v-card v-if="!experimentStarted" class="ma-3" dark elevation="4">
            <h1
              class=" my-4 xs1 text-md-center text-lg-center text-xs-center headline"
            >
              Are you ready to go live?
            </h1>
            <v-btn
              class="justify-center my-4"
              color="primary darken-2"
              @click="startExperimentMutation"
            >
              Go Live
            </v-btn>
          </v-card>
          <v-card v-else class="ma-3" dark elevation="4">
            <h1
              class=" mb-0 xs1 text-md-center text-lg-center text-xs-center headline"
            >
              <div class="mt-4">Begin "{{ $credentials.sSelect }}"</div>
              With "{{ experiment.numPlayers }}" players?
            </h1>

            <v-btn class="justify-center mt-3 mb-0" color="primary darken-4">
              Begin
            </v-btn>
            <v-card-text>
              <!--<span class="display-4 red">{{ warnings }}</span>-->
              <!--<span class="display-4 green">{{ successes }}</span>-->

              <!--<span class="display-4 green">{{ exId }}</span>-->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <InstructionsFAB v-if="!isLoading" :scenario="scenario" />
  </div>
</template>

<script>
import InstructionViewer from "../common/InstructionViewer";
import InstructionsFAB from "../common/InstructionsFAB";
import {
  startNewExperiment,
  scenario,
  experimentPlayerCount,
  experimentPlayerCountChanged
} from "./guideQueries.graphql";
import LoadingBlock from "../common/loadingBlock";

export default {
  name: "BeginExperiment",
  components: { LoadingBlock, InstructionsFAB, InstructionViewer },
  data() {
    return {
      guID: "",
      sceID: "",
      warnings: "",
      successes: "",
      exId: "",
      joinCode: "",
      isLoading: 0,
      experimentStarted: false
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
