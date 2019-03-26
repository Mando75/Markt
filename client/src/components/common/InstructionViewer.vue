<template>
  <v-layout row wrap>
    <v-flex v-for="(step, i) in instructions" :key="`step=${i}`" xs12>
      <ul class="text-xs-left">
        <li
          v-for="(bullet, bi) in step.bullets"
          :key="`step-${i}-bullet-${bi}`"
        >
          <span :class="`headline ${bullet.format}`">
            {{ bullet.text }}
          </span>
        </li>
      </ul>
    </v-flex>
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
