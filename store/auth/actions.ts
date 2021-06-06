import { User } from './state';
import { actionTypes } from './actions.type';
import { mutationTypes } from './mutations.type';

const setLoggedInUser = ({ commit }: any, user: User) => {
  commit(mutationTypes.SET_LOGGED_IN_USER_MUTATION, user);
};

const actions = {
  [actionTypes.SET_LOGGED_IN_USER]: setLoggedInUser,
};

export default actions;
