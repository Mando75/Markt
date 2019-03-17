<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <div>
    <Nav />
    <v-container fluid>
      <v-layout align-space-between justify-start column fill-height>
        <v-flex align="left" xs12 sm6 offset-sm3>
          <v-card flat>
            <h1 class="display-2">
              Instructions for Experiment: {{ scenario.name }}
            </h1>
            <div class="display-1">{{ scenario.dscription }}</div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout align-space-between justify-start column fill-height>
        <v-flex
          v-for="value in scenario.instructions"
          :key="scenario.instructions.step"
        >
          <v-content class="headline"
            >{{ value.step }}. {{ value.header }}
            {{ instructs.step }}
            <br />
            <span>{{ value.bullets.text }}</span>
            <span class="text--black" v-for="(bull, i) in blts" :key="i">
              {{ bull.text }}
            </span>
          </v-content>
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
      scen: "",
      blts: [],
      instructs: {}
    };
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    scenario: {
      // gql query
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            name
            instructions {
              step
              header
              bullets {
                format
                text
              }
            }
          }
        }
      `,
      // Static parameters
      variables: {
        code: "APPLMRKT"
      },
      result({ data }) {
        instructs = data.scenario.instructions;
        this.blts = data.scenario.instructions.bullets;
      }
    }
  }
};
</script>
<style scoped></style>
