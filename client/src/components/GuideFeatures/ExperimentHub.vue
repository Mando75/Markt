<template>
  <v-container fluid grid-list color="secondary0">
    <v-layout row wrap justify-start column fill-height>
      <v-flex md12 d-flex>
        <v-card flat>
          <v-img></v-img>
          <h1 class=" display-1">
            Welcome Guide
          </h1>
          <v-card-text>
            BLah BLahBLahBLahBLahBLahBLahBLahBLahBLahBLahBLahBLahBLahBLahBLah
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center fill-height>
      <v-flex d-flex xs4 sm4 align-bottom>
        <v-card class="ma-3" dark>
          <v-img></v-img>
          <v-card-title class="subheading justify-center"
            >Begin "{{ $credentials.sSelect }}"?
          </v-card-title>

          <v-btn class="justify-center" color="primary3" @click="mutateVars"
            >Begin</v-btn
          >
          <v-card-text>
            <span class="display-4 red">{{ warnings }}</span>
            <span class="display-4 green">{{ successes }}</span>

            <span class="display-4 green">{{ exId }}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ExperimentHub"
};
</script>

<style scoped></style>
