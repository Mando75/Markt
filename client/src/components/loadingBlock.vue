<template>
  <v-card>
    <v-img>
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary2"
        indeterminate
      ></v-progress-circular
    ></v-img>
    <v-card-title><div v-if="$apollo.loading">Loading...</div></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "loadingBlock"
};
</script>

<style scoped></style>
