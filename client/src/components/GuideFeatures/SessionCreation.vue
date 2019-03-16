<template>
  <!--do we want instructions and setup on the same screen or different?-->
  <v-content color="secondary0">
    <Nav />
    <LoadingBlock v-if="this.$apollo.loading" />
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <!--the dialogBoxes-->
        <div class="text-xs-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="primary4" dark v-on="on">
                Click Me
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Apple Market
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

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
                    <v-btn depressed dark color="primary4">Details</v-btn>
                    <v-btn flat outline ripple color="primary4">Select</v-btn>
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
        {
          scenario(code: "APPLMRKT") {
            id
            description
          }
        }
      `,
      result({ data }) {
        this.$credentials.scenarioId = data.scenario.id;

        console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped></style>
