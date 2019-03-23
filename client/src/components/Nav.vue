<template>
  <div>
    <v-navigation-drawer v-model="drawer" app dark class="link--text">
      <v-list class="hidden-sm-and-down"></v-list>
      <v-list class="pt-5 pb-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon x-large>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{
              this.$credentials.displayName
                ? this.$credentials.displayName
                : null
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          dark
          active-class="primaryTheme"
          :class="item.path === $route.path ? 'primaryTheme' : ''"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!--TODO conditional drawer items-->
        <v-list-tile
          v-for="conds in conditionals"
          :key="conds.title"
          dark
          active-class="primaryTheme"
          :class="conds.path === $route.path ? 'primaryTheme' : ''"
          :to="conds.path"
        >
          <v-list-tile-action>
            <v-icon>{{ conds.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ conds.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="modernColor3" fixed clipped-left>
      <v-toolbar-side-icon
        v-if="this.$credentials.authenticated"
        @click="drawer = !drawer"
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
          class="font-weight-bold white--text hidden-sm-and-down"
          @click="$router.push('/login')"
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
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard", path: "/guide/home" },
        { title: "Select Experiment", icon: "poll", path: "/guide/scenarios" },
        {
          title: "Invite Participants",
          icon: "person_add",
          path: "/guide/joinCode"
        },
        {
          title: "Begin Simulation",
          icon: "monetization_on",
          path: "/guide/start"
        }
      ],
      conditionals: [
        { title: "Instructions", icon: "live_help", path: "" }
        // { title: "NextRound", icon: "question_answer", path: "" }
      ],
      drawer: true
    };
  }
};
</script>
<style scoped>
a:link {
  text-decoration: none;
}
.primaryTheme {
  background-color: #222222 !important;
  color: #609732 !important; /*primary3*/
  caret-color: #609732 !important;
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}
</style>
