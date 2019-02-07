<template lang="html">
  <section class="container">
    <h1>Add contact</h1>
    <div class="user-list">
      <form @submit.prevent="saveContact">
        <div class="row">
          <div class="form-group col-md-6">
            <label class="label">First Name</label>
            <input class="form-control" type="text" placeholder="First Name" v-model="firstname" required>
          </div>
          <div class="form-group col-md-6">
            <label class="label">Last Name</label>
            <input class="form-control" type="text" placeholder="Last Name" v-model="lastname" required>
          </div>
          <div class="form-group col-md-6">
            <label class="label">Email Address</label>
            <input class="form-control" type="email" placeholder="Email Address" v-model="emailaddress" required>
          </div>
          <div class="form-group col-md-6">
            <label class="label">Phone Number</label>
            <the-mask :mask="['(##) ####-####', '(##) #####-####']" class="form-control" placeholder="Phone Number" v-model="phonenumber" required/>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </section>
</template>

<script>
import db from '../../../../../../Downloads/vue-register-login-contact-list-master/vue-register-login-contact-list-master/src/firebaseInit'
export default {
  name: 'new-contact',
  metaInfo: {
    title: 'Add contact',
    titleTemplate: '%s | Compacto Records'
  },
  data() {
    return {
      firstname: null,
      lastname: null,
      emailaddress: null,
      phonenumber: null
    }
  },
  methods: {
    saveContact() {
      const slug = this.generateUUID()

      db.collection('contacts').add({
        firstname: this.firstname,
        lastname: this.lastname,
        emailaddress: this.emailaddress,
        phonenumber: this.phonenumber,
        slug: slug
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        this.$router.push(`/${slug}/success`)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      })
    },
    generateUUID() {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-list {
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.05);
    padding: 23px;
  }
</style>
