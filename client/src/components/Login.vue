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
                    <h2 class="display-2 mb-0 text-md-right">Welcome Back!</h2>
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
                        <v-text-field
                          label="User Email"
                          v-model="userEmail"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          v-model="userPassword"
                          type="password"
                        ></v-text-field>
                        <v-btn color="primary3" @click="mutate">Login</v-btn>
                        <p class="red" v-for="(msg, i) in warningMsg" :key="i">
                          {{ msg }}
                        </p>
                      </template>
                    </ApolloMutation>
                  </div>
                  <br />
                  <div>
                    <h3 class="title mb-0">Don't have an account yet?</h3>
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
      // login: '',
      loginMutation: gql`
        mutation login($userEmail: String!, $userPassword: String!) {
          login(user: { email: $userEmail, password: $userPassword }) {
            path
            message
          }
        }
      `,
      warningMsg: []
    };
  },
  methods: {
    handleLogin({ data }) {
      console.log(this.$credentials);
      //the structure has response 'data' or 'errors'
      //see here for later: Destructuring assignment on mozilla dev site
      console.log(data);
      console.log(data.loginMutation);
      if (!data.login) {
        this.$credentials.authenticated = true;
        this.$credentials.isUser = true;
        this.$router.push("/guide/home");
      } else {
        this.warningMsg = data.login.map(m => m);
        //  this does a deep copy of the array
      }
    }
  }
};
</script>

<style scoped></style>
