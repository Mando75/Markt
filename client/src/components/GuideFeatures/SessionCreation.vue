<template>
  <!--do we want instructions and setup on the same screen or different?-->
  <v-content color="secondary0">
    <Nav />
    <LoadingBlock v-if="this.$apollo.loading" />
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-card @click="$router.push('/guide/instructions')">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                :key="card.title"
                v-bind="{ [`xs${card.flex}`]: true }"
              >
                <v-card>
                  <v-img :src="card.src" height="300px" aspect-ratio="2.75">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span
                            class="headline white--text black"
                            v-text="card.title"
                          ></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions> </v-card-actions>
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
  data: () => ({
    code: "",
    cards: [
      {
        title: "TEST APPLE MARKET",
        src: require("@/assets/marketPainting.jpg"),
        flex: 6,
        route: "/guide/instructions",
        scenarioCode: ""
      },
      {
        title: "Other Scenario",
        src: "",
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
  }),
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
          }
        }
      `,
      result({ data }) {
        this.$credentials.scenarioId = data.scenario.id;
        // this.$credentials.guideId = data.me.guide ? data.me.guide.id : null;

        console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped></style>
