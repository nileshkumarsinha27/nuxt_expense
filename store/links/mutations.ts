import { AppLinks } from './state';
import { mutationTypes } from './mutations.type';

const setLoggedInUserMutation = (state: AppLinks, payload: string) => {
  state.activeRoute = payload;
};

const mutations = {
  [mutationTypes.SET_ACTIVE_ROUTE_MUTATION]: setLoggedInUserMutation,
};

export default mutations;
