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
              experimentId: "{{ $credentials.experimentId }}"<br />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="primary darken-2" dark>
                <v-card-title v-if="$credentials.sSelect === ''" primary-title
                  >No Experiment Selected</v-card-title
                >
                <v-card-title v-else primary class="headline font-weight-bold"
                  >Scenario Selected:</v-card-title
                >
                <v-card-text class="title font-weight-medium">{{
                  $credentials.sSelect
                }}</v-card-text>

                <span class="subheading">
                  <v-btn
                    dark
                    large
                    color="primary"
                    class="text-capitalize"
                    @click="proceedToStart"
                    >Begin Selected</v-btn
                  >
                </span>
                <br />
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm6 md6>
              <v-layout row>
                <v-flex d-flex>
                  <v-card color="secondary darken-1" dark>
                    <v-card-title class="headline font-weight-bold">
                      Active Experiments
                    </v-card-title>
                    <v-card-text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </v-card-text>
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
                <v-card-title class="headline font-weight-bold"
                  >Round Summary Report
                </v-card-title>
                <v-card-text>
                  Once the facilitator chooses to end a round, the participants
                  are taken to a round summary report.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card color="primary" dark>
                    <v-card-title class="headline font-weight-bold">
                      Recent Players Invited
                    </v-card-title>
                    <PlayerList :height="'150'" :mini-version="true" />
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md9>
          <v-card color="secondary darken-3 lighten-2" dark>
            <v-card-title class="headline font-weight-bold"
              >Recent Scenarios
            </v-card-title>
            <table width="80%">
              <thead>
                <tr>
                  <th>Scenario Name</th>
                  <th>Last Run</th>
                </tr>
              </thead>
              <tbody style="text-align: right">
                <tr v-for="exp in recentExps" :key="exp.id">
                  <td>{{ exp.scenario.name }}</td>
                  <td>{{ exp.updatedDate | formatDate }}</td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LoadingBlock from "../common/loadingBlock";
import PlayerList from "./PlayerManagement/PlayerList";
import { mySelf } from "./guideExperimentQueries.graphql";

export default {
  name: "LandingPage",
  components: { PlayerList, LoadingBlock },
  data() {
    return {
      guideId: "",
      fullName: "",
      isLoading: 0,
      recentExps: []
    };
  },
  methods: {
    proceedToStart() {
      this.$router.push("/guide/start/APPLMRKT");
    }
  },
  apollo: {
    // Simple query that gets the user id
    me: {
      query: mySelf,
      loadingKey: "isLoading",
      result({ data }) {
        this.$credentials.userId = data.me.id;
        this.$credentials.guideId = data.me.guide ? data.me.guide.id : null;
        this.$credentials.displayName = data.me.fullName;
        // this.recentExps = data.me.guide.experiments;
      }
    }
  }
};
</script>

<style scoped></style>
