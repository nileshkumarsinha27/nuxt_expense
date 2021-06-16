<template>
  <div class="add-expense-form-container">
    <div class="add-expense-description-section">
      <p class="add-expense-description">{{ addExpenseDescription }}</p>
    </div>
    <div class="expense-form-container">
      <p class="add-expense-title">{{ addExpenseTitle }}</p>
      <form
        class="add-expense-form"
        @submit="handleFormSubmit"
        autocomplete="off"
      >
        <InputBox
          v-for="(
            { name, placeholder, type, defaultValue, isClear }, key
          ) in expenseFormConfiguration"
          :key="key"
          :typeSent="type"
          :placeholder="placeholder"
          :inputName="name"
          :handleChange="handleInputChange"
          :inputClass="inputClass"
          :defaultValue="defaultValue"
          :isClear="isClear"
        />
        <select class="expense-select-box" v-model="expenseCategorySelected">
          <option
            v-for="{ label, id } in expenseCategories"
            :key="id"
            :disabled="!id"
            :value="label"
          >
            {{ label }}
          </option>
        </select>
      </form>
      <div class="update-btn-section">
        <Button
          v-for="({ text, type, clickHandler }, key) in buttonConfig"
          :value="text"
          :key="key"
          :buttonType="type"
          :isDisabled="!isUpdateIncomeButtonDisabled && text === 'Add'"
          :customClass="updateButtonClass"
          :handleClick="() => handleUpdateBtnClick(text)"
        />
      </div>
    </div>
    <Toast
      v-if="showToast"
      :toastMessage="toastMsg"
      :closeToast="
        () => {
          handleOpenCloseToast(false);
        }
      "
      :toastType="toastType"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputBox from '~/components/input-box/InputBox.vue';
import Button from '~/components/button/Button.vue';
import Toast from '~/components/toast/Toast.vue';
import { updateUserData, getUser } from '~/middleware/database';
import { mapGetters } from 'vuex';
import { getTotalExpense } from '~/middleware/number';
type FormInputValueType = {
  value: string;
  description: string;
};
export default Vue.extend({
  data: () => ({
    addExpenseTitle: 'Add  your expense',
    addExpenseDescription:
      'Add your every expense and organise your expenses into categories.',
    updateButtonClass: 'update-btn',
    expenseFormConfiguration: [
      {
        name: 'value',
        placeholder: 'Value',
        type: 'text',
        defaultValue: '',
        isClear: false,
      },
      {
        name: 'description',
        placeholder: 'Description',
        type: 'text',
        defaultValue: '',
        isClear: false,
      },
    ],
    inputClass: 'update-input-field',
    buttonConfig: [
      {
        text: 'Add',
        type: 'primary',
      },
      {
        text: 'Clear',
        type: 'error',
      },
    ],
    formInputValues: {
      value: '',
      description: '',
    },
    expenseCategories: [
      {
        label: 'Select a category',
        id: 0,
      },
      {
        label: 'Fixed',
        id: 1,
      },
      {
        label: 'Travel',
        id: 2,
      },
      {
        label: 'Food',
        id: 3,
      },
      {
        label: 'Miscellaneous‌',
        id: 4,
      },
    ],
    expenseCategorySelected: 'Select a category',
    successText: 'Expense Updated Successfully',
    failureText: 'Total Expense more than monthly income',
    showToast: false,
    toastMsg: '',
    toastType: '',
  }),
  methods: {
    handleFormSubmit(event: Event) {
      event.preventDefault();
    },
    handleInputChange(inputVal: string, inputName: keyof FormInputValueType) {
      if (
        this.expenseFormConfiguration.every(
          (formElement) => formElement.isClear
        )
      ) {
        this.expenseFormConfiguration.forEach((formElement) => {
          formElement.isClear = false;
        });
      }
      this.formInputValues[inputName] = inputVal;
    },
    clearForm() {
      this.expenseFormConfiguration.forEach((formElement) => {
        formElement.isClear = true;
      });
      Object.keys(this.formInputValues).forEach((formKey) => {
        this.formInputValues[formKey as keyof FormInputValueType] = '';
      });
      this.expenseCategorySelected = 'Select a category';
    },
    handleExpenseUpdate() {
      if (
        getTotalExpense(this.user.expenseData) +
          Number(this.formInputValues.value) <
        Number(this.user.monthlyIncome)
      ) {
        const { uid } = getUser() || {};
        updateUserData(
          uid,
          {
            monthlyIncome: this.user.monthlyIncome,
            expenseData: [
              ...(this.user.expenseData || []),
              {
                value: this.formInputValues.value,
                description: this.formInputValues.description,
                category: this.expenseCategorySelected,
                date: new Date(),
              },
            ],
          },
          () => (this as any).handleOpenCloseToast?.(true, this.successText)
        );
      } else {
        (this as any).handleOpenCloseToast?.(true, this.failureText, 'error');
      }
      (this as any).clearForm?.();
    },
    handleUpdateBtnClick(text: string) {
      switch (text) {
        case 'Add':
          (this as any).handleExpenseUpdate?.();
          break;
        case 'Clear':
          (this as any).clearForm?.();
          break;
        default:
          break;
      }
    },
    handleOpenCloseToast(toastStatus: boolean, text = '', type = 'success') {
      this.showToast = toastStatus;
      this.toastMsg = text;
      this.toastType = type;
      if (text === '') {
        this.toastType = '';
      }
    },
  },
  components: {
    InputBox,
    Button,
    Toast,
  },
  computed: {
    ...mapGetters({
      user: 'auth/getLoggedInUser',
    }),
    isUpdateIncomeButtonDisabled() {
      return (
        Object.values(this.formInputValues).every(
          (formValue: string) => formValue
        ) &&
        !isNaN(Number(this.formInputValues.value)) &&
        this.expenseCategorySelected !== 'Select a category' &&
        Number(this.user.monthlyIncome) > getTotalExpense(this.user.expenseData)
      );
    },
  },
});
</script>

<style lang="scss">
.add-expense-form-container {
  background: $white;
  box-shadow: 0 0 31px 0 $box-shadow1;
  display: flex;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 20px auto;
  width: 85%;
  .add-expense-description-section {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 1.1rem;
    line-height: 18px;
  }
  .add-expense-title {
    font-weight: bold;
    padding: 0 0 10px;
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
.add-expense-form {
  .update-input-field {
    margin: 0 0 10px;
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
  .expense-select-box {
    margin: 0 0 10px;
    border: none;
    border-bottom: 1px solid $black1;
    width: 80%;
    padding: 10px;
    outline: none;
    font-size: 1rem;
  }
}
</style>
