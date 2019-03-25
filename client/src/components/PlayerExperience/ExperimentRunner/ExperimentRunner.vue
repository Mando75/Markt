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
  apollo: {}
};
</script>

<style scoped></style>
