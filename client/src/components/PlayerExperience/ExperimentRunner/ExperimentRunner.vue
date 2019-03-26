<template>
  <div>
    Welcome to experiment Runner
    {{ experiment }}
    {{ experimentPlayer }}
  </div>
</template>

<script>
import {
  er_experimentQuery,
  er_experimentPlayerQuery,
  er_experimentStatusUpdateSubscription
} from "./experimentRunnerQueries.graphql";
export default {
  name: "ExperimentRunner",
  mounted() {
    window.onbeforeunload = function() {
      return "You will be logged out of the experiment. Continue?";
    };
  },
  beforeDestroy() {
    window.onbeforeunload = function() {};
  },
  apollo: {
    experiment: {
      query: er_experimentQuery,
      variables() {
        return {
          experimentId: this.$credentials.experimentId
        };
      },
      subscribeToMore: {
        document: er_experimentStatusUpdateSubscription,
        variables() {
          return {
            experimentId: this.$credentials.experimentId
          };
        }
      }
    },
    experimentPlayer: {
      query: er_experimentPlayerQuery,
      variables() {
        return {
          experimentPlayerId: this.$credentials.experimentPlayerId
        };
      },
      updateQuery(prev, { subscriptionData }) {
        console.log(prev);
        console.log(subscriptionData);
      }
    }
  }
};
</script>

<style scoped></style>
