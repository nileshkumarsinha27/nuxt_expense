<template>
  <header class="app-header">
    <div class="app-info">
      <strong class="title-text">{{ title.replace('-',' ') }}</strong>
      <UserDetail
        :userName="loggedInUser.name"
        :userEmail="loggedInUser.email"
        :photo="loggedInUser.photo"
      />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import UserDetail from '../user-detail/UserDetail.vue';
export default Vue.extend({
  computed: {
    ...mapGetters({
      loggedInUser: 'auth/getLoggedInUser',
      title: 'links/getAppTitle',
    }),
  },
  components: {
    UserDetail,
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  width: 80%;
  left: 20%;
  height: 80px;
  position: fixed;
  top: 0;
  background: $grey4;
  .app-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: inherit;
    margin: 0 20px;
    .title-text {
      font-size: 20px;
      font-weight: bold;
      color: $black1;
      margin: 0 20px 0 0;
      text-transform: capitalize;
    }
  }
}
</style>
