<template>
  <!--do we want instructions and setup on the same screen or different?-->
  <v-content color="secondary0">
    <Nav />
    <LoadingBlock v-if="this.$apollo.loading" />
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <!--the dialogBoxes-->

        <v-card flat>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                :key="card.title"
                v-bind="{ [`xs${card.flex}`]: true }"
              >
                <v-card tile hover flat>
                  <v-img :src="card.src" height="300px" aspect-ratio="2.75">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <v-card-text
                            class="black--text display-2 font-weight-bold"
                            v-text="card.title"
                          ></v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn depressed color="primary4" dark v-on="on">
                          Details
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title
                        >
                          Apple Market
                        </v-card-title>

                        <v-card-text>
                          {{ scenario.description }}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="dialog = false">
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      flat
                      outline
                      ripple
                      color="primary4"
                      v-on:click="$router.push('/guide/instructions')"
                      >Select</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import Nav from "../Nav";
import LoadingBlock from "../loadingBlock.vue";
import gql from "graphql-tag";
export default {
  name: "SessionCreation",
  components: { LoadingBlock, Nav },
  data() {
    return {
      scenarios: "",
      dialog: false,
      cards: [
        {
          title: "Apple Market",
          src: require("@/assets/marketPainting.jpg"),
          flex: 6,
          route: "/guide/instructions",
          scenarioCode: ""
        },
        {
          title: "Other Scenario",
          src: require("@/assets/Economics.jpg"),
          flex: 6,
          route: "",
          scenarioCode: ""
        },
        {
          title: "Lorem Ipsum",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
          route: "",
          scenarioCode: ""
        },
        {
          title: "Moriatus Potus",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
          route: "",
          scenarioCode: ""
        }
      ]
    };
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  apollo: {
    // Simple query that gets the user id
    scenario: {
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            id
            description
          }
        }
      `,
      variables: {
        code: "APPLMRKT"
      },
      result({ data }) {
        this.$credentials.scenarioId = data.scenario.id;

        console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped></style>
