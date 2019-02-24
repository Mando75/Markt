<template>
  <v-content>
    <v-navigation-drawer
      app
      floating
      clipped
      dark
      mini-variant
      temporary
      v-model="drawer"
    >
      <!-- add drawer items here:-->
      <v-list prominent
        ><v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark fixed clipped-left scroll-off-screen>
      <v-toolbar-side-icon v-on:click="drawer = true"></v-toolbar-side-icon>
      <v-toolbar-title>Markt</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat> Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-content>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      drawer: false
    };
  }
};
</script>
