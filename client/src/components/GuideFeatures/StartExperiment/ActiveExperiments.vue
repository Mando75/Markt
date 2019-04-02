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
          <v-data-table
            :headers="tableHeaders"
            :items="activeExperimentList"
            hide-actions
            item-key="id"
          >
            <template slot="items" slot-scope="props">
              <tr
                :active="props.selected"
                @click="props.selected = !props.selected"
              >
                <td>{{ props.item.joinCode }}</td>
                <td class="text-xs-left">
                  {{ props.item.status | formatStatus }}
                </td>
                <td class="text-xs-left">{{ props.item.numPlayers }}</td>
                <td class="text-xs-left">
                  {{ props.item.updatedDate | formatDate }}
                </td>
                <td class="text-xs-right">
                  <v-btn
                    color="primary"
                    @click="$router.push(`/guide/experiment/${props.item.id}`)"
                  >
                    Continue
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
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
  data() {
    return {
      tableHeaders: [
        {
          text: "Join Code",
          align: "left",
          sortable: false,
          value: "join_code"
        },
        {
          text: "Status",
          align: "left",
          sortable: false,
          value: "status"
        },
        {
          text: "Number of Players",
          align: "left",
          sortable: false,
          value: "num_players"
        },
        {
          text: "Last Updated",
          align: "left",
          sortable: false,
          value: "last_updated"
        },
        {
          text: "",
          align: "left",
          sortable: false,
          value: "action"
        }
      ]
    };
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
