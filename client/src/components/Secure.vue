<template lang="html">
  <section class="container" id="secure">
    <div class="row">
      <div class="col-12">
        <h1>Contact list</h1>
        <div class="loader-section" v-if="loading">
          <div class="user-list">
            <div class="project-item">
              <div class="project-item-user animated-background__header">
                <div class="user-info"><span class="name"></span></div>
              </div>
              <div class="project-item-state animated-background__sub"><span class="name"></span><span class="description"></span></div>
              <div class="project-item-date animated-background__sub"><span class="date"></span><span class="time description"></span></div>
              <div class="project-item-actions">
                <router-link class="btn btn-sm btn-outline-primary" to="/user">View Contact</router-link>
              </div>
            </div>
            <div class="project-item">
              <div class="project-item-user animated-background__header">
                <div class="user-info"><span class="name"></span></div>
              </div>
              <div class="project-item-state animated-background__sub"><span class="name"></span><span class="description"></span></div>
              <div class="project-item-date animated-background__sub"><span class="date"></span><span class="time description"></span></div>
              <div class="project-item-actions">
                <router-link class="btn btn-sm btn-outline-primary" to="/user">View Contact</router-link>
              </div>
            </div>
            <div class="project-item">
              <div class="project-item-user animated-background__header">
                <div class="user-info"><span class="name"></span></div>
              </div>
              <div class="project-item-state animated-background__sub"><span class="name"></span><span class="description"></span></div>
              <div class="project-item-date animated-background__sub"><span class="date"></span><span class="time description"></span></div>
              <div class="project-item-actions">
                <router-link class="btn btn-sm btn-outline-primary" to="/user">View Contact</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="user-list">
          <transition-group name="fade" tag="div">
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" v-on:input="filter = $event.target.value" placeholder="Filter">
            </div>
            <div class="project-item" v-for="(person, index) in contactsFiltered" :key="index">
              <div class="project-item-user">
                <div class="user-info">
                  <span class="name">{{person.firstname}}</span>
                </div>
              </div>
              <div class="project-item-state">
                <span class="name"><strong>E-mail</strong>: {{person.emailaddress}}</span>
              </div>
              <div class="project-item-date">
                <span class="date"><strong>Phone number</strong>: {{person.phonenumber}}</span>
              </div>
              <div class="project-item-actions">
                <router-link class="btn btn-sm btn-outline-primary" v-bind:to="{ name: 'view-contact', params: { person: person.slug }}">View Contact</router-link>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import db from '../../../../../../Downloads/vue-register-login-contact-list-master/vue-register-login-contact-list-master/src/firebaseInit'
  export default {
    name: 'Secure',
    metaInfo: {
      title: 'Contact list',
      titleTemplate: '%s | Compacto Records'
    },
    data() {
      return {
        contacts: [],
        loading: true,
        filter: ''
      }
    },
    created() {
      db.collection('contacts').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'firstname': doc.data().firstname,
            'lastname': doc.data().lastname,
            'emailaddress': doc.data().emailaddress,
            'phonenumber': doc.data().phonenumber,
            'slug': doc.data().slug
          }
          this.contacts.push(data)
        })
      })
    },
    computed: {
      contactsFiltered() {
        if (this.filter) {
          let exp =  new RegExp(this.filter.trim(), 'i');
          return this.contacts.filter(person => exp.test(person.firstname));
          // return [];
        } else {
          return this.contacts;
        }
      }
    }
  }
</script>

<style lang="scss">
  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }

  .animated-background__header {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    -webkit-background-size: 800px 104px;
    background-size: 800px 104px;
    height: 20px;
    // width: 200px;
    position: relative;
  }

  .animated-background__sub {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    -webkit-background-size: 800px 104px;
    background-size: 800px 104px;
    height: 20px;
    // width: 200px;
    position: relative;
  }

  .project-item {
    align-items: center;
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.05);
    display: flex;
    margin-bottom: .923077rem;
    padding: 23px;
    position: relative;

    .description {
      font-size: .846154rem;
      color: #999;
    }
  }

  @media (max-width: 767.98px) {
    .project-item {
      flex-direction: column;
      align-items: stretch;

      .description {
        font-size: 1rem
      }
    }
  }

  .project-item-user {
    display: flex;
    align-items: center;
    flex: 0 1 33.3%;
    margin-right: 5px;

    .user-info {
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
    }
  }

  @media (max-width: 767.98px) {
    .project-item-user {
      -webkit-box-ordinal-group: 1;
      -webkit-order: 1;
      -ms-flex-order: 1;
      order: 1;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 10px;

      .user-info {
        .name {
          font-size: 1.077rem;
        }
      }
    }
  }

  .project-item-date, .project-item-state {
    margin-right: 5px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
  }

  .project-item-state {
    display: flex;
    flex-direction: column;
    flex: 0 1  33.3%;
  }

  @media (max-width: 767.98px) {
    .project-item-state {
      -webkit-box-ordinal-group: 4;
      -webkit-order: 3;
      -ms-flex-order: 3;
      order: 3;
      margin-bottom: 10px;
    }
  }

  .project-item-date {
    display: flex;
    flex-direction: column;
    flex: 0 1 33.3%;
  }

  @media (max-width: 767.98px) {
    .project-item-date {
      order: 4;
      margin-bottom: 10px;
    }
  }

  .project-item-actions {
    display: flex;
    flex: 0 1 5%;
    justify-content: flex-end;
    margin:0 0 0 20px;

    @media (max-width: 767.98px) {
      justify-content: center;
      margin: 20px 0 0;
      order: 5;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
