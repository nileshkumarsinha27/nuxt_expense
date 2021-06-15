<template>
  <main class="add-expense-container">
    <div class="monthly-income-container">
      <p class="app-description">{{appDescription}}</p>
      <div class="monthly-income-section">
        <div v-if="!showUpdateField" key="new_div">
          <p class="monthly-income-title test">{{monthlySalary.title}}</p>
          <p class="monthly-income-value">{{monthlyIncome}}</p>
          <span
            class="update-income-text"
            @click="()=>toggleShowUpdateIncome(true)"
          >{{monthlySalary.updateText}}</span>
        </div>
        <div v-else>
          <p class="monthly-income-title">{{updateMonthlyIncome.title}}</p>
          <InputBox
            :typeSent="updateMonthlyIncome.inputBox.type"
            :placeholder="updateMonthlyIncome.inputBox.placeholder"
            :inputName="updateMonthlyIncome.inputBox.name"
            :handleChange="handleUpdateInputChange"
            :inputClass="inputClass"
            :defaultValue="updateMonthlyIncome.inputBox.defaultValue"
            :isClear="updateMonthlyIncome.inputBox.isClear"
          />
          <div class="update-btn-section">
            <Button
              v-for="({text,type,clickHandler},key) in updateMonthlyIncome.buttonConfig"
              :value="text"
              :key="key"
              :buttonType="type"
              :isDisabled="!isUpdateIncomeButtonDisabled && text==='Update'"
              :customClass="updateButtonClass"
              :handleClick="()=>handleUpdateBtnClick(text)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script >
import Vue from 'vue';
import { currencyFormatter } from '~/middleware/number';
import InputBox from '~/components/input-box/InputBox.vue';
import Button from '~/components/button/Button.vue';
import { updateUserData, getUser } from '~/middleware/database';
import { mapGetters } from 'vuex';
export default Vue.extend({
  head: () => ({
    title: 'Expense | Add Expense',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Dashboard for tracking expenses',
      },
    ],
  }),
  data: () => ({
    monthlySalary: {
      title: 'Your current monthly Income',
      updateText: 'Update your monthly income',
    },
    appDescription:
      'Expense Tracker is a simple expense tracking tool where the user can update monthly expenses.',
    showIncomeUpdate: false,
    updateButtonClass: 'update-btn',
    updateMonthlyIncome: {
      title: 'Update your monthly income',
      inputBox: {
        name: 'monthlyIncome',
        type: 'text',
        placeholder: 'Update Monthly Income',
        defaultValue: '',
        isClear: false,
        inputValue: '',
      },
      buttonConfig: [
        {
          text: 'Update',
          type: 'primary',
        },
        {
          text: 'Cancel',
          type: 'error',
        },
      ],
    },
    inputClass: 'update-input-field',
    show: false,
  }),
  methods: {
    toggleShowUpdateIncome(showState) {
      this.showIncomeUpdate = showState;
    },
    handleUpdateInputChange(inputVal) {
      this.updateMonthlyIncome.inputBox.inputValue = inputVal;
    },
    clearUpdateInputField() {
      this.updateMonthlyIncome.inputBox.inputValue = '';
      this.updateMonthlyIncome.inputBox.isClear = true;
    },
    handleUpdate() {
      const { uid } = getUser() || {};
      updateUserData(uid, {
        monthlyIncome: this.updateMonthlyIncome.inputBox.inputValue,
      });
      this.clearUpdateInputField();
      this.toggleShowUpdateIncome(false);
    },
    handleUpdateBtnClick(text) {
      switch (text) {
        case 'Update':
          this.handleUpdate();
          break;
        case 'Cancel':
          this.clearUpdateInputField();
          this.toggleShowUpdateIncome(false);
          break;
        default:
          break;
      }
    },
  },
  components: {
    InputBox,
    Button,
  },
  computed: {
    ...mapGetters({
      user: 'auth/getLoggedInUser',
    }),
    isUpdateIncomeButtonDisabled() {
      return (
        this.updateMonthlyIncome.inputBox.inputValue.trim().length > 0 &&
        !isNaN(Number(this.updateMonthlyIncome.inputBox.inputValue))
      );
    },
    showUpdateField() {
      return this.showIncomeUpdate;
    },
    monthlyIncome() {
      return currencyFormatter(this.user.monthlyIncome || 0);
    },
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 50);
  },
});
</script>

<style lang="scss">
.add-expense-container {
  padding: 80px 0 0 20%;
  .monthly-income-container {
    background: $white;
    width: 45%;
    margin: 20px auto;
    padding: 20px 0;
    display: flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 0 31px 0 $box-shadow1;
    .app-description {
      width: 50%;
      padding: 20px;
      font-size: 1.1rem;
      line-height: 18px;
    }
    .monthly-income-section {
      width: 50%;
      .monthly-income-title {
        font-weight: bold;
      }
      .monthly-income-value {
        font-size: 2rem;
        color: $blue;
        font-weight: bold;
        margin: 10px 0 0;
      }
      .update-income-text {
        font-size: 12px;
        font-weight: bold;
        text-decoration: underline;
        color: $grey2;
        cursor: pointer;
        margin: 10px 0 0;
        display: block;
        &:hover {
          color: $black1;
        }
      }
    }
    .update-input-field {
      margin: 10px 0;
      border: none;
      border-bottom: 1px solid $black1;
      color: $blue;
      width: 80%;
      padding: 10px;
      outline: none;
      font-size: 1rem;
      &:focus {
        border-bottom: 1px solid $blue;
        &::placeholder {
          color: $blue;
        }
      }
    }
    .update-btn-section {
      display: flex;
      justify-content: space-between;
      width: 80%;
      .update-btn {
        width: 100px;
      }
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
</style>