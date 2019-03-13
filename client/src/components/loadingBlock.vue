<template>
  <v-card>
    <v-img> </v-img>
    <v-card-title><div v-if="$apollo.loading">Loading...</div></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "loadingBlock"
};
</script>

<style scoped></style>
