<template>
  <div id="app">
    <article class="page">
      <main id="main">
        <template v-if="pageData">
          <ProjectDetail :project="pageData" />
        </template>
      </main>
    </article>
  </div>
</template>

<script setup>
  const route = useRoute();
  const router = useRouter();
  let slug = route.path.replaceAll("/", "");
  const pageData = ref(null);
  const query = groq`
    *[_type == "project" && slug.current == "${slug}"] {
      title,
      tech,
      description,
      gallery,
      video,
      website,
      portrait
    }`;
  const { data } = await useSanityQuery(query, { topic: "project" });
  pageData.value = JSON.parse(JSON.stringify(data.value))[0];
  if (!pageData.value) router.push({ path: "/" });
</script>
