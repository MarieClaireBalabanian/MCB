<template>
  <div id="app">
    <article class="page">
      <main id="main">
        <template v-if="pageData">
          <GlobalStream v-if="type === 'pages' && pageData?.pageBuilder" :sections="pageData.pageBuilder" />
          <ProjectDetail v-if="type === 'project'" :project="pageData" />
        </template>

      </main>
    </article>
  </div>
</template>

<script setup>
import { useProjectsStore } from '../stores/projects';
const projectsStore = useProjectsStore()

const home = 'marie-claire-balabanian-portfolio';
const route = useRoute()
let slug = route.path.replaceAll('/', '');
let type;
let query;

if (slug === '') {
  slug = home;
  type = 'pages';
  query = groq`*[_type == "component_page" && slug.current == "${slug}"]`
}
else {
  type = 'project';
  query = groq`*[_type == "project" && slug.current == "${slug}"]`;
}

const sanity = useSanity();
const { data } = await useAsyncData(`${type}`, () => sanity.fetch(query));
const pageData = data?.value[0];

console.log(pageData)
</script>

<style lang="scss">
</style>