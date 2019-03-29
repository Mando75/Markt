<template>
  <div id="app">
    <v-app>
      <Nav />
      <v-content v-if="!loading">
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Nav from "./components/common/Nav";
import { me } from "./meQuery.graphql";

export default {
  name: "App",
  components: { Nav },
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
        if (window.location.pathname === "/login") return true;
        const authed = JSON.parse(localStorage.getItem("authenticated"));
        const isUser = JSON.parse(localStorage.getItem("isUser"));
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
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 3s infinite;
  -moz-animation: flickerAnimation 3s infinite;
  -o-animation: flickerAnimation 3s infinite;
  animation: flickerAnimation 3s infinite;
}
</style>
<style src="vuetify/dist/vuetify.min.css"></style>
<style src="v-currency-field/dist/index.css"></style>
