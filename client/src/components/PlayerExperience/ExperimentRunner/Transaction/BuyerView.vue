<template>
  <div>
    <h1 class="display-3 my-4">You cannot sell this round</h1>
    <h3 class="display-2 mt-4"><strong>Profit Equation</strong></h3>
    <span class="display-2">
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
