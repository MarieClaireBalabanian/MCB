import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projectsData: null,
  }),

  getters: {
    getProjectBySlug(state) {
      return (slug) => state.projectsData.find((project) => project.slug === slug)
    },
  },

  actions: {
    setProjectsData(data) {
      this.projectsData = data;
    },
  },
});