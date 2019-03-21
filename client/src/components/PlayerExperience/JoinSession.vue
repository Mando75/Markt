<template>
  <v-container class="ma-auto pt-5">
    <!--<LoadingBlock v-if="this.$apollo.loading" />-->
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card dark>
          <!--<v-img-->
          <!--:src="require('@/assets/lecture.151104.jpg')"-->
          <!--aspect-ratio="2.75"-->
          <!--&gt;</v-img>-->
          <v-card-title class="display-1">Enter the Join Code</v-card-title>
          <v-card-text
            ><v-form v-model="valid">
              <v-flex xs12 md6 offset-md3>
                <v-text-field
                  v-model="joinCode"
                  label="Join Code"
                  required
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "JoinSession"
};
</script>

<style scoped></style>
