<template>
  <v-card>
    <!--v-if="this.$apollo.loading"-->
    <v-img>
      <v-progress-circular :size="70" :width="7" color="primary2" indeterminate>
        Loading...
      </v-progress-circular>
    </v-img>
  </v-card>
</template>

<script>
import VueApollo from "vue-apollo";
export default {
  name: "loadingBlock"
};
</script>

<style scoped></style>
