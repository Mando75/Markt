<template>
  <v-container fluid color="primary" grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <PlayerInvitationCard :height="cardHeights" @playersAdded="addPlayer" />
      </v-flex>
      <v-flex xs12 md6>
        <PlayerList ref="playerList" :height="cardHeights" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PlayerInvitationCard from "./PlayerInvitationCard";
import PlayerList from "./PlayerList";

export default {
  name: "InvitePlayers",
  components: {
    PlayerInvitationCard,
    PlayerList
  },
  computed: {
    cardHeights() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "600";
        case "sm":
        case "md":
        case "lg":
          return "700";
        case "xl":
          return "750";
        default:
          return "600";
      }
    }
  },
  methods: {
    addPlayer() {
      this.$refs.playerList.refetchPlayers();
    }
  }
};
</script>

<style scoped></style>
