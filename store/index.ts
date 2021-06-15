import Vuex from 'vuex';
import authStore from './auth';
import linksStore from './links';
const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        ...authStore,
      },
      links: {
        namespaced: true,
        ...linksStore,
      },
    },
  });
};
export default createStore;
