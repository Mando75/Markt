<template>
  <v-layout align-space-between justify-start column>
    <v-card flat class="px-4">
      <v-flex v-for="(step, i) in instructions" :key="`step=${i}`" d-flex>
        <div class="text-md-left text-sm-justify font-weight-regular">
          <v-list-tile class="mt-0 pt-0"
            >{{ step.step }}) {{ step.header }}</v-list-tile
          >
          <v-flex offset-xs1>
            <ul class="text-xs-left justify-space-between ">
              <li
                v-for="(bullet, bi) in step.bullets"
                :key="`step-${i}-bullet-${bi}`"
                class="mb-2"
              >
                <span
                  class="body-2"
                  :class="`headline ${bullet.format}`"
                  v-html="bullet.text"
                />
              </li>
            </ul>
          </v-flex>
        </div>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "InstructionViewer",
  props: {
    instructions: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.NORMAL {
}
.ITALIC {
  font-style: italic;
}

.BOLD {
  font-style: normal;
  font-weight: bold;
}
</style>
