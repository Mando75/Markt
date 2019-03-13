<template>
  <v-card flat>
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
        <!--<ApolloMutation-->
        <!--:mutation="loginMutation"-->
        <!--:variables="{ userEmail, userPassword }"-->
        <!--@done="handleLogin"-->
        <!--&gt;-->
        <!--<template slot-scope="{ mutate, loading, error }">-->
        <!--<v-text-field label="User Email" v-model="userEmail"></v-text-field>-->
        <!--<v-text-field-->
        <!--label="Password"-->
        <!--v-model="userPassword"-->
        <!--type="password"-->
        <!--&gt;</v-text-field>-->
        <!--<v-btn color="primary3" @click="mutate">Login</v-btn>-->
        <!--<p class="red" v-for="(msg, i) in warningMsg" :key="i">-->
        <!--{{ msg }}-->
        <!--</p>-->
        <!--</template>-->
        <!--</ApolloMutation>-->
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Nav from "../Nav";
export default {
  name: "Account",
  components: { Nav }
};
</script>

<style scoped></style>
