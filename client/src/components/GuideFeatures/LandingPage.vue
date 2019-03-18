<template>
  <v-content>
    <Nav />
    <v-item-group> </v-item-group>
    <!---->
    <v-container>
      <LoadingBlock
        v-if="
          this.$_apollo.loading || this.$apollo.loading || $apolloData.loading
        "
      />
    </v-container>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="purple" dark>
            <v-card-title primary class="title"
              >The current User ID</v-card-title
            >
            <v-card-text>Me.id: {{ me.id }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="indigo" dark>
                <v-card-title primary class="title"
                  >The current Guide ID</v-card-title
                >
                <v-card-text> Me.guide.id: {{ me.guide.id }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card color="red lighten-2" dark>
                    <v-card-title primary class="title"
                      >The "guideId" variable
                    </v-card-title>
                    <v-card-text
                      >guideId: {{ this.$credentials.guideId }}</v-card-text
                    >
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2 child-flex>
          <v-card color="green lighten-2" dark>
            <v-card-text>lorem Ipsum asjkdfhl</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="blue lighten-2" dark>
            <v-card-text>Lorem Ipsum sheuofd djhfu aure </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Nav from "../Nav";
import gql from "graphql-tag";
import LoadingBlock from "../loadingBlock";

export default {
  name: "LandingPage",
  components: { LoadingBlock, Nav },
  data() {
    return {
      guideId: "",
      fullName: ""
    };
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  apollo: {
    // Simple query that gets the user id
    me: {
      query: gql`
        {
          me {
            id
            fullName
            guide {
              id
            }
          }
        }
      `,
      result({ data }) {
        this.$credentials.userId = data.me.id;
        this.$credentials.guideId = data.me.guide ? data.me.guide.id : null;
        this.$credentials.displayName = data.me.fullName;
        console.log(this.$credentials);
        // this.$apollo.queries.tags.skip = true;
      }
    }
  }
};
</script>

<style scoped></style>
