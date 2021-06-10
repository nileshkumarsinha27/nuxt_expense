<template>
  <div class="dashboard-container">
    <DonoughtWidget
      :cardTitle="cardTitle"
      :cardValue="cardValue"
      :chartLabels="chartLabels"
      :chartData="chartData"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { mapActions } from 'vuex';
import DonoughtWidget from '../components/donought-widget/DonoughtWidget.vue';
export default Vue.extend({
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this['auth/SET_LOGGED_IN_USER']({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL || '',
        });
      } else if (user && !user.emailVerified) {
        this.$router.push('/verify-email');
      }
    });
  },
  methods: {
    ...mapActions(['auth/SET_LOGGED_IN_USER']),
  },
  components: {
    DonoughtWidget,
  },
  data: () => ({
    cardTitle: 'Total Income',
    cardValue: 'Rs.45,250',
    chartLabels: ['Total Income'],
    chartData: [
      {
        data: ['45250'],
        backgroundColor: '#7afc99',
      },
    ],
  }),
});
</script>
<style lang="scss" scoped>
.dashboard-container {
  margin: 0 0 0 20%;
  padding: 80px 0 0;
}
</style>
