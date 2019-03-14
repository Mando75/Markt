<template>
  <v-app>
    <Nav />
    <v-content>
      <!--<div v-if="$apollo.loading"><loading-block /></div>-->
      <v-container fluid>
        <router-view> </router-view>
        <template>
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
                  <div>
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
                      <template slot-scope="{ mutate, loading, error }">
                        <v-text-field
                          label="First Name"
                          v-model="firstName"
                        ></v-text-field>
                        <v-text-field
                          label="Last Name"
                          v-model="lastName"
                        ></v-text-field>
                        <v-text-field
                          label="Email"
                          v-model="email"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          v-model="password"
                          type="password"
                        ></v-text-field>
                        <v-btn color="primary3" @click="mutate">Register</v-btn>
                        <p class="red" v-for="(msg, i) in warningMsg" :key="i">
                          {{ msg }}
                        </p>
                      </template>
                    </ApolloMutation>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Nav from "../Nav";
import gql from "graphql-tag";
// import LoadingBlock from "../loadingBlock";

export default {
  name: "Account",
  components: { Nav },
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
      console.log(this.$credentials);
      //the structure has response 'data' or 'errors'
      //see here for later: Destructuring assignment on mozilla dev site
      console.log(data);
      console.log(data.registerUserMutation);
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
