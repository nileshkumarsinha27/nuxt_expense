export type User = {
  name?: string;
  email: string;
  photo?: string;
  uid: string;
};
export type Auth = {
  user: User;
};
export const state = (): Auth => ({
  user: {
    name: '',
    email: '',
    photo: '',
    uid: '',
  },
});

export const getters = {
  getLoggedInUser: (state: Auth) => state.user,
};
