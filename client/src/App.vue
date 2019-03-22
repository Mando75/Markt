<template>
  <div id="app">
    <v-app
      ><Nav /><MobileNav /><v-content><router-view /></v-content>
    </v-app>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import MobileNav from "./components/PlayerExperience/MobileNav";
import gql from "graphql-tag";
export default {
  name: "App",
  components: { MobileNav, Nav },
  apollo: {
    me: {
      query: gql`
        {
          me {
            id
            fullName
            guide {
              id
            }
          }
        }
      `,
      result({ data, errors }) {
        if (!errors) {
          this.$credentials.userId = data.me.id;
          this.$credentials.guideId = data.me.guide.id;
          this.$credentials.displayName = data.me.fullName;
          this.$credentials.authenticated = true;
          this.$credentials.isUser = true;
        }
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
