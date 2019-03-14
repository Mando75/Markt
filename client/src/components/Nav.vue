<template>
  <v-content>
    <v-navigation-drawer app dark class="link--text" v-model="drawer">
      <v-list class="hidden-sm-and-down"> <br /><br /><br /></v-list>
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ users.displayName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          dark
          class="blue-grey.darken-4"
          v-for="item in items"
          :key="item.title"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="modernColor3" fixed clipped-left>
      <v-toolbar-side-icon
        v-if="this.$credentials.authenticated"
        v-on:click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="display-2 white--text font-weight-bold "
          >Markt</v-toolbar-title
        >
      </router-link>

      <v-spacer />
      <!--The right side buttons-->
      <v-toolbar-items>
        <!--button 1-->
        <v-btn
          v-if="!this.$credentials.authenticated"
          depressed
          dark
          @click="$router.push('/login')"
          class="font-weight-bold white--text hidden-md-and-down"
        >
          Log In <span class="headline">/</span> Sign Up
        </v-btn>
        <!--button 2-->
        <v-btn
          v-if="this.$credentials.isUser"
          depressed
          dark
          class="font-weight-bold white--text"
          @click="$router.push('/joinCode')"
        >
          Join Code
        </v-btn>
        <v-btn
          v-else
          depressed
          dark
          class="font-weight-bold white--text"
          @click="$router.push('/join')"
        >
          Join Simulation
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--208-496-1154 schmidt-->
  </v-content>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      users: { displayName: "Bryan" },
      items: [
        { title: "Home", icon: "dashboard", path: "/guide/home" },
        { title: "Select Experiment", icon: "poll", path: "/guide/scenarios" },
        {
          title: "Invite Participants",
          icon: "person_add",
          path: "/guide/joinCode"
        },
        { title: "Begin Simulation", icon: "monetization_on", path: "/play" }
        // { title: "UserResults?", icon: "person" },
        // { title: "About", icon: "question_answer", path: "" },
        // { title: "Settings", icon: "settings", path: "" }
      ],
      drawer: true
    };
  }
};
</script>

<style>
a:link {
  text-decoration: none;
}
.primary--text {
  /*background-color: #222222 !important;*/
  color: #609732 !important; /*primary3*/
  caret-color: #609732 !important;
}

a:visited {
  text-decoration: none;
}
</style>
