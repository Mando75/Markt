<template>
  <v-layout align-space-between justify-start column>
    <v-card flat class="px-4">
      <v-flex v-for="(step, i) in instructions" :key="`step=${i}`" d-flex my-4>
        <div class="text-md-left text-sm-justify font-weight-regular">
          <v-list-tile v-if="step.step && step.header" class="mt-0 pt-0"
            >{{ step.step }} {{ step.header }}</v-list-tile
          >
          <v-flex v-if="step.bullets.length > 1" offset-xs1>
            <ul class="text-xs-left justify-space-between ">
              <li
                v-for="(bullet, bi) in step.bullets"
                :key="`step-${i}-bullet-${bi}`"
                class="mb-2"
              >
                <span
                  :class="`body-2 headline ${bullet.format}`"
                  v-html="bullet.text"
                />
              </li>
            </ul>
          </v-flex>
          <v-flex v-else offset-xs1 class="text-xs-left">
            <span
              :class="`body-2 headline ${step.bullets[0].format}`"
              v-html="step.bullets[0].text"
            />
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
