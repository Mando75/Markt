<template>
  <v-layout align-space-between justify-start column>
    <v-card class="px-2" :flat="flat">
      <v-card-title v-if="title" primary-title>
        <h2 class="headline">{{ title }}</h2>
      </v-card-title>
      <v-flex v-for="(step, i) in instructions" :key="`step=${i}`" d-flex my-4>
        <div class="text-md-left text-sm-justify font-weight-regular">
          <v-list-tile class="mt-0 pt-0"
            >{{ showStep ? step.step : "" }} {{ step.header }}</v-list-tile
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
    flat: {
      type: Boolean,
      default: true,
      required: false
    },
    instructions: {
      type: Array,
      required: true
    },
    showStep: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: ""
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
