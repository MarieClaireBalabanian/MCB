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
      portrait
    }`;
  const { data } = await useSanityQuery(query, { topic: "project" });
  const fetchedData = JSON.parse(JSON.stringify(data.value))[0];

  if (fetchedData) {
    fetchedData.aspectRatio = getVideoAspectRatio(fetchedData.video);
  }

  pageData.value = fetchedData;
  if (!pageData.value) router.push({ path: "/" });
</script>
