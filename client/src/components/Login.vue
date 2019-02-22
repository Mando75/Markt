<template>
  <v-app>
    <Nav />
    <v-content>
      <v-container fluid>
        <router-view> </router-view>
        <template>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>
                    <ApolloMutation
                      :mutation="loginMutation"
                      :variables="{ userEmail, userPassword }"
                      @done="handleLogin"
                    >
                      <template slot-scope="{ mutate, loading, error }">
                        <v-text-field label="User Email" v-model="userEmail" />
                        <v-text-field
                          label="Password"
                          v-model="userPassword"
                          type="password"
                        /><v-btn @click="mutate">Login</v-btn>
                        <p>{{ error }}</p>
                      </template>
                    </ApolloMutation>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </v-content>
    <v-footer app>_________________</v-footer>
  </v-app>
</template>

<script>
import Nav from "./Nav";
import gql from "graphql-tag";

export default {
  name: "Login",
  components: { Nav },
  data() {
    return {
      userEmail: "",
      userPassword: "",
      loginMutation: gql`
        mutation login($userEmail: String!, $userPassword: String!) {
          login(user: { email: $userEmail, password: $userPassword }) {
            path
            message
          }
        }
      `
    };
  },
  methods: {
    handleLogin({data}) {
      console.log(data);
      console.log(data.login);
    }
  }
};
</script>

<style scoped></style>
