<template>
    <div id="app">
      <article class="page">
        <main id="main">
          <template v-if="pageData">
            <GlobalStream v-if="pageData?.pageBuilder" :sections="pageData.pageBuilder" />
          </template>
        </main>
      </article>
    </div>
  </template>
  
  <script setup>
    const home = 'marie-claire-balabanian-portfolio';
    const pageData = ref(null)
    const query = groq`*[_type == "component_page" && slug.current == "${home}"]`;
    const { data } = await useSanityQuery(query, { topic: 'page' })
    pageData.value = JSON.parse(JSON.stringify(data.value))[0]
  </script>
  