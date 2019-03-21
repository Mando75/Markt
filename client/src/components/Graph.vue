<template
  ><v-content>
    <v-card class="mx-auto text-xs-center" color="green" dark max-width="600">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">Sales Last 24h</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block flat>Go to Report</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Graph",
  data: () => ({
    value: []
  }),
  mounted() {
    console.log(this.$apollo.queries);
  },
  apollo: {
    chart: {
      query: gql`
        query scenario($code: ID!) {
          scenario(code: $code) {
            overview {
              chartPoints
            }
          }
        }
      `,

      variables: {
        code: "APPLMRKT"
      }
      // result({ data }) {
      // value = data.chart.overview.chartPoints;
      // for (point in data.chart.overview.chartPoints) {
      //   value[index] = point;
      // }
      // }
    }
  }
};
</script>

<style scoped></style>
