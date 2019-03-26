<template>
  <div id="app">
    <v-app>
      <Nav />
      <MobileNav v-if="$vuetify.breakpoint.mdAndDown" />
      <v-content v-if="!loading">
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import { me } from "./meQuery.graphql";
export default {
  name: "App",
  components: { MobileNav, Nav },
  data() {
    return {
      loading: 0
    };
  },
  computed: {
    credentials() {
      return this.$credentials;
    }
  },
  apollo: {
    me: {
      query: me,
      result({ data, error }) {
        if (!error) {
          this.$credentials.userId = data.me.id;
          this.$credentials.guideId = data.me.guide.id;
          this.$credentials.displayName = data.me.fullName;
          this.$credentials.authenticated = true;
          this.$credentials.isUser = true;
          this.$credentials.isPlayer = false;
        }
      },
      loadingKey: "loading",
      skip: () => {
        const authed = JSON.parse(localStorage.getItem("authenticated"));
        const isUser = JSON.parse(localStorage.getItem("isUser"));
        console.log(!(authed && isUser));
        return !(authed && isUser);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
<style src="vuetify/dist/vuetify.min.css"></style>
<style src="v-currency-field/dist/index.css"></style>
