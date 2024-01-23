import { defineStore } from 'pinia';

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pageData: null,
  }),

  getters: {
    getPageData({ pageData }) {
      if (pageData !== null) {
        return pageData;
      }
    },
  },

  actions: {
    async fetchPageData() {
      try {
        const query = groq`*[_type == "component_page"]`
        const sanity = useSanity()
        const { data } = await useAsyncData('pages', () => sanity.fetch(query))
        this.pageData = data.value;
      } catch (e) {
        console.log('Fetch page Error: ', e);
      }
    },
  },
});