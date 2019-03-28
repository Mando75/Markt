<template>
  <v-card elevation="4" dark tile height="600">
    <v-img
      :src="require('@/assets/lecture.151104.jpg')"
      aspect-ratio="2.75"
    ></v-img>
    <v-card-title primary-title>
      <h1 class="headline text-xs-center" style="width: 100%;">
        Invite a Player
      </h1>
    </v-card-title>
    <v-card-text>
      <ApolloMutation
        :mutation="createPlayerMutation"
        :variables="{ email, firstName, lastName, guideId }"
        @done="handlePlayerCreated"
      >
        <template slot-scope="{ mutate, loading, error }">
          <v-form v-model="validInput">
            <v-text-field
              v-model="email"
              color="primary lighten-1"
              :disabled="loading"
              label="Player Email"
              :rules="[
                textValidationRules.validEmail,
                textValidationRules.required
              ]"
            />
            <v-text-field
              v-model="firstName"
              color="primary lighten-1"
              :disabled="loading"
              :rules="[textValidationRules.required]"
              label="Player First Name"
            />
            <v-text-field
              v-model="lastName"
              color="primary lighten-1"
              :disabled="loading"
              label="Player Last Name"
              :rules="[textValidationRules.required]"
            />
          </v-form>
          <v-card-actions>
            <v-flex xs12>
              <v-btn
                :disabled="!validInput || loading"
                :loading="loading"
                color="primary darken-4"
                @click="mutate"
                >Invite</v-btn
              >
            </v-flex>
          </v-card-actions>
          <v-card-text v-if="error">
            <MutationErrorDisplay :error="error" />
          </v-card-text>
        </template>
      </ApolloMutation>
    </v-card-text>
    <v-snackbar v-model="playerAdded" bottom>
      {{ playerAddedMessage }}
      <v-btn color="primary darken-4" flat @click="playerAdded = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import InputValidationMixin from "../../../mixins/InputValidationMixin";
import { createPlayerMutation } from "./playerManagementQueries.graphql";
import MutationErrorDisplay from "../../common/MutationErrorDisplay";
export default {
  name: "PlayerInvitationCard",
  components: { MutationErrorDisplay },
  mixins: [InputValidationMixin],
  data() {
    return {
      createPlayerMutation,
      email: "",
      firstName: "",
      lastName: "",
      guideId: this.$credentials.guideId,
      playerAdded: false,
      playerAddedMessage: "",
      validInput: false
    };
  },
  methods: {
    handlePlayerCreated({ data }) {
      this.playerAdded = true;
      this.playerAddedMessage = data.createPlayer.firstName + " was added.";
      this.$emit("playerAdded", data.createPlayer);
    }
  }
};
</script>

<style scoped></style>
