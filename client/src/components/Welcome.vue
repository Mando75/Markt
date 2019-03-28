<template>
  <div id="app">
    <div>
      <section>
        <v-parallax
          :src="require('@/assets/Ultra-High-Res-Wallpaper-4.jpg')"
          height="350"
        >
          <v-layout column align-center justify-center class="white--text mt-2">
            <v-img
              class="mt-2"
              :src="require('@/assets/logo.png')"
              height="160"
              width="160"
            ></v-img>
            <h1 class="mb-3 display-3 font-weight-medium text-lg-center ">
              Markt
            </h1>
            <div class="subheading mb-3 text-xs-center ">
              " Classroom Market Simulations "
            </div>
            <v-btn class=" modernColor3 darken-1 mt-2 mb-4" dark large>
              Learn More
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <div class="md3">
            <h4 class="italic">
              Markt(noun) the Dutch word for Market.
            </h4>
            <!--<v-card-text><i>"We use the 'e' for Education!"</i> </v-card-text>-->
          </div>
          <v-timeline :dense="$vuetify.breakpoint.xsOnly">
            <v-timeline-item
              v-for="(item, i) in timeline"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
            >
              <v-card :color="item.color" dark>
                <v-card-title class="title">{{ item.title }}</v-card-title>
                <v-card-text class="modernColor1 lighten-2 text--primary">
                  <p class="font-weight-regular">
                    {{ item.body }}
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
              Digital learning is one step away.
            </div>
            <em>Create an account to make your Markt</em>
            <v-btn
              color="modernColor3 darken-1"
              class=""
              dark
              large
              @click="$router.push('/register')"
            >
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({
    timeline: [
      {
        color: "secondary",
        icon: "ballot",
        title: "Choose from a number of Simulations",
        body:
          "Teach supply and demand with an interactive example where the students are part of the experiment."
      },
      {
        color: "success ",
        icon: "people",
        title: "Easily Invite Participants",
        body:
          "Students can participate with their smart phones, without downloading anything"
      },
      {
        color: "monochrome1 darken-3",
        icon: "school",
        title: "Use Experiment Data to Teach",
        body:
          "View market summaries, item price changes, and many more to follow up with your class about the results"
      }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
h1 {
  /*color: "modernColor0";*/
}
</style>
