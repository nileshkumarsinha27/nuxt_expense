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
import { userData } from '~/middleware/database';
import Header from '~/components/header/Header.vue';
import SideNav from '~/components/side-nav/SideNav.vue';
export default Vue.extend({
  components: {
    Header,
    SideNav,
  },
  methods: {
    ...mapActions(['auth/SET_LOGGED_IN_USER']),
    updateStore(user: any) {
      this['auth/SET_LOGGED_IN_USER']({
        monthlyIncome: user.monthlyIncome,
        email: user.email,
        name: user.displayName || user.username,
        photo: user.profile_picture || '',
      });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        userData(user, this.updateStore);
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
