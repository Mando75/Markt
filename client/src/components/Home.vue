<template>
  <v-app color="secondary0">
    <v-content>
      <Nav />

      <v-container grid-list-md text-xs-center fluid>
        <v-layout row wrap>
          <v-flex xs12 fill-height> </v-flex>
          <!-- The "body" begins here-->
          <v-flex v-for="i in 2" :key="`6${i}`" xs6>
            <v-card color="primary0">
              <v-card-text class="px-0">6</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 3" :key="`4${i}`" xs4>
            <v-card dark color="primary2">
              <v-card-text class="px-0">4</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 4" :key="`3${i}`" xs3>
            <v-card dark color="secondary1">
              <v-card-text class="px-0">3</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 6" :key="`2${i}`" xs2>
            <v-card dark color="secondary2">
              <v-card-text class="px-0">2</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="modernColor3">
              <v-card-text class="px-0">1</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
import Nav from "./Nav";

export default {
  name: "Home",
  components: { Nav },
  props: {
    msg: String
  }
};
//   apollo: {
//     me: {
//       query: gql`
//         {
//           me {
//             id
//             email
//           }
//         }
//       `,
//       result(data) {
//         console.log(data);
//       },
//       error(er) {
//         alert(er);
//       }
//     }
//   }
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
