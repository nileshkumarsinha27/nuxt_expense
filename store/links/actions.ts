import { actionTypes } from './actions.type';
import { mutationTypes } from './mutations.type';

const setLoggedInUser = ({ commit }: any, route: string) => {
  commit(mutationTypes.SET_ACTIVE_ROUTE_MUTATION, route);
};

const actions = {
  [actionTypes.SET_ACTIVE_ROUTE]: setLoggedInUser,
};

export default actions;
