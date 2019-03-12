<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <div>
    <Nav />
    <v-toolbar-title></v-toolbar-title>
    <v-container>
      <div>
        <h1>Experiment: {{}}</h1>
        <p><em></em></p>
      </div>
      <v-item-group> </v-item-group>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Nav from "./Nav";

export default {
  name: "Instructions",
  components: { Nav },
  data() {
    return {};
  },
  apollo: {
    me: {
      query: gql`
        {
          scenario(id: 1) {
            instructions {
              header
            }
          }
        }
      `,
      result({ data }) {
        this.$credentials.userId = data.me.id;
        console.log(this.$credentials);
      }
    }
  },
  methods: {
    handleLogin({ data }) {
      console.log(data);
      console.log(data.login);
    }
  }
};
</script>

<style scoped></style>
