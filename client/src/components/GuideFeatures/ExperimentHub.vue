<template>
  <v-container fluid grid-list color="secondary0">
    <v-layout row wrap justify-start column fill-height>
      <v-flex md12 d-flex>
        <v-card flat>
          <v-img></v-img>
          <h1 class=" display-1">
            Welcome Guide
          </h1>
          <v-card-text>
            This will have the controls for the guide. "Guide HUB"
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <InstructionsFAB :scenario="scenario" />
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import InstructionsFAB from "../InstructionsFAB";

export default {
  name: "ExperimentHub",
  components: { InstructionsFAB },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    scenario: {
      // gql query
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            id
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
      loadingKey: "isLoading"
    }
  }
};
</script>

<style scoped></style>
