<template>
  <div>
    <div v-if="apolloLoading || !experimentPlayer">
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
      <RoundSummary
        v-if="roundSummary"
        :summary="experiment.lastRoundSummaryReport"
      />
      <InstructionsFAB>
        <PlayerSessionInstructions
          :session-role="experimentPlayer.currentSessionRole"
        />
      </InstructionsFAB>
    </div>
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
import RoundSummary from "../../common/RoundSummary";
export default {
  name: "ExperimentRunner",
  components: {
    RoundSummary,
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
    },
    experimentId() {
      return this.experimentPlayer ? this.experimentPlayer.experiment.id : null;
    }
  },
  watch: {
    experimentPlayer(newVal, oldVal) {
      if (oldVal === undefined) {
        this.$apollo.queries.experiment.skip = false;
        this.$apollo.subscriptions.experiment.start();
      }
    },
    "experiment.status"(newVal) {
      if (newVal === "closed") {
        this.$router.push("/join");
      }
    }
  },
  apollo: {
    experiment: {
      query: er_experimentQuery,
      variables() {
        return {
          experimentId: this.experimentId
        };
      },
      skip: true,
      loadingKey: "apolloLoading",
      subscribeToMore: {
        document: er_experimentStatusUpdateSubscription,
        variables() {
          return {
            experimentId: this.experimentId
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
          experimentPlayerId:
            this.$route.params.experimentPlayerId ||
            this.$credentials.experimentPlayerId
        };
      },
      error() {
        this.$router.push("/join");
      }
    }
  }
};
</script>

<style scoped></style>
