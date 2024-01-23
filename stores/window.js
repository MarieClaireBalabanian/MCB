import { defineStore } from 'pinia';

export const useWindowStore = defineStore('window', {
  state: () => ({
    scrollTop: 0,
    isDesktop: null,
    windowHeight: 0,
  }),

  actions: {},
});
