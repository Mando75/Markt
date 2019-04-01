<template>
  <div>
    here is the ROUND summary:
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-btn @click="changeStatus('newSession')"
              >Start a new session</v-btn
            >
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            <v-btn @click="changeStatus('newRound')">Start New Round</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RoundSummary",
  data() {
    return {
      status: "value"
    };
  },
  methods: {
    changeStatus(name) {
      switch (name) {
        case "newSession":
          this.$credentials.exStatus = "seshStart";
          break;
        case "newRound":
          this.$credentials.exStatus = "roundStart";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped></style>
