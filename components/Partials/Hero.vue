<template>
  <section class="project-header">
    <div class="container">
      <h2 class="h2-large mb-40" id="modal-title">
        {{ project.title }}
      </h2>
      <PartialsTech :skills="project.tech" class="black" />
    </div>
  </section>
</template>


<script setup>
const props = defineProps({
  project: Object,
});
</script>


<style lang="scss">
.project-header {
  padding: 50px 0;
  background: $black;
  color: $white;

  .tech {
    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    padding: 80px 0;
  }
}
</style>