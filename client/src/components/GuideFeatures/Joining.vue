<template>
  <v-layout justify-start column fill-height>
    <v-flex xs12 d-flex>
      <h3 class="display-3">
        Join Code: <strong>{{ experiment.joinCode }}</strong>
      </h3>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Joining",
  props: {
    experiment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
