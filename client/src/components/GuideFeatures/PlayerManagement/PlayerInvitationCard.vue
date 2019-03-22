<template>
  <v-card dark flat tile height="600">
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
        <template slot-scope="{ mutate, loading, errors }">
          <v-form v-model="validInput">
            <v-text-field
              v-model="email"
              color="primary0"
              :disabled="loading"
              label="Player Email"
              :rules="[
                textValidationRules.validEmail,
                textValidationRules.required
              ]"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              color="primary0"
              :disabled="loading"
              :rules="[textValidationRules.required]"
              label="Player First Name"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              color="primary0"
              :disabled="loading"
              label="Player Last Name"
              :rules="[textValidationRules.required]"
            >
            </v-text-field>
          </v-form>
          <v-card-actions>
            <v-flex xs12>
              <v-btn
                :disabled="!validInput || loading"
                :loading="loading"
                color="primary3"
                @click="mutate"
                >Invite</v-btn
              >
            </v-flex>
          </v-card-actions>
        </template>
      </ApolloMutation>
    </v-card-text>
    <v-snackbar v-model="playerAdded" bottom>
      {{ playerAddedMessage }}
      <v-btn color="primary3" flat @click="playerAdded = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import InputValidationMixin from "../../../mixins/InputValidationMixin";
import { createPlayerMutation } from "./playerManagementQueries.graphql";
export default {
  name: "PlayerInvitationCard",
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
      this.$emit("playerAdded");
    }
  }
};
</script>

<style scoped></style>