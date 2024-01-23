<template>
  <div id="app">
    <article class="page">
      <main id="main">
        <!-- <GlobalStream v-if="pageData?.pageBuilder" :sections="pageData.pageBuilder" /> -->
      </main>
    </article>
  </div>
</template>

<script setup>
const query = groq`*[_type == "component_page && _slugFieldName.current == ${route.path}"]`
const sanity = useSanity();
const { data } = await useAsyncData("pages", () => sanity.fetch(query));
const pageData = data?.value[0];
</script>

<style lang="scss">
</style>