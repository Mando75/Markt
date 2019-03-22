<template>
  <div>
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
                      <template slot-scope="{ mutate }">
                        <v-text-field
                          color="primary0"
                          v-model="userEmail"
                          label="User Email"
                        ></v-text-field>
                        <v-text-field
                          v-model="userPassword"
                          label="Password"
                          type="password"
                          color="primary0"
                        ></v-text-field>
                        <v-btn color="primary3" @click="mutate">Login</v-btn>
                        <p
                          v-for="(msg, i) in warningMsg"
                          :key="`warningMsg${i}`"
                          class="red"
                        >
                          {{ msg.message }}
                        </p>
                      </template>
                    </ApolloMutation>
                  </div>
                  <br />
                  <div>
                    <br />
                    <v-btn @click="$router.push('/register')"
                      >Sign Up Here</v-btn
                    >
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
import gql from "graphql-tag";

export default {
  name: "Login",
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
