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
            <br />
            <v-divider></v-divider>

            <div class="font-weight-thin">{{ scenario.description }}</div>
          </v-card>
        </v-flex>
      </v-layout>
      <!--Each Instruction-->
      <v-layout align-space-between justify-start column fill-height>
        <v-flex
          v-for="value in scenario.instructions"
          :key="scenario.instructions.step"
        >
          <v-content class="text-md-left text-sm-justify font-weight-regular"
            ><v-list-tile class="headline "
              >{{ value.step }}) {{ value.header }}</v-list-tile
            >
            <v-layout align="left">
              <v-flex>
                <ul>
                  <li v-for="(bullet, index) in value.bullets" :key="index">
                    <i v-if="bullet.format == 'ITALIC'">
                      {{ bullet.text }}<br
                    /></i>
                    <b v-else v-text="bullet.text"><br /></b>
                  </li>
                </ul>
              </v-flex>
            </v-layout>
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
      // instructs: {}
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
            description
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
      result({ data }) {}
    }
  }
};
</script>
<style scoped></style>
