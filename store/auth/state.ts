export type ExpenseData = {
  value: string;
  description: string;
  category: string;
};

export type User = {
  name?: string;
  email: string;
  photo?: string;
  monthlyIncome: string;
  expenseData: ExpenseData[];
};
export type Auth = {
  user: User;
};
export const state = (): Auth => ({
  user: {
    name: '',
    email: '',
    photo: '',
    monthlyIncome: '',
    expenseData: [],
  },
});

export const getters = {
  getLoggedInUser: (state: Auth) => state.user,
};
