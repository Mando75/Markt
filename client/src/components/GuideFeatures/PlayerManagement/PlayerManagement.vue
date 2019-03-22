<template>
  <v-container fluid color="secondary0" grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <PlayerInvitationCard @playerAdded="refetchPlayerList" />
      </v-flex>
      <v-flex xs12 md6>
        <PlayerList ref="playerList" />
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
  methods: {
    refetchPlayerList() {
      console.log("refetch");
      this.$refs.playerList.refetch();
    }
  }
};
</script>

<style scoped></style>
