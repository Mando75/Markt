<template>
  <v-app>
    <Nav />
    <v-content>
      <div v-if="$apollo.loading">Loading...</div>
      <v-container fluid>
        <router-view> </router-view>
        <template>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-img
                  :src="require('@/assets/iStock_teacher-math-class.jpg')"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h2 class="display-2 mb-0 text-md-center">Welcome Back!</h2>
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
                        /><v-btn color="primary3" @click="mutate">Login</v-btn>
                        <p>{{ error }}</p>
                      </template>
                    </ApolloMutation>
                  </div>
                  <div>
                    <h3 class="headline mb-0">Don't have an account yet?</h3>
                    <br />
                    <router-link to="/create_account"
                      >Click Here To Get Started</router-link
                    >
                  </div>
                </v-card-text>
                <v-card-actions> </v-card-actions>
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
    handleLogin({ data }) {
      console.log(data);
      console.log(data.loginMutation);
    }
  }
};
</script>

<style scoped></style>
