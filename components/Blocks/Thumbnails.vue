<template>
  <section class="block-thumbnails bg-black block-padding" ref="blockRef">
    <div class="container">
      <ul class="grid grid-2" aria-label="More media from the project">
        <li
          class="mb-20"
          v-for="(image, index) in project.gallery.images"
          :key="`modal-${index}`"
          :class="{ full: !image.portrait }"
        >
          <GlobalImage
            :gImage="image"
            size="desktop-large"
          />
        </li>
      </ul>
    </div>
      
  </section>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
  },
});

const { project } = toRefs(props)
const blockRef = ref(null);

</script>


<style lang="scss">
.block-thumbnails {
  background: $black;

  .container {
    max-width: 850px;
  }
  img {
    width: 100%;
    object-fit: contain;
    object-position: center;
  }

  .global-image {
    box-shadow: 0 0 2px 2px rgba($white, 0.1);
  }

  .full {
    grid-column: 1 / -1;
  }

  @media (min-width: 768px) {
    padding: 100px 0;
  }
}
</style>
