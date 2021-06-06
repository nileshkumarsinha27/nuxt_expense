<template>
  <div class="user-detail-container">
    <div class="user-icon" v-if="!photo">
      <span>
        {{ getIconValue }}
      </span>
    </div>
    <div class="user-pic" v-else>
      <img :src="photo" alt="profile" />
    </div>
    <span class="user">{{ userName || userEmail }}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    userName: {
      type: String,
      default: '',
    },
    userEmail: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
  },
  computed: {
    getIconValue() {
      return (this.userName || this.userEmail).charAt(0).toUpperCase();
    },
  },
});
</script>
<style lang="scss" scoped>
.user-detail-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 80px;
  .user-icon {
    height: 50px;
    width: 50px;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $black1;
    border: 2px solid $grey2;
    font-weight: bolder;
  }
  .user-pic {
    height: 50px;
    width: 50px;
    img {
      display: inline-block;
      height: inherit;
      width: inherit;
      border-radius: 50%;
    }
  }
  .user {
    padding: 0 10px;
    box-sizing: border-box;
    color: $grey7;
    font-size: 14px;
    font-weight: bold;
  }
  .caret-container {
    position: relative;
    .caret-icon {
      cursor: pointer;
    }
  }
}
</style>
