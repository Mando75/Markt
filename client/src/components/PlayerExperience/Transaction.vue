<template>
  <v-content color="secondary0">
    <Nav />

    <v-card flat>
      <v-toolbar color="primary" dark extended flat>
        <v-toolbar-side-icon></v-toolbar-side-icon>
      </v-toolbar>

      <v-layout row pb-2>
        <v-flex xs8 offset-xs2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card prominent>
              <v-toolbar-title class="body-2 grey--text"
                >Player Transaction</v-toolbar-title
              >

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon></v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon></v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>

            <v-divider></v-divider>

            <v-card-text style="height: 200px;">
              <v-item-group
                ><v-btn><v-icon>money</v-icon>BUY</v-btn>
                <v-btn><v-icon>money</v-icon>SELL</v-btn></v-item-group
              >
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-content>
</template>
<script>
import Nav from "../Nav";
export default {
  name: "Transaction",
  components: { Nav }
};
</script>

<style scoped></style>
