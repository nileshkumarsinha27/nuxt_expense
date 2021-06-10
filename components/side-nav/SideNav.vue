<template>
  <div class="side-nav-container">
    <div class="app-title-section">
      <AppIcon />
      <span>{{ navTitle }}</span>
    </div>
    <div class="logout-container" @click="logout">
      <span>
        {{ logoutText }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import AppIcon from '../logos/AppIcon.vue';
export default Vue.extend({
  data: () => ({
    navTitle: 'Expense Tracker',
    logoutText: 'Logout',
  }),
  components: {
    AppIcon,
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.side-nav-container {
  width: 20%;
  position: fixed;
  min-height: 100vh;
  background: linear-gradient($grey3, $grey6, $grey5, $grey6);
  padding: 0 20px;
  box-sizing: border-box;
  .app-title-section {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .logout-container {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid $grey2;
    span {
      font-size: 16px;
      font-weight: bold;
      color: $black1;
      cursor: pointer;
    }
  }
}
</style>
