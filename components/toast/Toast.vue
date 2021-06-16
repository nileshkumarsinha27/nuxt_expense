<template>
  <div :class="getToastClass()" @animationend="closeToast">
    <span>{{ toastMessage }}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import cx from 'classnames';
export default Vue.extend({
  name: 'Toast',
  props: {
    toastMessage: {
      type: String,
      default: '',
    },
    closeToast: {
      type: Function,
      default: () => {},
    },
    toastType: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    getToastClass(): string {
      return cx(['toast-container', this.toastType, this.customClass]);
    },
  },
});
</script>
<style lang="scss" scoped>
.toast-container {
  position: fixed;
  right: 5px;
  top: 80px;
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  background: $blue;
  display: flex;
  color: $white;
  border-radius: 5px;
  align-items: center;
  font-weight: bold;
  animation: toastAnimation 4s ease;
  span {
    padding: 0 5px;
  }
  &.error {
    background: $red;
  }
}
</style>