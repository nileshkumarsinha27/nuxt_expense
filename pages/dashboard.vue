<template>
  <div></div>
</template>
<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { mapActions } from 'vuex';
export default Vue.extend({
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this['auth/SET_LOGGED_IN_USER']({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL || '',
        });
      }
    });
  },
  methods: {
    ...mapActions(['auth/SET_LOGGED_IN_USER']),
  },
});
</script>
