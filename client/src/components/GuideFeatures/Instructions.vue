<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <div>
    <LoadingBlock v-if="isLoading" />
    <v-container v-else fluid grid-list class="mt-7 pa-3">
      <!--title Card-->
      <v-layout justify-start column fill-height>
        <v-flex xs12>
          <v-card flat fill-height>
            <h1 class="display-2">Instructions for {{ scenario.name }}</h1>
            <br />
          </v-card>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>

      <!--description card-->
      <v-layout cloumn justify-start>
        <v-flex d-flex xs12>
          <v-card flat>
            <v-card-text class="font-weight-thin  block-comment subheading ">
              <v-flex sm6 offset-xs3>
                <div class="headline">Description</div>
                {{ scenario.description }}
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!--Important info Cards-->
      <!--tile 1-->
      <v-layout wrap row>
        <v-flex xs4 order-lg2 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <b>"BOLD"</b> text denote actions to perform.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 2-->
        <v-flex xs4 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              <span>
                Items in <i>"ITALIC"</i> represent words to be said.
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <!--tile 3-->
        <v-flex xs4 order-lg2 d-flex>
          <v-card dark tile flat color="primary3">
            <v-card-text class="font-weight-medium">
              Session Count: {{ appleSesh }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <!--Each Instruction-->
      <v-layout align-space-between justify-start column>
        <v-flex
          d-flex
          v-for="value in scenario.instructions"
          :key="scenario.instructions.step"
        >
          <div class="text-md-left text-sm-justify font-weight-regular">
            <v-list-tile class="mt-0 pt-0"
              >{{ value.step }}) {{ value.header }}</v-list-tile
            >
            <ul class="justify-space-between">
              <li
                v-for="(bullet, index) in value.bullets"
                :key="index"
                class="mx-5"
              >
                <i v-if="bullet.format == 'ITALIC'">
                  <p v-html="bullet.text"></p>
                  <br />
                </i>
                <b v-else v-html="bullet.text"><br /></b>
              </li>
            </ul>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Nav from "../Nav";
import gql from "graphql-tag";
import LoadingBlock from "../loadingBlock";
export default {
  name: "Instructions",
  components: { LoadingBlock, Nav },
  data() {
    return {
      // instructs: {}
      appleSesh: 2,
      isLoading: 0
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
      loadingKey: "isLoading",
      result({ data }) {}
    }
  }
};
</script>
<style scoped></style>
