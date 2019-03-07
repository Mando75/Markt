<template>
  <section id="welcome" class="hide-overflow">
    <v-content color="secondary0"><Nav /></v-content>

    <v-layout>
      <v-flex hidden-sm-and-down md6>
        <v-img
          :src="require('@/assets/thinkstock-calling-on-student.jpg')"
          height="100vh"
        />
      </v-flex>

      <v-flex
        xs12
        md6
        align-content-space-between
        layout
        :pa-5="$vuetify.breakpoint.smAndDown"
        wrap
      >
        <base-bubble-1 style="transform: rotate(180deg) translateY(25%)" />

        <v-layout align-center justify-center>
          <v-flex xs10 md6>
            <base-heading>Welcome!</base-heading>
            <base-text>
              Lorem ipsum dolor sit amet, consectetur ad ipiscin elit. Etiam
              vulputate augue vel felis gra vida porta. Lorem ipsum dolor sit
              amet, cons ectetur adipiscing elit.<br />
              Lorem ipsum dolor sit amet, consectetur ad ipiscin elit. Etiam
              vulputate augue vel felis gra vida porta. Lorem ipsum dolor sit
              amet, cons ectetur adipiscing elit.
            </base-text>
            <base-btn class="mt-4">
              Learn More!
            </base-btn>
          </v-flex>
        </v-layout>

        <base-bubble-2
          style="transform: rotate(180deg) translate(-200px, -15%)"
        />
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import Nav from "./Nav";
import gql from "graphql-tag";

export default {
  name: "Welcome",
  components: { Nav }
};
</script>

<style scoped></style>
