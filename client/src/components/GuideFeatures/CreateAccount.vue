<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card dark flat>
          <v-img
            :src="require('@/assets/Bulls-Bears.jpg')"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="display-2 mb-0 text-md-right">
                Create Your Account
              </h2>
            </div>
          </v-card-title>
          <v-card-text>
            <ApolloMutation
              :mutation="registerUserMutation"
              :variables="{
                email,
                firstName,
                password,
                lastName
              }"
              @done="handleRegister"
            >
              <template slot-scope="{ mutate }">
                <v-text-field
                  v-model="firstName"
                  color="primary"
                  label="First Name"
                />
                <v-text-field
                  v-model="lastName"
                  color="primary"
                  label="Last Name"
                />
                <v-text-field v-model="email" color="primary" label="Email" />
                <v-text-field
                  v-model="password"
                  color="primary"
                  label="Password"
                  type="password"
                />
                <v-btn color="primary" @click="mutate">Register</v-btn>
                <v-alert
                  v-for="(msg, i) in warningMsg"
                  :key="`warningMsg${i}`"
                  color="warning"
                  :value="true"
                  dismissible
                >
                  {{ msg.message }}
                </v-alert>
              </template>
            </ApolloMutation>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Account",
  data() {
    return {
      email: "",
      firstName: "",
      password: "",
      lastName: "",
      registerUserMutation: gql`
        mutation registerUser(
          $email: String!
          $firstName: String!
          $password: String!
          $lastName: String!
        ) {
          registerUser(
            user: {
              email: $email
              firstName: $firstName
              password: $password
              lastName: $lastName
            }
          ) {
            path
          }
        }
      `,
      warningMsg: []
    };
  },
  methods: {
    handleRegister({ data }) {
      //the structure has response 'data' or 'errors'
      //see here for later: Destructuring assignment on mozilla dev site
      if (!data.registerUser) {
        this.$router.push("/login");
      } else {
        this.warningMsg = data.login.map(m => m);
        //  this does a deep copy of the array
      }
    }
  }
};
</script>

<style scoped></style>
