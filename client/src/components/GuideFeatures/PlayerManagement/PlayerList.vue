<template>
  <v-card dark elevation="4" tile :height="height">
    <v-card-title primary-title>
      <h1 class="headline text-xs-center" style="width: 100%">
        Your Players
      </h1>
    </v-card-title>
    <v-card-text class="scroll-list">
      <v-list class="scroll-list with-overflow">
        <v-progress-circular
          v-if="loadingPlayerList"
          indeterminate
        ></v-progress-circular>
        <v-list-group
          v-for="player in players"
          :key="player.id"
          v-model="player.open"
          :prepend-icon="player.active ? 'check_circle' : 'highlight_off'"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ `${player.firstName} ${player.lastName}` }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ player.playerCode }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Player Code
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ player.email }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Player Email
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { guidesPlayers } from "./playerManagementQueries.graphql";
export default {
  name: "PlayerList",
  props: {
    height: {
      type: String,
      default: "600"
    }
  },
  data() {
    return {
      loadingPlayerList: 0
    };
  },
  methods: {
    addPlayer(player) {
      this.players.push({ ...player, open: false });
    }
  },
  apollo: {
    players: {
      query: guidesPlayers,
      variables() {
        return {
          guideId: this.$credentials.guideId
        };
      },
      update(resp) {
        return resp.guide.players.map(p => ({ ...p, open: false }));
      },
      loadingKey: "loadingPlayerList"
    }
  }
};
</script>

<style scoped>
.scroll-list {
  height: 90%;
}
.scroll-list .with-overflow {
  overflow-y: scroll;
}
</style>
