<template>
  <div id="app" class="h-100">
    {{title}}
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: 'App',
    data() {
      return {
        authenticated: false,
        mockAccount: {
          username: 'compacto',
          password: 'compacto'
        }
      }
    },
    apollo: {
      me: {
        query: gql`{ me { id email } }`,
        result(data) {
          console.log(data)
        }
      }
    }
  }
</script>

