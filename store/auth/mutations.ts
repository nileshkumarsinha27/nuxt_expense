import { Auth, User } from './state';
import { mutationTypes } from './mutations.type';

const setLoggedInUserMutation = (state: Auth, payload: User) => {
  state.user = payload;
};

const mutations = {
  [mutationTypes.SET_LOGGED_IN_USER_MUTATION]: setLoggedInUserMutation,
};

export default mutations;
