<template>
  <div class="layout-container">
    <Header />
    <SideNav />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { mapActions } from 'vuex';
import Header from '~/components/header/Header.vue';
import SideNav from '~/components/side-nav/SideNav.vue';
export default Vue.extend({
  components: {
    Header,
    SideNav,
  },
  methods: {
    ...mapActions(['auth/SET_LOGGED_IN_USER']),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this['auth/SET_LOGGED_IN_USER']({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL || '',
          uid: user.uid,
        });
      } else if (user && !user.emailVerified) {
        this.$router.push('/verify-email');
      }
    });
  },
});
</script>
<style lang="scss">
body {
  background: $grey3 !important;
}
</style>
