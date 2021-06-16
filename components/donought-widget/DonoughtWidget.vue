<template>
  <div :class="getContainerClass()">
    <div class="title-container">
      <p class="card-title">{{ cardTitle }}</p>
      <p class="card-value">{{ cardValue }}</p>
    </div>
    <div class="chart-container">
      <DonoughtChart :chartLabels="chartLabels" :chartData="chartData" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import cx from 'classnames';
import DonoughtChart from '../charts/Doughnaut.vue';
export default Vue.extend({
  components: { DonoughtChart },
  props: {
    cardTitle: {
      type: String,
      default: '',
    },
    cardValue: {
      type: String,
      default: '',
    },
    chartLabels: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    getContainerClass() {
      return cx(['donought-widget-container', this.customClass]);
    },
  },
});
</script>
<style lang="scss">
.donought-widget-container {
  width: 300px;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  box-shadow: 0 0 31px $box-shadow;
  background: $white !important;
  .title-container {
    width: 20%;
    .card-title {
      font-size: 12px;
      color: $grey8;
      font-weight: bold;
    }
    .card-value {
      font-weight: 18px;
      font-weight: bold;
      margin: 10px 0 0;
    }
  }
  .chart-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    #doughnut-chart {
      width: 150px !important;
      height: 150px !important;
    }
  }
}
</style>
