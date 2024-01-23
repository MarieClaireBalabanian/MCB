<template>
  <div id="app">
    <article class="page">
      <main id="main">
        <GlobalStream v-if="pageData?.pageBuilder" :sections="pageData.pageBuilder" />
      </main>
    </article>
  </div>
</template>

<script setup>
const home = 'marie-claire-balabanian-portfolio';

const route = useRoute()
let slug = route.params.slug;
if (slug === '') slug = home;

const query = groq`*[_type == "component_page" && slug.current == "${slug}"]`
const sanity = useSanity();
const { data } = await useAsyncData("pages", () => sanity.fetch(query));
const pageData = data?.value[0];


</script>

<style lang="scss">
</style>