export type User = {
  name?: string;
  email: string;
  photo?: string;
};
export type Auth = {
  user: User;
};
export const state = (): Auth => ({
  user: {
    name: '',
    email: '',
    photo: '',
  },
});

export const getters = {
  getLoggedInUser: (state: Auth) => state.user,
};
