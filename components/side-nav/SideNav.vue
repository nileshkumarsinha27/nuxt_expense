<template>
  <div class="side-nav-container">
    <div class="app-title-section">
      <AppIcon />
      <span>{{ navTitle }}</span>
    </div>
    <nav v-for="({label,link},index) in sideNavConfiguration" :key="index">
      <NuxtLink :to="link" class="link-item">
        <div class="nav-link-title-section">
          <span>{{label}}</span>
          <div class="nav-bar-icon">
            <div v-if="link==='/dashboard'">
              <DashboardIcon v-if="activeRoute!==link" />
              <DashboardIconActive v-else />
            </div>
            <div v-if="link==='/add-expense'">
              <PlusIcon v-if="activeRoute!==link" />
              <PlusIconActive v-else />
            </div>
          </div>
        </div>
        <div class="caret-icon" v-if="activeRoute===link">
          <CaretActive />
        </div>
        <div class="caret-icon" v-else>
          <CaretLeft />
        </div>
      </NuxtLink>
    </nav>
    <div class="logout-container" @click="logout">
      <span>{{ logoutText }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { mapActions, mapGetters } from 'vuex';
import AppIcon from '../logos/AppIcon.vue';
import DashboardIcon from '../logos/Dashboard.vue';
import DashboardIconActive from '../logos/DashboardActive.vue';
import CaretLeft from '../logos/CaretLeft.vue';
import CaretActive from '../logos/CaretLeftActive.vue';
import PlusIcon from '../logos/PlusIcon.vue';
import PlusIconActive from '../logos/PlusIconActive.vue';
export default Vue.extend({
  data: () => ({
    navTitle: 'Expense Tracker',
    logoutText: 'Logout',
    sideNavConfiguration: [
      {
        label: 'Dashboard',
        link: '/dashboard',
      },
      {
        label: 'Add Expense',
        link: '/add-expense',
      },
    ],
  }),
  components: {
    AppIcon,
    DashboardIcon,
    DashboardIconActive,
    CaretLeft,
    CaretActive,
    PlusIcon,
    PlusIconActive,
  },
  methods: {
    ...mapActions(['links/SET_ACTIVE_ROUTE']),
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
  computed: {
    ...mapGetters({
      activeRoute: 'links/getActiveRoute',
    }),
  },
  mounted() {
    this['links/SET_ACTIVE_ROUTE']({
      activeRoute: this.$router.currentRoute.path,
      appTitle: this.$router.currentRoute.name,
    });
  },
  watch: {
    $route(to, from) {
      this['links/SET_ACTIVE_ROUTE']({
        activeRoute: to.path,
        appTitle: to.name,
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
  .link-item {
    width: 100%;
    padding: 0 0 0 20px;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem auto;
    color: $grey2;
    font-weight: bold;
    .nav-link-title-section {
      display: flex;
      align-items: center;
    }
    .nav-bar-icon {
      padding: 0 0 0 5px;
    }
    .caret-icon {
      margin: 0 0 0 25px;
      justify-self: flex-end;
    }
    &.nuxt-link-active {
      color: $blue;
    }
  }
}
</style>
