<template>
  <v-container fluid grid-list color="secondary0">
    <v-layout row wrap justify-start column fill-height>
      <v-flex md12 d-flex>
        <v-card flat>
          <v-img></v-img>
          <h1 class="display-1">
            Are you sure you are ready to begin?
          </h1>
          <v-card-text>
            Once an experiment has begun, you will not be able to add more
            users. Make sure the players are invited and the correct scenario is
            selected.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center v-if="this.$credentials.sSelect === ''">
      <v-flex d-flex md12 sm12>
        <v-card dark>
          <v-card-title class="justify-center display-1"
            >Wait! Go Back!</v-card-title
          >
          <v-card-text
            >You need to select a scenario before starting an
            experiment.</v-card-text
          >
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else align-center justify-center fill-height>
      <v-flex d-flex xs4 sm4 align-bottom>
        <v-card class="ma-3" dark>
          <v-img></v-img>
          <v-card-title class="subheading justify-center"
            >Begin "{{ $credentials.sSelect }}"?
          </v-card-title>

          <v-btn class="justify-center" color="primary3" @click="mutateVars"
            >Begin</v-btn
          >
          <v-card-text>
            <span class="display-4 red">{{ warnings }}</span>
            <span class="display-4 green">{{ successes }}</span>

            <span class="display-4 green">{{ exId }}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "ExperimentInProgressPage",
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
    },
    showItems() {}
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
