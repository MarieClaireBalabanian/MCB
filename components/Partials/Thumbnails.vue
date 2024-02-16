<template>
  <section class="thumbnails" ref="blockRef">
    <div class="video-container mb-40" v-if="project.video">
      <div class="iframe" v-html="project.video"></div>
    </div>
    <ul class="grid grid-2" aria-label="More media from the project">
      <li
        v-for="(image, index) in project.gallery.images"
        :key="`modal-${index}`"
        :class="{ full: !image.portrait }"
      >
        <GlobalImage :gImage="image" size="desktop-large" :isEager="isEager(index)" />
      </li>
    </ul>
  </section>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
  },
});


const { project } = toRefs(props);
const blockRef = ref(null);

const isEager = (index) => {
  return index < 2;
}
</script>


<style lang="scss">
.thumbnails {
  img {
    width: 100%;
    object-fit: contain;
    object-position: center;
  }

  .global-image {
    box-shadow: 0 0 2px 1px rgba($black, 0.2);
    overflow: visible;
  }

  .full {
    grid-column: 1 / -1;
  }
  
  .video-container {
    position: relative;
    height: 0;
    overflow: hidden;
    width: 100%;
    padding-top: 30.08%;
    iframe {
      position: absolute;
      inset: 0 0 0 0;
      height: 100%;
      width: 100%;
      object-fit: contain;
    }

  }
}
</style>
