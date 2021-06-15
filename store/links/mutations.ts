import { AppLinks } from './state';
import { mutationTypes } from './mutations.type';

const setLoggedInUserMutation = (state: AppLinks, payload: AppLinks) => {
  state.appTitle = payload.appTitle;
  state.activeRoute = payload.activeRoute;
};

const mutations = {
  [mutationTypes.SET_ACTIVE_ROUTE_MUTATION]: setLoggedInUserMutation,
};

export default mutations;
