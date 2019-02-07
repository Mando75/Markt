<template lang="html">
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h1>View Contact</h1>
        <div class="alert alert-success alert-dismissible fade show" v-if="success">
          Contact successfully saved!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="success = !success">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="user-list user-list--view">
          <div class="project-item">
            <div class="project-item-user">
              <div class="user-info">
                <span class="__name">{{firstname}} {{lastname}}</span>
              </div>
            </div>
            <div class="project-item-state">
              <span class="name"><strong>E-mail</strong>: {{emailaddress}}</span>
            </div>
            <div class="project-item-date">
              <span class="date"><strong>Phone number</strong>: {{phonenumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../../../../../../Downloads/vue-register-login-contact-list-master/vue-register-login-contact-list-master/src/firebaseInit'
export default {
  name: 'view-contact',
  data() {
    return {
      firstname: null,
      lastname: null,
      emailaddress: null,
      phonenumber: null,
      success: (this.$route.params.success)
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection('contacts').where('slug', '==', to.params.person).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        next(vm => {
          vm.firstname = doc.data().firstname
          vm.lastname = doc.data().lastname
          vm.emailaddress = doc.data().emailaddress
          vm.phonenumber = doc.data().phonenumber
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('contacts').where('slug', '==', this.$route.params.person).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          this.firstname = doc.data().firstname
          this.lastname = doc.data().lastname
          this.emailaddress = doc.data().emailaddress
          this.phonenumber = doc.data().phonenumber
          this.success = this.$route.params.success
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .__name {
    font-size: 30px;
  }
</style>
