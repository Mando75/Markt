<template>
  <!-- TODO: Clean this up-->
  <v-container>
    <LoadingBlock v-if="isLoading && !scenario" />
    <v-layout v-else justify-center>
      <v-flex xs12 sm10>
        <!--the scenario boxes-->
        <v-card flat color="accent">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="card in cards" :key="card.title" xs6>
                <v-card dark tile hover flat>
                  <v-img :src="card.src" height="300px" aspect-ratio="2.75" />
                  <v-card-title primary-title>
                    <div class="headline">
                      {{ card.title }}
                    </div>
                  </v-card-title>
                  <v-divider />
                  <v-card-actions>
                    <v-btn
                      flat
                      color="primary lighten-1"
                      @click="handleSelect(card.scenarioCode)"
                    >
                      Select
                    </v-btn>
                    <v-btn
                      color="primary lighten-1"
                      flat
                      @click="dialog = true"
                    >
                      Details
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-dialog v-if="scenario" v-model="dialog" width="500" lazy>
        <v-card dark>
          <v-card-title class="headline" primary-title>
            Details
          </v-card-title>
          <v-card-text>
            {{ scenario.description }}
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" flat @click="dialog = false">
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import LoadingBlock from "../../common/loadingBlock.vue";
import gql from "graphql-tag";

export default {
  name: "ExperimentSelect",
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
          scenarioCode: "APPLMRKT"
        },
        {
          title: "Other Scenario",
          src: require("@/assets/Economics.jpg"),
          scenarioCode: ""
        },
        {
          title: "Lorem Ipsum",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          scenarioCode: ""
        },
        {
          title: "Moriatus Potus",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          scenarioCode: ""
        }
      ]
    };
  },
  methods: {
    handleSelect(code) {
      this.$router.push(`/guide/start/${code}`);
    }
  },
  apollo: {
    // Simple query that gets the user id
    scenario: {
      query: gql`
        query scenario($code: ID) {
          scenario(code: $code) {
            id
            description
            name
          }
        }
      `,
      loadingKey: "isLoading",
      fetchPolicy: "network-only",
      variables: {
        code: "APPLMRKT"
      },
      result({ data }) {
        this.$credentials.sSelect = data.scenario.name;
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
