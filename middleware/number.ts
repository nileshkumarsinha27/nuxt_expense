import { ExpenseData } from '~/store/auth/state';
import { groupBy, isDataExists } from './array';
export const currencyFormatter = (
  value: number,
  minimumFractionDigits = 0,
  locale = 'en-IN',
  currency = 'INR'
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  });
  return formatter.format(value);
};

export const getTotalExpense = (expenseList: ExpenseData[]) => {
  let totalExpense = 0;
  if (isDataExists(expenseList)) {
    expenseList.forEach(({ value, description }: ExpenseData) => {
      totalExpense += Number(value);
    });
  }
  return totalExpense;
};

export const getCategoryWiseExpense = (expenseList: ExpenseData[]) => {
  const summationList: any = [];
  if (isDataExists(expenseList)) {
    const categoryGroup: Array<any> = groupBy(expenseList, 'category');
    Object.keys(categoryGroup).forEach((category) => {
      let values = categoryGroup[category as any].map(
        (eachExpense: ExpenseData) => Number(eachExpense.value)
      );
      summationList.push(
        values.reduce((acc: number, curr: number) => (acc += curr))
      );
    });
  }
  return summationList;
};
