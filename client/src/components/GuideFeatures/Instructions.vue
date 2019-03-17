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
import Nav from "../Nav";
import gql from "graphql-tag";
export default {
  name: "Instructions",
  components: { Nav },
  data() {
    return {
      guideId: "",
      fullName: ""
    };
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    ping: {
      // gql query
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            name
          }
        }
      `,
      // Static parameters
      variables: {
        code: "APPLMRKT"
      }
    }
  }
};
</script>
<style scoped></style>
