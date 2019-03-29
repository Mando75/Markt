<template>
  <v-expansion-panel v-if="activeExperimentList && activeExperimentList.length">
    <v-expansion-panel-content>
      <template slot="header">
        <span class="headline">Active Experiments</span>
      </template>
      <template slot="actions">
        <v-icon color="error">notifications_active</v-icon>
      </template>
      <v-card>
        <v-card-text>
          These are active (running) experiments you have for this scenario.
          Select one to continue where you left off.
        </v-card-text>
        <v-card-text>
          <table width="100%">
            <thead>
              <tr>
                <th>Number of Players</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="experiment in activeExperimentList"
                :key="experiment.id"
              >
                <td>{{ experiment.numPlayers }}</td>
                <td>{{ experiment.updatedDate | formatDate }}</td>
                <td style="text-align: right">
                  <v-btn
                    color="primary"
                    @click="$router.push(`/guide/experiment/${experiment.id}`)"
                  >
                    Continue
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { activeExperimentList } from "../guideExperimentQueries.graphql";
export default {
  name: "ActiveExperiments",
  props: {
    scenarioId: {
      type: String,
      required: true
    }
  },
  apollo: {
    activeExperimentList: {
      query: activeExperimentList,
      variables() {
        return {
          scenarioId: this.scenarioId
        };
      },
      update(data) {
        return data.me.guide.experiments;
      }
    }
  }
};
</script>

<style scoped></style>
