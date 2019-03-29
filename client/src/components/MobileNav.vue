<template>
  <v-bottom-nav
    color="mBlack "
    :active.sync="bottomNav"
    :value="true"
    fixed
    app
    class="hidden-md-and-up"
  >
    <v-btn color="primary" flat value="recent">
      <span>Join</span>
      <v-icon>add_circle</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="favorites">
      <span>Buy/Sell</span>
      <v-icon>euro_symbol</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="nearby">
      <span>Instructions</span>
      <v-icon>live_help</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: "MobileNav",
  data() {
    return {
      bottomNav: "recent"
    };
  }
};
</script>

<style scoped></style>
