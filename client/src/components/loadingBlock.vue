<template>
  <v-card>
    <!--v-if="this.$apollo.loading"-->
    <v-img>
      <v-progress-circular
        :size="100"
        :width="8"
        color="primary2"
        indeterminate
      >
        Loading...
      </v-progress-circular>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "LoadingBlock"
};
</script>

<style scoped></style>
