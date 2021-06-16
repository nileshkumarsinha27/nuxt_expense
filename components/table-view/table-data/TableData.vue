<template>
  <td v-if="checkIfValue()">{{renderValue(data)}}</td>
  <td v-else-if="checkIfString()">{{ data }}</td>
  <td v-else>{{ renderTime(data) }}</td>
</template>
<script>
import { getTimeFromMoment } from '~/middleware/date';
import {currencyFormatter} from '~/middleware/number';
export default {
  name: 'TableData',
  props: {
    data: {
      required: true,
    },
    headerKey: {
      type: String,
      required: true,
    },
  },
  methods: {
    checkIfValue(){
      return  this.headerKey === 'value';
    },
    checkIfString() {
      return this.displayData === 'string' && !(this.headerKey === 'date');
    },
    renderTime(data) {
      return getTimeFromMoment(data);
    },
    renderValue(data){
      return currencyFormatter(Number(data));
    }
  },
  computed: {
    displayData: function () {
      return typeof this.data;
    },
  },
};
</script>
