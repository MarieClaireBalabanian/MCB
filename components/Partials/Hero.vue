<template>
  <section class="project-header">
    <h2 class="h2-large mb-20" id="modal-title">
      {{ project.title }}
    </h2>
    <PartialsTech :skills="project.tech" class="black" />
  </section>
</template>


<script setup>
const props = defineProps({
  project: Object,
});
</script>


<style lang="scss">
.project-header {
  padding: 40px 0;

  .tech {
    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
      padding: 70px 0;
  }
}
</style>