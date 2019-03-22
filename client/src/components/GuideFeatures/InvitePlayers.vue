<template>
  <v-container fluid color="secondary0">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card dark flat>
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
            <v-form v-model="validInput">
              <v-text-field
                color="primary0"
                v-model="email"
                label="Player Email"
                :rules="[
                  textValidationRules.validEmail,
                  textValidationRules.required
                ]"
              ></v-text-field>
              <v-text-field
                color="primary0"
                v-model="firstName"
                :rules="[textValidationRules.required]"
                label="Player First Name"
              ></v-text-field>
              <v-text-field
                color="primary0"
                v-model="lastName"
                label="Player Last Name"
                :rules="[textValidationRules.required]"
              >
              </v-text-field>
            </v-form>

            <v-card-actions>
              <v-flex xs12>
                <ApolloMutation
                  :mutation="createPlayerMutation"
                  :variables="{ email, firstName, lastName, guideId }"
                  @done="handlePlayerCreated"
                >
                  <v-btn
                    slot-scope="{ mutate }"
                    :disabled="!validInput"
                    @click="mutate()"
                    color="primary3"
                    >Invite</v-btn
                  >
                </ApolloMutation>
              </v-flex>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import InputValidationMixin from "../../mixins/InputValidationMixin";
export default {
  name: "InvitePlayers",
  mixins: [InputValidationMixin],
  data() {
    return {
      createPlayerMutation: gql`
        mutation createPlayerMutation(
          $guideId: ID!
          $groupId: ID
          $email: String!
          $firstName: String
          $lastName: String
        ) {
          createPlayer(
            playerParams: {
              guideId: $guideId
              groupId: $groupId
              email: $email
              firstName: $firstName
              lastName: $lastName
            }
          ) {
            firstName
            lastName
            email
            group {
              name
            }
            playerCode
          }
        }
      `,
      email: "",
      firstName: "",
      lastName: "",
      guideId: this.$credentials.guideId,
      validInput: false
    };
  },
  methods: {
    handlePlayerCreated({ data }) {
      console.log(data);
    }
  }
};
</script>

<style scoped></style>
