<template>
  <v-content>
    <Nav />
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-media></v-card-media>
            <v-card-text></v-card-text>
            <v-input></v-input>
            <v-btn></v-btn>
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
