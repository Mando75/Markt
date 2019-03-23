<template>
  <v-container class="ma-auto pt-5">
    <!--<LoadingBlock v-if="this.$apollo.loading" />-->
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card dark flat height="600" elevation="4">
          <v-img
            :src="require('@/assets/mainStockStockimg.png')"
            aspect-ratio="2.75"
          />
          <v-card-title primary-title>
            <h1>Enter the Join Code</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-model="validInput">
              <v-flex xs12 md6 offset-md3>
                <v-text-field
                  v-model="joinCode"
                  label="Experiment Join Code"
                  :rules="[textValidationRules.required]"
                  required
                />
                <v-text-field
                  v-model="playerCode"
                  label="Your Player Code"
                  :rules="[textValidationRules.required]"
                  required
                />
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-flex xs12>
              <v-btn
                class="join-actions"
                :disabled="!validInput"
                color="primary3"
              >
                Join Experiment
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InputValidationMixin from "../../mixins/InputValidationMixin";

export default {
  name: "JoinExperiment",
  mixins: [InputValidationMixin],
  data() {
    return {
      joinCode: "",
      playerCode: "",
      validInput: false
    };
  }
};
</script>

<style scoped>
.join-actions {
  margin-top: 30px;
}
</style>
