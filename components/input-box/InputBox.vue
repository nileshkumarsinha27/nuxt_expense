<template>
  <fragment>
    <label :for="inputName" :class="getLabelClass()">{{ name }}</label>
    <input
      :type="typeSent"
      :name="name"
      :id="inputName"
      :placeholder="placeholder"
      v-model="inputVal"
      @input="inputHandle"
      :class="getInputClass()"
      :disabled="disabled"
      autocomplete="off"
    />
  </fragment>
</template>
<script lang="ts">
import Vue from 'vue';
import cx from 'classnames';
import { Fragment } from 'vue-fragment';
export default Vue.extend({
  name: 'InputBox',
  components: {
    Fragment,
  },
  data: () => ({
    inputVal: '',
  }),
  props: {
    typeSent: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    handleChange: {
      type: Function,
    },
    placeholder: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    inputName: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    inputHandle(e: KeyboardEvent): void {
      let { inputVal, inputName } = this;
      inputVal = (e.target as HTMLInputElement).value;
      this.handleChange(inputVal, inputName);
    },
    getLabelClass(): string {
      return cx([this.labelClass]);
    },
    getInputClass(): string {
      return cx(['input-component', this.inputClass]);
    },
  },
  watch: {
    isClear(next: string, prev: string): void {
      if (next !== prev && next) {
        this.inputVal = '';
      }
    },
    defaultValue(next: string, prev: string): void {
      if (next !== prev) {
        this.inputVal = next;
      }
    },
  },
  mounted(): void {
    if (this.defaultValue) {
      this.inputVal = this.defaultValue;
    } else {
      this.inputVal = '';
    }
  },
  beforeDestroy(): void {
    this.inputVal = '';
  },
});
</script>
