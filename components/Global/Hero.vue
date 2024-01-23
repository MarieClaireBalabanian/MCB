<template>
  <section class="hero-interior">
    <div class="image-wrapper">
      <GlobalImage
        isEager
        size="dekstop-large"
        v-if="project.thumbnail?.image"
        :gImage="project.thumbnail.image"
        class="bg background-cover"
      />
      <h2 class="h2-large container text-white" id="modal-title">
        {{ project.title }}
      </h2>
    </div>
  </section>
</template>


<script setup>
const props = defineProps({
  project: Object,
});
</script>


<style lang="scss">
.hero-interior {
  padding: 80px 0;
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  .global-image {
    @extend .absolute-cover;
    filter: sepia(50%) brightness(40%);
  }

  h2 {
    position: relative;
    z-index: 2;
  }
}
</style>