<template>
  <div id="app">
    <v-app light>
      <Nav />
      <v-content>
        <section>
          <v-parallax
            :src="require('@/assets/Big-data-analytics-solutions.jpg')"
            height="350"
          >
            <v-layout
              column
              align-center
              justify-center
              class="white--text mt-2"
            >
              <v-img
                :src="require('@/assets/logo.png')"
                height="160"
                width="160"
              ></v-img>
              <h1 class="mb-3 display-1 text-xs-center modernColor0">
                Classroom Market Simulations
              </h1>
              <div class="subheading mb-3 text-xs-center modernColor0">
                " Invite students with a join code, view market simulation
                results and more! "
              </div>
              <v-btn
                class=" modernColor3 darken-1 mt-2 mb-4"
                dark
                large
                href="/"
              >
                Learn More
              </v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-layout column wrap class="my-5" align-center>
            <v-timeline align-top>
              <v-timeline-item
                v-for="(item, i) in timeline"
                :key="i"
                :color="item.color"
                :icon="item.icon"
                fill-dot
              >
                <v-card :color="item.color" dark>
                  <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
                  <v-card-text class="modernColor1 text--primary">
                    <p>
                      Lorem ipsum dolor sit amet, no nam oblique veritus.
                      Commune scaevola imperdiet nec ut, sed euismod convenire
                      principes at. Est et nobis iisque percipit, an vim zril
                      disputando voluptatibus, vix an salutandi sententiae.
                    </p>
                    <!--<v-btn :color="item.color" class="mx-0" >-->
                    <!--Button-->
                    <!--</v-btn>-->
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-layout>
        </section>

        <!--second parallax image-->
        <section>
          <v-parallax
            :src="require('@/assets/shutterstock_127932377.jpg')"
            height="320"
          >
            <v-layout column align-center justify-center>
              <div class="headline white--text mb-3 text-xs-center">
                Lorem
              </div>
              <em>Create an account to start teaching</em>
              <v-btn color="modernColor3 darken-1" class="" dark large href="/">
                Get Started
              </v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <!--Bottom section what goes here?-->
        <section>
          <v-container grid-list-xl>
            <v-layout row wrap justify-center class="my-5">
              <v-flex xs12 sm4>
                <v-card class="elevation-0 transparent"> </v-card>
              </v-flex>
              <v-flex xs12 sm4 offset-sm1>
                <v-card class="elevation-0 transparent"> </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>

        <v-footer color="modernColor0">
          <v-layout row wrap align-center>
            <v-flex xs12> </v-flex>
          </v-layout>
        </v-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Nav from "./Nav";
import gql from "graphql-tag";

export default {
  name: "Welcome",
  components: { Nav },
  data: () => ({
    timeline: [
      {
        color: "primary0 darken-2",
        icon: "ballot"
      },
      {
        color: "primary4 ",
        icon: "people"
      },
      {
        color: "primary3 ",
        icon: "school"
      }
    ]
  })
};
</script>

<style scoped>
h1 {
  color: modernColor0;
}
</style>
