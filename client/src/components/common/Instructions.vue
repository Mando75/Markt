<!-- Display the instructions. This component can be used as a popup if needed.-->
<template>
  <v-container fluid grid-list class="mt-7 pa-3">
    <!--title Card-->
    <v-layout justify-start column fill-height>
      <v-flex xs12>
        <v-card flat fill-height>
          <h1 class="display-2">Instructions for {{ scenario.name }}</h1>
          <br />
        </v-card>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <!--description card-->
    <v-layout cloumn justify-start>
      <v-flex d-flex xs12>
        <v-card flat>
          <v-card-text class="font-weight-thin  block-comment subheading ">
            <v-flex sm6 offset-xs3>
              <div class="headline">Description</div>
              {{ scenario.description }}
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!--Important info Cards-->
    <!--tile 1-->
    <v-layout wrap row>
      <v-flex xs6 order-lg2 d-flex>
        <v-card dark tile flat color="primary darken-4">
          <v-card-text class="headline font-weight-medium">
            <span>
              Items in <b>"BOLD"</b> text denote actions to perform.
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--tile 2-->
      <v-flex xs6 d-flex>
        <v-card dark tile flat color="primary darken-4">
          <v-card-text class="headline font-weight-medium">
            <span> Items in <i>"ITALIC"</i> represent words to be said. </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!--the looped points.-->
    <InstructionViewer :instructions="scenario.instructions" />
  </v-container>
</template>

<script>
import InstructionViewer from "./InstructionViewer";
export default {
  name: "Instructions",
  components: { InstructionViewer },
  props: {
    scenario: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped></style>
