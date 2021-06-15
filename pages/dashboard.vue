<template>
  <div class="dashboard-container">
    <DonoughtWidget
      :cardTitle="monthlyIncomeDonaught.cardTitle"
      :cardValue="monthlyIncomeDonaught.cardValue"
      :chartLabels="monthlyIncomeDonaught.chartLabels"
      :chartData="monthlyIncomeDonaught.chartData"
      v-if="monthlyIncomeDonaught.chartData"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DonoughtWidget from '../components/donought-widget/DonoughtWidget.vue';
import { mapGetters } from 'vuex';
import { currencyFormatter } from '~/middleware/number';
export default Vue.extend({
  components: {
    DonoughtWidget,
  },
  data: () => ({}),
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
  computed: {
    ...mapGetters({
      user: 'auth/getLoggedInUser',
    }),
    monthlyIncomeDonaught() {
      return {
        cardTitle: 'Monthly Income',
        cardValue: currencyFormatter(this.user.monthlyIncome),
        chartLabels: ['Monthly Income'],
        chartData: [
          {
            data: [this.user.monthlyIncome],
            backgroundColor: '#7afc99',
          },
        ],
      };
    },
  },
});
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 80px 0 0 20%;
}
</style>
