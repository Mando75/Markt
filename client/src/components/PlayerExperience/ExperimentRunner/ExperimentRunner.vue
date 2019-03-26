<template>
  <div>
    Welcome to experiment Runner
  </div>
</template>

<script>
export default {
  name: "ExperimentRunner",
  props: {
    experimentId: {
      type: String,
      required: true
    }
  },
  apollo: {
    experiment
  }
};
</script>

<style scoped></style>
