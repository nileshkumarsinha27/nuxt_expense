export type AppLinks = {
  activeRoute: string;
};
export const state = (): AppLinks => ({
  activeRoute: '',
});

export const getters = {
  getActiveRoute: (state: AppLinks) => state.activeRoute,
};
