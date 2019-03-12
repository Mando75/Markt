<template>
  <v-content>
    <v-navigation-drawer app dark v-model="drawer" v-if="function() {}">
      <v-list> <br /><br /><br /></v-list>
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
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
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
      <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="display-1 white--text font-weight-bold "
          >Markt</v-toolbar-title
        >
      </router-link>

      <v-spacer></v-spacer>
      <!--The right side buttons-->
      <v-toolbar-items class="hidden-md-and-down">
        <!--button 1-->
        <v-btn
          dark
          @click="$router.push('/login')"
          class="font-weight-bold white--text "
        >
          Sign In
        </v-btn>
        <!--button 2-->
        <v-btn
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
          path: "/guide/setup"
        },
        { title: "Begin Simulation", icon: "monetization_on", path: "/play" },
        // { title: "UserResults?", icon: "person" },
        { title: "About", icon: "question_answer", path: "" },
        { title: "Settings", icon: "settings", path: "" }
      ],
      drawer: false
    };
  }
};
</script>

<style scoped>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}
</style>
