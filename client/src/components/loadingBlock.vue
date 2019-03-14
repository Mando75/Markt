<template>
  <v-card>
    <v-img v-if="$apollo.loading">
      <v-progress-circular :size="70" :width="7" color="primary2" indeterminate
        >Loading...</v-progress-circular
      ></v-img
    ><v-img v-else
      ><v-progress-circular
        v-if="$apollo.queries.ping.loading"
        :size="100"
        :width="7"
        color="primary3"
        indeterminate
        >Pinging...</v-progress-circular
      ></v-img
    >
  </v-card>
</template>

<script>
export default {
  name: "loadingBlock"
};
</script>

<style scoped></style>
