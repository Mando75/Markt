<template>
  <v-card flat color="#fafafa" class="pa-5 ma-5">
    <!--v-if="this.$apollo.loading"-->
    <v-img>
      <v-progress-circular :size="100" :width="8" color="primary" indeterminate>
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
