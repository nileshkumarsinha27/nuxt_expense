<template>
  <div class="dashboard-container">
    <div class="donought-section" v-if="this.user.monthlyIncome > 0">
      <DonoughtWidget
        :cardTitle="monthlyIncomeDonaught.cardTitle"
        :cardValue="monthlyIncomeDonaught.cardValue"
        :chartLabels="monthlyIncomeDonaught.chartLabels"
        :chartData="monthlyIncomeDonaught.chartData"
        v-if="monthlyIncomeDonaught.chartData.length > 0"
        :customClass="donoughtContainerClass"
      />
      <DonoughtWidget
        :cardTitle="monthlyExpenseDonought.cardTitle"
        :cardValue="monthlyExpenseDonought.cardValue"
        :chartLabels="monthlyExpenseDonought.chartLabels"
        :chartData="monthlyExpenseDonought.chartData"
        v-if="monthlyExpenseDonought.chartData.length > 0 && hasExpenseRecord"
        :customClass="donoughtContainerClass"
      />
      <DonoughtWidget
        :cardTitle="categoryExpenseDonought.cardTitle"
        :cardValue="categoryExpenseDonought.cardValue"
        :chartLabels="categoryExpenseDonought.chartLabels"
        :chartData="categoryExpenseDonought.chartData"
        v-if="categoryExpenseDonought.chartData.length > 0 && hasExpenseRecord"
        :customClass="donoughtContainerClass"
      />
      <div class="expense-record-container">
        <p class="expense-record-text">{{expenseRecordTitle}}</p>
        <TableView :headers="tableHeaders" :data="expenseList" />
      </div>
    </div>
    <div class="donought-section no-income-section" v-else>
      <div class="no-income-container">
        <p class="user-info-section">
          <span>Hi</span>
          <strong>{{ userInfo }}</strong>
        </p>
        <p class="no-income-description">{{ noIncomeDescription }}</p>
        <nuxtLink class="no-income-link" to="/add-expense">
          {{
          startRecordingText
          }}
        </nuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DonoughtWidget from '../components/donought-widget/DonoughtWidget.vue';
import TableView from '~/components/table-view/TableView.vue';
import { mapGetters } from 'vuex';
const randomColor = require('randomcolor');
import {
  currencyFormatter,
  getTotalExpense,
  getCategoryWiseExpense,
} from '~/middleware/number';
import { groupBy, isDataExists } from '~/middleware/array';
export default Vue.extend({
  components: {
    DonoughtWidget,
  },
  data: () => ({
    donoughtContainerClass: 'donought-container',
    noIncomeDescription: 'You don not have any income or expenditure record.',
    startRecordingText: 'Start Recording',
    tableHeaders: {
      description: 'description',
      value: 'value',
      category: 'category',
      date: 'date',
    },
    expenseRecordTitle: 'Your Expenses',
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
  computed: {
    ...mapGetters({
      user: 'auth/getLoggedInUser',
    }),
    hasExpenseRecord() {
      return isDataExists(this.user.expenseData);
    },
    userInfo() {
      return this.user.name || this.user.email;
    },
    monthlyIncomeDonaught() {
      return {
        cardTitle: 'Monthly Income',
        cardValue: currencyFormatter(this.user.monthlyIncome || 0),
        chartLabels: ['Monthly Income'],
        chartData: [
          {
            data: [this.user.monthlyIncome],
            backgroundColor: '#7afc99',
          },
        ],
      };
    },
    monthlyExpenseDonought() {
      return {
        cardTitle: 'Expenses',
        cardValue: currencyFormatter(getTotalExpense(this.user.expenseData)),
        chartLabels: ['Total Income', 'Expenses'],
        chartData: [
          {
            data: [
              this.user.monthlyIncome,
              getTotalExpense(this.user.expenseData),
            ],
            backgroundColor: ['#b9bec9', '#981815'],
          },
        ],
      };
    },
    categoryExpenseDonought() {
      return {
        cardTitle: 'Expense Categories',
        chartLabels: [
          ...Object.keys(groupBy(this.user.expenseData, 'category')),
        ],
        chartData: [
          {
            data: [...getCategoryWiseExpense(this.user.expenseData)],
            backgroundColor: [
              ...Object.keys(groupBy(this.user.expenseData, 'category')).map(
                () => randomColor()
              ),
            ],
          },
        ],
      };
    },
    expenseList() {
      return this.user.expenseData;
    },
  },
});
</script>
<style lang="scss">
.dashboard-container {
  padding: 80px 0 0 20%;
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  .donought-container {
    margin: 20px;
  }
  .donought-section {
    display: flex;
    flex-wrap: wrap;
    height: inherit;
    width: 100%;
    justify-content: center;
    &.no-income-section {
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 80px);
    }
    .no-income-container {
      background: $white;
      box-shadow: 0 0 31px 0 $box-shadow1;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      min-height: 250px;
      .user-info-section {
        padding: 10px 0;
      }
      .no-income-link {
        box-sizing: border-box;
        width: 150px;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        outline: none;
        color: $white;
        background: $blue;
        text-align: center;
        margin: 10px 0;
        border: 1px solid $blue;
        &:hover {
          background: $white;
          color: $blue;
        }
      }
    }
  }
  .expense-record-container {
    background: $white;
    box-shadow: 0 0 31px 0 $box-shadow1;
    border-radius: 5px;
    width: 900px;
    margin: 0 auto;
    table {
      overflow: auto;
      thead {
        background: $white;
      }
      tbody {
        overflow-y: auto;
        max-height: 400px;
      }
    }
    .expense-record-text {
      font-weight: bold;
      padding: 20px 20px 0;
    }
  }
}
</style>
