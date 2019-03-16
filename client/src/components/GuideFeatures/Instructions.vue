<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <div>
    <Nav />
    <v-container>
      <v-layout align-space-between justify-start column fill-height>
        <v-flex>
          <h1 class="headline ">
            <!--Instructions for Experiment: {{ scenario.name }}-->
          </h1>
        </v-flex>
      </v-layout>
      <v-layout align-space-between justify-start column fill-height>
        <v-flex>
          <v-content> dsfsdf</v-content>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Nav from "../Nav";

export default {
  name: "Instructions",
  components: { Nav },
  data() {
    return {};
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  apollo: {
    //grab the instructions
    scenario: {
      query: gql``,
      result({ data }) {}
    }
  }
};
</script>

<style scoped></style>
