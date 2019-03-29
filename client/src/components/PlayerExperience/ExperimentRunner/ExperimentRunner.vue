<template>
  <div>
    <div v-if="apolloLoading">
      <LoadingBlock />
    </div>
    <div v-else>
      <SessionStart
        v-if="sessionStart"
        :session-role="experimentPlayer.currentSessionRole"
      />
      <Transaction
        v-if="inRound"
        :experiment-id="experiment.id"
        :experiment-player="experimentPlayer"
      />
      <span>In Round: {{ inRound }}</span>
      <br />
      <span>Round Summary {{ roundSummary }}</span>
    </div>
    <InstructionsFAB>
      <PlayerSessionInstructions
        :session-role="experimentPlayer.currentSessionRole"
      />
    </InstructionsFAB>
  </div>
</template>

<script>
import {
  er_experimentQuery,
  er_experimentPlayerQuery,
  er_experimentStatusUpdateSubscription
} from "./experimentRunnerQueries.graphql";
import SessionStart from "./SessionStart";
import Transaction from "./Transaction/Transaction";
import LoadingBlock from "../../common/loadingBlock";
import InstructionsFAB from "../../common/InstructionsFAB";
import PlayerSessionInstructions from "./PlayerSessionInstructions";
export default {
  name: "ExperimentRunner",
  components: {
    PlayerSessionInstructions,
    InstructionsFAB,
    LoadingBlock,
    Transaction,
    SessionStart
  },
  data() {
    return {
      apolloLoading: 0
    };
  },
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
  created() {
    if (!this.$credentials.experimentId) {
      this.$router.push("/join");
    }
  },
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
      loadingKey: "apolloLoading",
      subscribeToMore: {
        document: er_experimentStatusUpdateSubscription,
        variables() {
          return {
            experimentId: this.$credentials.experimentId
          };
        },
        updateQuery(prev, { subscriptionData }) {
          this.$apollo.queries.experimentPlayer.refetch();
          this.experiment = subscriptionData.data.experimentStatusChanged;
        }
      }
    },
    experimentPlayer: {
      query: er_experimentPlayerQuery,
      loadingKey: "apolloLoading",
      variables() {
        return {
          experimentPlayerId: this.$credentials.experimentPlayerId
        };
      }
    }
  }
};
</script>

<style scoped></style>
