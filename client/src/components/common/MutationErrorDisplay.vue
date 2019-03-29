<template>
  <div>
    <v-alert
      v-for="(err, i) in error.graphQLErrors"
      :key="`error${i}`"
      :value="error"
      dismissible
      transition="fade-transition"
      color="error"
    >
      {{ err.message }}
    </v-alert>
    <v-alert
      v-if="error.graphQLErrors.length === 0"
      transition="fade-transition"
      color="error"
      dismissible
      :value="true"
    >
      Something went wrong. Try again
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "MutationErrorDisplay",
  props: {
    error: {
      type: Error,
      required: true
    }
  }
};
</script>

<style scoped></style>
