<template>
  <v-content>
    <v-navigation-drawer app dark v-model="drawer">
      <v-list> <br /><br /><br /></v-list>
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ users.fullDisplayName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="modernColor3" fixed clipped-left scroll-off-screen>
      <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="display-1 white--text font-weight-bold "
        >Markt</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!--The right side buttons-->
      <v-toolbar-items class="hidden-md-and-down">
        <!--button 1-->
        <v-btn flat
          ><router-link class="font-weight-medium mNavLinks" to="/login"
            >Sign In</router-link
          ></v-btn
        >
        <!--button 2-->
        <v-btn color="modernColor2"
          ><span class="mNavLinks">Join Simulation</span></v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
  </v-content>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      users: [
        {
          displayName: "Bryan Müller"
        }
      ],
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "Select Experiment", icon: "poll" },
        { title: "Invite Participants", icon: "person_add" },
        { title: "Begin Simulation", icon: "monetization_on" },
        // { title: "UserResults?", icon: "person" },
        { title: "About", icon: "question_answer" },
        { title: "Settings", icon: "settings" }
      ],
      drawer: false
    };
  }
};
</script>
