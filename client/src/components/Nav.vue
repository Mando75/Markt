<template>
  <v-content>
    <v-navigation-drawer app clipped dark v-model="drawer">
      <!-- add drawer items here:-->
      <v-list prominent
        ><v-list-tile-action>
          <v-icon>dashboard</v-icon>
          <!--<v-icon> fa-user-circle-o</v-icon>-->
        </v-list-tile-action>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="modernColor3" fixed clipped-left scroll-off-screen>
      <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat></v-btn>
        <v-btn flat>SIGN IN</v-btn>
        <v-btn color="modernColor2">Join</v-btn>
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
