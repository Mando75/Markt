<template>
  <div>
    <SessionStart
      v-if="sessionStart"
      :session-role="experimentPlayer.currentSessionRole"
    />
    <span>In Round: {{ inRound }}</span>
    <br />
    <span>Round Summary {{ roundSummary }}</span>
  </div>
</template>

<script>
import {
  er_experimentQuery,
  er_experimentPlayerQuery,
  er_experimentStatusUpdateSubscription
} from "./experimentRunnerQueries.graphql";
import SessionStart from "./SessionStart";
export default {
  name: "ExperimentRunner",
  components: { SessionStart },
  computed: {
    currentStatus() {
      return this.experiment ? this.experiment.status : "";
    },
    sessionStart() {
      return ["joining", "session_start"].includes(this.currentStatus);
    },
    inRound() {
      return this.currentStatus === "in_round";
    },
    roundSummary() {
      return this.currentStatus === "round_summary";
    }
  },
  mounted() {
    console.log(er_experimentStatusUpdateSubscription);
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
