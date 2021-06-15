<template>
  <div class="dashboard-container">
    <DonoughtWidget
      :cardTitle="cardTitle"
      :cardValue="cardValue"
      :chartLabels="chartLabels"
      :chartData="chartData"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DonoughtWidget from '../components/donought-widget/DonoughtWidget.vue';
export default Vue.extend({
  components: {
    DonoughtWidget,
  },
  data: () => ({
    cardTitle: 'Total Income',
    cardValue: 'Rs.45,250',
    chartLabels: ['Total Income'],
    chartData: [
      {
        data: [45250],
        backgroundColor: '#7afc99',
      },
    ],
  }),
  head: () => ({
    title: 'Expense | Dashboard',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Dashboard for tracking expenses',
      },
    ],
  }),
});
</script>
<style lang="scss" scoped>
.dashboard-container {
  margin: 0 0 0 20%;
  padding: 80px 0 0;
}
</style>
