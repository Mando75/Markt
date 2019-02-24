<!-- Display the instructions. This component can be used as a popup if needed.-->
<template> </template>

<script>
import gql from "graphql-tag";
import Nav from "./Nav";

export default {
  name: "Instructions",
  components: { Nav },
  data() {
    return {
      userEmail: "",
      userPassword: "",
      loginMutation: gql`
        mutation login($userEmail: String!, $userPassword: String!) {
          login(user: { email: $userEmail, password: $userPassword }) {
            path
            message
          }
        }
      `
    };
  },
  methods: {
    handleLogin({ data }) {
      console.log(data);
      console.log(data.login);
    }
  }
};
</script>

<style scoped></style>
