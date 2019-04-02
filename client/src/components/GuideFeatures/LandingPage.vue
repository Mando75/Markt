<template>
  <div>
    <!---->
    <v-layout v-if="isLoading" align-content-space-between column>
      <v-flex xs12><LoadingBlock /></v-flex>
    </v-layout>
    <v-container v-else fluid grid-list-lg>
      <v-layout row wrap justify-start>
        <v-flex d-flex xs12 sm6 md6>
          <v-card color="primary darken-1" dark>
            <v-card-title primary class="headline font-weight-bold"
              >$Credentials</v-card-title
            >
            <v-card-text class="mt-0 pt-0"
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
              <v-card color="primary darken-3" dark>
                <v-card-title v-if="$credentials.sSelect === ''" primary-title
                  >No Experiment Selected</v-card-title
                >
                <v-card-title v-else primary class="headline font-weight-bold"
                  >Scenario Selected:</v-card-title
                >
                <v-card-text class="title font-weight-medium">{{
                  $credentials.sSelect
                }}</v-card-text>

                <span class="subheading"
                  ><v-btn
                    dark
                    large
                    color="primary"
                    class="text-capitalize"
                    @click="proceedToStart"
                    >Begin Selected</v-btn
                  ></span
                >
                <br />
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm6 md6>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card color="monochrome2" dark>
                    <v-card-title class="headline font-weight-bold"
                      >Recent Scenarios
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-layout column wrap>
            <v-flex d-flex>
              <v-card color="primary" dark>
                <v-card-text
                  >hajsdhlahsdfjasjf;dkfa;kjdkfj lkasjie aioeu;a
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card color="primary" dark>
                    <v-card-text
                      >dksjflsdjfl salkuoep aieuo adskj kshdfauua dskfa lewh
                      fadsfy alewhfaj</v-card-text
                    >
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md9>
          <v-card color="secondary darken-3 lighten-2" dark>
            <v-card-text
              >jkjjjfsdjfladsjkfjl;dfsa;fj
              ;aiuak;ljdfajsdkfjaiojiewajkldsjfa;dskadgpaewij</v-card-text
            >
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import LoadingBlock from "../common/loadingBlock";

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
  methods: {
    proceedToStart() {
      var peopleInvited = true;
      if (peopleInvited) {
        this.$router.push("/guide/start");
      } else {
        this.$router.push("/guide/invite");
      }
    }
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
        console.log("setting crap");
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
