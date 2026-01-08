<template>
  <div class="project-description">
    <div class="body">
      <div v-if="project.description">
        <div class="paragraph mb-40">
          <SanityContent :blocks="project.description" />
        </div>
        <a v-if="project.website"
          :href="project.website"
          target="_blank"
          rel="noopener noreferrer"
          class="website"
          :aria-label="`Visit the website for ${project.title}`"
          >Visit the Website</a
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
  .project-description {
    .website {
      background-color: $redpink-dark;
      color: $white;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      transition: background-color 0.3s ease;
      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }
</style>
