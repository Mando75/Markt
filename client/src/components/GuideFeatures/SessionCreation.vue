<template>
  <v-content color="secondary0">
    <Nav />
    <v-container>
      <!--<v-item-group>-->
      <!--<v-item>-->
      <v-flex align="">
        <v-btn class="container" id="apple">
          <v-card>
            <v-img
              :src="require('@/assets/marketPainting.jpg')"
              aspect-ratio="2.75"
            ></v-img>
            <v-card-title> TEST APPLE MARKET</v-card-title>
          </v-card></v-btn
        ></v-flex
      >
      <!--</v-item>-->
      <!--</v-item-group>-->
    </v-container></v-content
  >
</template>

<script>
import Nav from "../Nav";
export default {
  name: "SessionCreation",
  components: { Nav }
};
</script>

<style scoped></style>
