<template>
  <!--do we want instructions and setup on the same screen or different?-->
  <div color="secondary0">
    <LoadingBlock v-if="isLoading" />
    <v-layout v-else justify-center>
      <v-flex xs12 sm10>
        <!--the scenario boxes-->
        <v-card flat color="modernColor1">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                :key="card.title"
                v-bind="{ [`xs${card.flex}`]: true }"
              >
                <v-card dark tile hover flat>
                  <v-img :src="card.src" height="300px" aspect-ratio="2.75">
                    <v-container fill-height pa-2>
                      <v-layout fill-height row wrap>
                        <v-flex xs12 md12 align-start flexbox>
                          <v-card-text
                            class="display-2 font-weight-bold headingTheme-Dark"
                            v-text="card.title"
                          ></v-card-text>
                        </v-flex>
                        <v-flex align-self-end flex-end>
                          <v-card-actions>
                            <!--this is the popup dialog-->
                            <v-dialog v-model="dialog" width="500">
                              <template v-slot:activator="{ on }">
                                <v-flex>
                                  <v-btn
                                    depressed
                                    small
                                    color="primary4"
                                    dark
                                    v-on="on"
                                  >
                                    Details
                                  </v-btn>
                                </v-flex>
                              </template>

                              <v-card>
                                <v-card-title
                                  class="headline modernColor1"
                                  primary-title
                                >
                                  {{ scenario.name }}
                                </v-card-title>

                                <v-card-text>
                                  {{ scenario.description }}
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    color="primary3"
                                    depressed
                                    @click="dialog = false"
                                  >
                                    OK
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <!--end of popup-->
                            <v-flex>
                              <v-btn
                                depressed
                                small
                                dark
                                color="primary4"
                                @click="handleSelect"
                              >
                                Select
                              </v-btn>
                            </v-flex>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LoadingBlock from "../loadingBlock.vue";
import gql from "graphql-tag";

export default {
  name: "SessionCreation",
  components: { LoadingBlock },
  data() {
    return {
      isLoading: "",
      scenarios: "",
      selected: false,
      dialog: false,
      cards: [
        {
          title: "Apple Market",
          src: require("@/assets/marketPainting.jpg"),
          flex: 6,
          route: "/guide/home",
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
  methods: {
    handleSelect() {
      this.$router.push("/guide/home");
    }
  },
  apollo: {
    // Simple query that gets the user id
    scenario: {
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            id
            description
            name
          }
        }
      `,
      loadingKey: "isLoading",
      variables: {
        code: "APPLMRKT"
      },
      result({ data }) {
        this.$credentials.scenarioId = data.scenario.id;
        this.$credentials.sSelect = data.scenario.name;
        console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped>
.headingTheme-Dark {
  color: #f1f1f1;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
