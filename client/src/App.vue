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
export default {
  name: "app",
  components: { MobileNav, Nav }
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
