<template>
  <NuxtLink :to="href" v-if="checkHref()" :class="getClassName('anchor-tag')">{{
    value
  }}</NuxtLink>
  <button :class="getClassName()" v-else @click="clickHandle">
    {{ value }}
  </button>
</template>
<script lang="ts">
import Vue from 'vue';
import cx from 'classnames';
interface ButtonProps {
  customClass?: string;
  handleClick?: () => void;
  href?: string;
  buttonType?: string;
  value?: string;
  isDisabled?: boolean;
}
export default Vue.extend({
  name: 'Button',
  props: {
    customClass: {
      type: String,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
    href: {
      type: String,
    },
    buttonType: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClassName(): string {
      const { customClass, isDisabled, buttonType } = this as ButtonProps;
      return cx(['button', buttonType, customClass, { disabled: isDisabled }]);
    },
    checkHref(): boolean {
      const { href } = this as ButtonProps;
      return href && href !== '' ? true : false;
    },
    clickHandle(): void {
      (this as ButtonProps).handleClick?.();
    },
  },
});
</script>
<style lang="scss" scoped>
.button {
  box-sizing: border-box;
  width: 150px;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  color: $white;
  border: none;
  &.primary {
    background: $blue;
    border: 1px solid $blue;
    &:hover {
      background: $white;
      color: $blue;
    }
  }
  &.secondary {
    background: $green;
    border: 1px solid $green;
    &:hover {
      background: $white;
      color: $green;
    }
  }
  &.error {
    background: $red;
    border: 1px solid $red;
    &:hover {
      background: $white;
      color: $red;
    }
  }
  &.disabled {
    pointer-events: none;
    background: $grey;
    color: $white;
    border: none;
  }
}
</style>
