<template>
  <v-app>
    <v-content>
      <v-container grid-list-md text-xs-center fluid>
        <v-layout row wrap>
          <v-flex xs12 fill-height>
            <v-card dark color="primary">
              <v-card-text class="px-0"
                ><v-toolbar dark>
                  <v-toolbar-side-icon></v-toolbar-side-icon>
                  <v-toolbar-title>Title</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat>Link One</v-btn>
                    <v-btn flat>Link Two</v-btn>
                    <v-btn flat>Link Three</v-btn>
                  </v-toolbar-items>
                </v-toolbar></v-card-text
              >
            </v-card>
          </v-flex>
          <v-flex v-for="i in 2" :key="`6${i}`" xs6>
            <v-card dark color="secondary">
              <v-card-text class="px-0">6</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 3" :key="`4${i}`" xs4>
            <v-card dark color="primary">
              <v-card-text class="px-0">4</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 4" :key="`3${i}`" xs3>
            <v-card dark color="secondary">
              <v-card-text class="px-0">3</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 6" :key="`2${i}`" xs2>
            <v-card dark color="primary">
              <v-card-text class="px-0">2</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="secondary">
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
export default {
  name: "HelloWorld",
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
