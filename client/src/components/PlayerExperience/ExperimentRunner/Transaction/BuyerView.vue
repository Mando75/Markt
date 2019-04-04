<template>
  <div>
    <h1 class="display-1 my-4">You cannot sell this round</h1>
    <h3 class="display-1 mt-4 font-weight-medium">Profit Equation</h3>
    <span class="display-1">
      {{ experimentPlayer.currentSessionRole.profitEquation }}
    </span>
  </div>
</template>

<script>
export default {
  name: "BuyerView",
  props: {
    experimentPlayer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
