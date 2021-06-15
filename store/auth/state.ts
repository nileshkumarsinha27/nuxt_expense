export type User = {
  name?: string;
  email: string;
  photo?: string;
  monthlyIncome: string;
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
  },
});

export const getters = {
  getLoggedInUser: (state: Auth) => state.user,
};
