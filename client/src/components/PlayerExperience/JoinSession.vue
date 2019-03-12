<template>
  <v-content>
    <Nav />
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-form v-model="valid">
              <v-flex xs6 md4>
                <v-text-field
                  v-model="playerName"
                  :rules="nameRules"
                  :counter="10"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md4>
                <v-text-field
                  v-model="joinCode"
                  :counter="10"
                  label="Join Code"
                  required
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Nav from "../Nav";

export default {
  name: "JoinSession",
  components: { Nav }
};
</script>

<style scoped></style>
