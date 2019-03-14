<template>
  <v-content
    ><Nav />
    <v-container>
      <v-layout> </v-layout>
      <div>{{ me.guide.id }}</div>
      <v-item-group> </v-item-group>
    </v-container>
    <!---->
    <v-container>
      <LoadingBlock
        v-if="
          this.$_apollo.loading || this.$apollo.loading || $apolloData.loading
        "
      />
    </v-container>
  </v-content>
</template>

<script>
import Nav from "../Nav";
import gql from "graphql-tag";
import LoadingBlock from "../loadingBlock";

export default {
  name: "LandingPage",
  components: { LoadingBlock, Nav },
  data() {
    return {
      guideId: ""
    };
  },
  mounted() {
    console.log(this.$apollo.queries);
  },
  apollo: {
    // Simple query that gets the user id
    me: {
      query: gql`
        {
          me {
            id
            guide {
              id
            }
          }
        }
      `,
      result({ data }) {
        this.$credentials.userId = data.me.id;
        this.$credentials.guideId = data.me.guide ? data.me.guide.id : null;

        console.log(this.$credentials);
      }
    }
  }
};
</script>

<style scoped></style>
