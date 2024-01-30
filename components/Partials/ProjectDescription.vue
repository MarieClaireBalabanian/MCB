<template>
  <div class="project-description">
    <div class="body">
      <div class="mb-80" v-if="project.description">
        <div class="paragraph mb-40">
          <SanityContent :blocks="project.description" />
        </div>
        <a
          :href="project.website"
          target="_blank"
          rel="noopener noreferrer"
          class="website paragraph-small button button-black"
          v-if="project.website"
          >Visit the Site</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: Object,
});
</script>


<style lang="scss">
.body {
  max-width: 65rem;
}
</style>
