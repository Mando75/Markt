<template>
  <div>
    <!---->
    <LoadingBlock v-if="isLoading" />
    <v-container v-else fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-card color="primary3 lighten-1" dark>
            <v-card-title primary class="title">$Credentials</v-card-title>
            <v-card-text
              >authenticated: {{ $credentials.authenticated }}<br />
              isUser: {{ $credentials.isUser }}<br />
              isPlayer: {{ $credentials.isPlayer }}<br />
              <strong>userId: "{{ $credentials.userId }}"</strong><br />
              <i>playerId: "{{ $credentials.playerId }}"</i><br />
              <strong>guideId: "{{ $credentials.guideId }}"</strong><br />
              scenarioId: "{{ $credentials.scenarioId }}"<br />
              sSelect: "{{ $credentials.sSelect }}"
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="primary1 darken-3" dark>
                <v-card-title primary class="title font-weight-bold"
                  >Scenario Selected</v-card-title
                >
                <v-card-text class="headline">{{
                  $credentials.sSelect
                }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card color="primary2" dark>
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
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="primary1 darken-3" dark>
            jkslfjs
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import LoadingBlock from "../loadingBlock";

export default {
  name: "LandingPage",
  components: { LoadingBlock },
  data() {
    return {
      guideId: "",
      fullName: "",
      isLoading: 0
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
      loadingKey: "isLoading",
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
