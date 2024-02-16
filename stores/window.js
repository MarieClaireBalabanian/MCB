import { defineStore } from 'pinia';

export const useWindowStore = defineStore('window', {
  state: () => ({
    scrollTop: 0,
    isDesktop: null,
    windowHeight: 0,
    windowWidth: 0,
  }),

  actions: {},
});
