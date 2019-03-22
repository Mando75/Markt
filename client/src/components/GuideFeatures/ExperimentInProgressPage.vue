<template>
  <v-container fluid color="secondary0">
    <v-layout row wrap>
      <v-flex md12 d-flex>
        <v-card flat>
          <v-card-title>Ready To start the thing?</v-card-title>
        </v-card>
      </v-flex>
      <v-flex d-flex md12 xs8>
        <v-card flat>
          <v-btn
            color="primary3"
            :loading="isLoading"
            :disabled="isLoading"
            @click="mutateVars"
            >Begin</v-btn
          >

          <span class="display-4 red">{{ warnings }}</span>
          <br />
          <span class="display-4 green">{{ successes }}</span>
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
      isLoading: 0
    };
  },
  methods: {
    mutateVars() {
      const guID = this.$credentials.guideId;
      const sceID = this.$credentials.scenarioId;
      try {
        this.$apollo.mutate({
          mutation: this.startEX,
          variables: {
            guID,
            sceID
          }
        });
      } catch (e) {
        this.warnings = e;
      }
      if (this.warnings === "") {
        this.successes = "Yay!";
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
