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
                />

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
                  <v-flex xs12>
                    <ApolloMutation
                      :mutation="loginMutation"
                      :variables="{ userEmail, userPassword }"
                      @done="handleLogin"
                    >
                      <template slot-scope="{ mutate }">
                        <v-text-field
                          v-model="userEmail"
                          color="primary0"
                          label="User Email"
                          :rules="[
                            textValidationRules.required,
                            textValidationRules.validEmail
                          ]"
                        />
                        <v-text-field
                          v-model="userPassword"
                          label="Password"
                          type="password"
                          color="primary0"
                        />
                        <v-btn color="primary3" @click="mutate">Login</v-btn>
                        <br />
                        or
                        <br />
                        <v-btn color="red" href="/auth/google">
                          Sign in with Google
                        </v-btn>
                      </template>
                    </ApolloMutation>
                    <v-alert
                      v-for="(msg, i) in warningMsg"
                      :key="`warningMsg${i}`"
                      :value="true"
                      color="warning"
                      dismissible
                    >
                      {{ msg.message }}
                    </v-alert>
                  </v-flex>
                  <v-flex my-4>
                    <v-btn @click="$router.push('/register')">
                      Sign Up Here
                    </v-btn>
                    or
                    <v-btn @click="$router.push('/join')">
                      Join Experiment
                    </v-btn>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import InputValidationMixin from "../mixins/InputValidationMixin";

export default {
  name: "Login",
  mixins: [InputValidationMixin],
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
  mounted() {
    if (this.$credentials.authenticated && this.$credentials.isUser) {
      this.$router.push("/guide/home");
    } else if (this.$credentials.authenticated && this.$credentials.isPlayer) {
      this.$router.push("/player/play");
    }
    if (this.$route.query.sessionExpired === "1") {
      this.warningMsg.push({
        path: "Session",
        message: "Your session has expired"
      });
    }
  },
  methods: {
    handleLogin({ data }) {
      //the structure has response 'data' or 'errors'
      //see here for later: Destructuring assignment on mozilla dev site
      if (!data.login) {
        this.$credentials.authenticated = true;
        this.$credentials.isUser = true;
        this.$credentials.isPlayer = false;
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
