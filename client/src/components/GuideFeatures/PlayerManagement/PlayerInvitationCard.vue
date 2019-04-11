<template>
  <v-card elevation="4" dark tile :height="height">
    <v-img
      :src="require('@/assets/lecture.151104.jpg')"
      aspect-ratio="4.75"
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
              color="primary"
              :disabled="loading"
              label="Player Email"
              :rules="[
                textValidationRules.validEmail,
                textValidationRules.required
              ]"
            />
            <v-text-field
              v-model="firstName"
              color="primary"
              :disabled="loading"
              :rules="[textValidationRules.required]"
              label="Player First Name"
            />
            <v-text-field
              v-model="lastName"
              color="primary"
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
                color="primary"
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
      <span>OR</span>
      <v-card-title>
        <h1 class="headline text-xs-center" style="width: 100%">
          Upload a CSV
        </h1>
      </v-card-title>
      <UploadButton
        v-if="!selectedFile"
        accept=".csv"
        title="CHOOSE FILE"
        :fileChangedCallback="fileChanged"
      >
        <v-icon slot="icon-left">
          add
        </v-icon>
      </UploadButton>
      <v-layout row v-else>
        <v-text-field v-model="selectedFile.name" disabled class="pr-0" />
        <v-btn icon flat :disabled="csvLoading" @click="clearFile">
          <v-icon>clear</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          :disabled="csvLoading"
          :loading="csvLoading"
          @click="uploadCSV"
          >Upload</v-btn
        >
      </v-layout>
    </v-card-text>
    <v-snackbar :color="snackBarColor" v-model="playerAdded" bottom>
      {{ playerAddedMessage }}
      <v-btn color="white" flat @click="playerAdded = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import UploadButton from "vuetify-upload-button";
import InputValidationMixin from "../../../mixins/InputValidationMixin";
import { createPlayerMutation } from "./playerManagementQueries.graphql";
import MutationErrorDisplay from "../../common/MutationErrorDisplay";
export default {
  name: "PlayerInvitationCard",
  components: { MutationErrorDisplay, UploadButton },
  mixins: [InputValidationMixin],
  props: {
    height: {
      type: String,
      default: "600"
    }
  },
  data() {
    return {
      createPlayerMutation,
      email: "",
      csvLoading: false,
      firstName: "",
      lastName: "",
      guideId: this.$credentials.guideId,
      playerAdded: false,
      playerAddedMessage: "",
      selectedFile: null,
      snackBarColor: "primary",
      validInput: false
    };
  },
  methods: {
    clearFile() {
      this.selectedFile = null;
    },
    handlePlayerCreated({ data }) {
      this.snackBarColor = "primary";
      this.playerAdded = true;
      this.playerAddedMessage = data.createPlayer.firstName + " was added.";
      this.$emit("playersAdded");
    },
    fileChanged(file) {
      this.selectedFile = file;
    },
    async uploadCSV() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.set("guideId", this.$credentials.guideId);
      try {
        const resp = await this.$axios.post("/players/invite", formData, {
          "Content-Type": "multipart/form-data"
        });
        this.playerAddedMessage = "Upload Successful. Players invited";
        this.snackBarColor = "primary";
        this.playerAdded = true;
        this.$emit("playersAdded");
      } catch (e) {
        this.playerAddedMessage =
          e.response.status === 422
            ? `Invalid file: ${e.response.data.msg}`
            : "There was a problem uploading the file. Please check the format and try again";
        this.snackBarColor = "error";
        this.playerAdded = true;
      }
      this.selectedFile = null;
    }
  }
};
</script>

<style scoped></style>
