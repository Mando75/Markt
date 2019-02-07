<template lang="html">
  <section class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col wrapper-box">
        <img class="mx-auto d-block" src="../../../../../../Downloads/vue-register-login-contact-list-master/vue-register-login-contact-list-master/src/assets/logo-new-color-site.png" alt="Compacto Records" title="Compacto Records">
        <p class="wrapper-box__title text-center">Sign in</p>
        <div>
          <form class="form form-newaccount" id="loginForm">
            <div class="form-group">
              <label for="inputUser">E-mail</label>
              <input v-model="input.username" @focus="clearError()" id="inputUser" type="text" name="username" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="input.password" @focus="clearError()" @keyup.enter="login" id="inputPassword" type="password" name="password" class="form-control" placeholder="Password">
            </div>
            <div class="custom-control custom-checkbox pull-right">
              <input type="checkbox" class="custom-control-input" id="customCheck1">
              <label class="custom-control-label" for="customCheck1">Remember password</label>
            </div>
            <input type="button" v-on:click="login()" class="btn btn-default" id="submitLogin" value="Entrar">
            <transition name="fade">
              <span class="error-block error-message" v-show="error != null">{{ error }}</span>
             </transition>
             <hr>
             <router-link to="/register" class="text-link d-block text-right">No account yet?</router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Login',
    metaInfo: {
      title: 'Sign in',
      titleTemplate: '%s | Compacto Records'
    },
    data() {
      return {
        input: {
          username: '',
          password: '',
        },
        error: '',
      }
    },
    methods: {
      login() {
        if(this.input.username != "" && this.input.password != "") {
          if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
            this.$emit("authenticated", true);
            this.$router.replace({ name: "secure" });
          } else {
            this.error = 'E-mail or password incorrect'
            console.log("The username and / or password is incorrect");
          }
        } else {
          this.error = 'Enter a valid e-mail and password'
          console.log("A username and password must be present");
        }
      },
      clearError() {
        this.error = ''
      },
    }
  }
</script>

<style lang="scss">
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 300ms;
  }
</style>
