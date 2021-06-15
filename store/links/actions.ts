import { actionTypes } from './actions.type';
import { mutationTypes } from './mutations.type';
import { AppLinks } from './state';

const setLoggedInUser = ({ commit }: any, payload: AppLinks) => {
  commit(mutationTypes.SET_ACTIVE_ROUTE_MUTATION, payload);
};

const actions = {
  [actionTypes.SET_ACTIVE_ROUTE]: setLoggedInUser,
};

export default actions;
