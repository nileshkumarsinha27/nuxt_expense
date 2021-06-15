export type AppLinks = {
  activeRoute: string;
  appTitle: string;
};
export const state = (): AppLinks => ({
  activeRoute: '',
  appTitle: '',
});

export const getters = {
  getActiveRoute: (state: AppLinks) => state.activeRoute,
  getAppTitle: (state: AppLinks) => state.appTitle,
};
