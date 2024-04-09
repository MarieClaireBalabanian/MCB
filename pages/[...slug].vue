<template>
  <div id="app">
    <article class="page">
      <main id="main">
        <template v-if="pageData">
          <GlobalStream v-if="type === 'component_page' && pageData?.pageBuilder" :sections="pageData.pageBuilder" />
          <ProjectDetail v-if="type === 'project'" :project="pageData" />
        </template>
      </main>
    </article>
  </div>
</template>

<script setup>
const home = 'marie-claire-balabanian-portfolio';
const route = useRoute()
let slug = route.path.replaceAll('/', '');
let type;


// bit inflexible but there's only a homepage and project detail pages
if (slug === '') {
  type = 'component_page';
  slug = home;
}
else { 
  type = 'project';
}


const pageData = ref(null)
const query = groq`*[_type == "${type}" && slug.current == "${slug}"]`;
if (query) {
  const { data } = await useSanityQuery(query, { topic: `${type}` })
  pageData.value = JSON.parse(JSON.stringify(data.value))[0]
}


</script>
