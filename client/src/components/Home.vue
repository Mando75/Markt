<template>
  <div color="secondary0">
    <v-content>
      <Nav />

      <v-container grid-list-xl text-lg-center fluid>
        <v-layout row wrap>
          <v-flex fill-height xs12>
            <v-card flat align="center">
              <v-img
                :src="require('@/assets/mainStockStockimg.png')"
                height="580"
                width="880"
              ></v-img>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card flat align="left"
              ><v-card-text class="px-1"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
                cursus nibh, sit amet condimentum magna. Vestibulum a elit
                semper, maximus eros ac, tempor velit. Proin condimentum erat
                pharetra, hendrerit turpis in, pulvinar nibh. Aenean ipsum sem,
                interdum et laoreet ut, tempus non urna. Nam tempus nisl porta
                purus commodo dictum. Proin sit amet augue nulla. Ut sagittis
                sit amet nulla ut malesuada. Praesent vel convallis erat. Etiam
                mauris mauris, vulputate non aliquet sed, vulputate eget elit.
                Donec rutrum ipsum non lectus aliquet, ut sodales justo
                faucibus. In hac habitasse platea dictumst. Aenean metus justo,
                malesuada nec lectus non, facilisis iaculis diam. Suspendisse
                tincidunt placerat erat, malesuada interdum nunc hendrerit
                eu.</v-card-text
              ></v-card
            >
          </v-flex>

          <!--<v-flex v-for="i in 3" :key="`4${i}`" xs4>-->
          <!--<v-card dark color="primary2">-->
          <!--<v-card-text class="px-0">4</v-card-text>-->
          <!--</v-card>-->
          <!--</v-flex>-->
          <!--<v-flex v-for="i in 4" :key="`3${i}`" xs3>-->
          <!--<v-card dark color="secondary1">-->
          <!--<v-card-text class="px-0">3</v-card-text>-->
          <!--</v-card>-->
          <!--</v-flex>-->
          <!--<v-flex v-for="i in 6" :key="`2${i}`" xs2>-->
          <!--<v-card dark color="secondary2">-->
          <!--<v-card-text class="px-0">2</v-card-text>-->
          <!--</v-card>-->
          <!--</v-flex>-->
          <!--<v-flex v-for="i in 12" :key="`1${i}`" xs1>-->
          <!--<v-card dark color="modernColor3">-->
          <!--<v-card-text class="px-0">1</v-card-text>-->
          <!--</v-card>-->
          <!--</v-flex>-->
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Nav from "./Nav";

export default {
  name: "Home",
  components: { Nav },
  props: {
    msg: String
  },
  data() {
    return {
      images: [
        {
          src: require("@/assets/mainStockStockimg.png")
        },
        {
          src: require("@/assets/marketPainting.jpg")
        },
        {
          src: require("@/assets/stock_market.jpg")
        }
      ]
    };
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
<!--<v-flex align-content-end>-->
<!--<v-carousel hide-controls hide-delimiters>-->
<!--<v-carousel-item-->
<!--v-for="(item, i) in images"-->
<!--:key="i"-->
<!--:src="item.src"-->
<!--&gt;-->
<!--</v-carousel-item>-->
<!--</v-carousel>-->
<!--</v-flex>-->
