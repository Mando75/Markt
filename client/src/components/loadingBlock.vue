<template>
  <v-card>
    <v-img>
      <v-progress-circular
        v-if="$apollo.loading"
        :size="70"
        :width="7"
        color="primary2"
        indeterminate
        >Loading...</v-progress-circular
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
