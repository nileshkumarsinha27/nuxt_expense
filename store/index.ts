import Vuex from 'vuex';
import authStore from './auth';
const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        ...authStore,
      },
    },
  });
};
export default createStore;
