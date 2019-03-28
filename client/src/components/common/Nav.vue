<template>
  <div>
    <v-navigation-drawer
      v-if="$credentials.isUser"
      v-model="drawer"
      app
      dark
      class="link--text pa-0"
    >
      <v-layout column fill-height>
        <v-list class="hidden-sm-and-down"></v-list>
        <v-list class="pt-5 pb-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon x-large>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{
                $credentials.displayName
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
        </v-list>
        <v-spacer></v-spacer>
        <v-list>
          <ApolloMutation :mutation="logoutMutation" @done="handleLogout">
            <v-list-tile
              slot-scope="{ mutate }"
              dark
              active-class="primaryTheme"
              @click="mutate"
            >
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </ApolloMutation>
        </v-list>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar app color="mDarkGrey " fixed clipped-left>
      <v-toolbar-side-icon
        v-if="$credentials.isUser"
        @click="drawer = !drawer"
      />
      <router-link to="/">
        <v-toolbar-title class="display-2 white--text font-weight-bold ">
          Markt
        </v-toolbar-title>
      </router-link>

      <v-spacer />
      <!--The right side buttons-->
      <v-toolbar-items v-if="!$credentials.authenticated">
        <!--button 1-->
        <v-btn
          depressed
          dark
          class="font-weight-bold white--text hidden-sm-and-down"
          @click="$router.push('/login')"
        >
          Log In <span class="headline">/</span> Sign Up
        </v-btn>
        <!--button 2-->
        <v-btn
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
import gql from "graphql-tag";
export default {
  name: "Nav",
  data() {
    return {
      credentials: this.$credentials,
      items: [
        { title: "Home", icon: "dashboard", path: "/guide/home" },
        { title: "Select Experiment", icon: "poll", path: "/guide/scenarios" },
        {
          title: "Invite Players",
          icon: "person_add",
          path: "/guide/players"
        },
        {
          title: "Begin Simulation",
          icon: "monetization_on",
          path: "/guide/start"
        }
      ],
      drawer: true,
      logoutMutation: gql`
        mutation {
          logout
        }
      `
    };
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
      for (let key in this.$credentials) {
        this.$credentials[key] = null;
      }
      this.drawer = false;
    }
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

.flex-drawer {
  display: flex;
  flex-direction: column;
}
</style>
