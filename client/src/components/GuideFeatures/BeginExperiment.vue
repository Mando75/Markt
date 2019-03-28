<template>
  <div>
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
    <LoadingBlock v-else-if="isLoading" />
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
        <v-flex xs4 order-lg2 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <b>"BOLD"</b> text denote actions to perform.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 2-->
        <v-flex xs4 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <i>"ITALIC"</i> represent words to be said.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 3-->
        <v-flex xs4 order-lg2 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              Students Joined Count: {{ appleSesh }}
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
          <v-card class="ma-3" dark elevation="4">
            <h1
              class=" mb-0 xs1 text-md-center text-lg-center text-xs-center headline"
            >
              <div class="mt-4  ">Begin "{{ $credentials.sSelect }}"</div>
              With "{{ playerCount }}" players?
            </h1>

            <v-btn
              class="justify-center mt-3 mb-0"
              color="primary3"
              @click="mutateVars"
            >
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
  </div>
</template>

<script>
import gql from "graphql-tag";
import InstructionViewer from "../common/InstructionViewer";

export default {
  name: "ExperimentInProgressPage",
  components: { InstructionViewer },
  data() {
    return {
      startRes: {},
      guID: "",
      sceID: "",
      startEX: gql`
        mutation startNewExperiment($sceID: ID!, $guID: ID!) {
          startNewExperiment(params: { scenarioId: $sceID, guideId: $guID }) {
            id
          }
        }
      `,
      warnings: "",
      successes: "",
      exId: "",
      playerCount: 0,
      isLoading: 0
    };
  },
  methods: {
    async mutateVars() {
      const guID = this.$credentials.guideId;
      const sceID = this.$credentials.scenarioId;
      try {
        this.startRes = await this.$apollo.mutate({
          mutation: this.startEX,
          variables: {
            guID,
            sceID
          }
        });
        this.exId = this.startRes.data.startNewExperiment.id;
      } catch (e) {
        this.warnings = e;
      }
      if (this.warnings === "") {
        this.successes = "Yay!";
        this.$router.push("/guide/experiment");
      }
    }
  },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    scenario: {
      // gql query
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            id
            name
            description
            instructions {
              step
              header
              bullets {
                format
                text
              }
            }
          }
        }
      `,
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
