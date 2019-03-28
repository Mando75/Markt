<template>
  <v-container class="ma-auto pt-5">
    <!--<LoadingBlock v-if="this.$apollo.loading" />-->
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <ApolloMutation
          :mutation="joinExperimentMutation"
          :variables="{ playerCode, joinCode }"
          @done="handlePlayerJoin"
        >
          <v-card
            slot-scope="{ mutate, loading, error }"
            dark
            flat
            height="600"
            elevation="4"
          >
            <v-img
              :src="require('@/assets/mainStockStockimg.png')"
              aspect-ratio="2.75"
            />
            <v-card-title primary-title>
              <v-flex xs12>
                <h1>Enter the Join Code</h1>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-form v-model="validInput">
                <v-flex xs12 md6 offset-md3>
                  <v-text-field
                    v-model="joinCode"
                    label="Experiment Join Code"
                    :rules="[
                      textValidationRules.required,
                      textValidationRules.validLength(6)
                    ]"
                    required
                  />
                  <v-text-field
                    v-model="playerCode"
                    label="Your Player Code"
                    :rules="[
                      textValidationRules.required,
                      textValidationRules.validLength(6)
                    ]"
                    required
                  />
                </v-flex>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-flex xs12>
                <v-btn
                  class="join-actions"
                  :disabled="!validInput || loading"
                  :loading="loading"
                  color="monochrome3"
                  @click="mutate"
                >
                  Join Experiment
                </v-btn>
              </v-flex>
            </v-card-actions>
            <v-card-text v-if="error">
              <MutationErrorDisplay :error="error" />
            </v-card-text>
          </v-card>
        </ApolloMutation>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InputValidationMixin from "../../mixins/InputValidationMixin";
import { joinExperiment } from "./joinExperiment.graphql";
import MutationErrorDisplay from "../common/MutationErrorDisplay";

export default {
  name: "JoinExperiment",
  components: { MutationErrorDisplay },
  mixins: [InputValidationMixin],
  data() {
    return {
      joinCode: "",
      joinExperimentMutation: joinExperiment,
      playerCode: "",
      validInput: false
    };
  },
  methods: {
    handlePlayerJoin({ data }) {
      this.$credentials.authenticated = true;
      this.$credentials.isPlayer = true;
      this.$credentials.isUser = false;
      this.$credentials.experimentId = data.joinExperiment.experiment.id;
      this.$credentials.experimentPlayerId = data.joinExperiment.id;
      this.$router.push("/player/play");
    }
  }
};
</script>

<style scoped></style>
