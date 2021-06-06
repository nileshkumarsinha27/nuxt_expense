<template>
  <div class="container">
    <div class="content-section">
      <transition name="fade">
        <div v-if="show" class="app-description-container">
          <div class="app-icon-container">
            <AppIcon class="app-icon" />
          </div>
          <p class="app-title">{{ appName }}</p>
          <!-- <p class="app-description">{{ appDescription }}</p> -->
          <LoginForm v-if="showLogin" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import firebase from 'firebase';
import AppIcon from '../components/logos/AppIcon.vue';
import Button from '../components/button/Button.vue';
import LoginForm from '../components/login-form/LoginForm.vue';
export default Vue.extend({
  layout: 'login',
  components: {
    AppIcon,
    LoginForm,
  },
  data: () => ({
    appName: 'Expense Tracker',
    show: false,
    appDescription:
      'Simple expense tracker application that helps to keep track of expenses and help to properly analyse your expense by diving into different categories.',
    showLogin: true,
  }),
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 50);
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this['auth/SET_LOGGED_IN_USER']({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL || '',
        });
        this.$router.push('/dashboard');
      }
    });
  },
  methods: {
    ...mapActions(['auth/SET_LOGGED_IN_USER']),
  },
});
</script>
<style lang="scss" scoped>
.content-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: url('https://idfi.ge/public/upload/Meri/Business-Expenses.jpg')
    no-repeat;
  background-size: cover;
  .app-description-container {
    background: $white;
    box-shadow: 0 0 31px 0 $box-shadow1;
    width: 22%;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    .app-icon-container {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: $white;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -15px;
      left: calc(50% - 15px);
      .app-icon {
        width: 20px;
        height: 20px;
      }
    }
    .app-title {
      font-size: 2rem;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .app-description {
      width: 100%;
      font-size: 1.15rem;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 767px) {
  .content-section {
    .app-description-container {
      width: 80%;
    }
  }
}
</style>
