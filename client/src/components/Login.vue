<template>
  <div>
    <!--<div v-if="$apollo.loading"><loading-block /></div>-->
    <v-container fluid>
      <template>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card dark>
              <v-card flat>
                <v-img
                  :src="require('@/assets/iStock_teacher-math-class.jpg')"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <v-flex xs12 sm12 md12>
                    <h1
                      class=" mb-0 xs1 text-md-center text-lg-center text-xs-center"
                    >
                      Welcome Back!
                    </h1>
                  </v-flex>
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
                        <p class="red" v-for="msg in warningMsg">
                          {{ msg.message }}
                        </p>
                      </template>
                    </ApolloMutation>
                  </div>
                  <br />
                  <div>
                    <br />
                    <v-btn v-on:click="$router.push('/register')"
                      >sign Up here</v-btn
                    >
                    <!--<v-btn v-on:click="signUp = !signUp"></v-btn>-->
                  </div>
                </v-card-text>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </div>
</template>

<script>
import Nav from "./Nav";
import gql from "graphql-tag";
import CreateAccount from "./GuideFeatures/CreateAccount";
import LoadingBlock from "./loadingBlock";

export default {
  name: "Login",
  components: { LoadingBlock, Nav, CreateAccount },
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
      `,
      warningMsg: [],
      signUp: false
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
