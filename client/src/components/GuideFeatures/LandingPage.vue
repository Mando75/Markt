<template>
  <v-content>
    <Nav />
    <v-container>
      <v-layout>
        <v-flex align-self-center (size)(5)>
          <v-card>
            <v-card-text>Me.id: {{ me.id }}</v-card-text>
            <br />
            <div>Me.guide.id: {{ me.guide.id }}</div>
            <br />
            <div>guideId: {{ this.$credentials.guideId }}</div>
          </v-card>
        </v-flex>
      </v-layout>

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
      guideId: "",
      fullName: ""
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
            fullName
            guide {
              id
            }
          }
        }
      `,
      result({ data }) {
        this.$credentials.userId = data.me.id;
        this.$credentials.guideId = data.me.guide ? data.me.guide.id : null;
        this.$credentials.displayName = data.me.fullName;
        console.log(this.$credentials);
        // this.$apollo.queries.tags.skip = true;
      }
    }
  }
};
</script>

<style scoped></style>
