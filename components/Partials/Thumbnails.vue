<template>
  <section class="thumbnails" ref="blockRef">
      <div class="video-container mb-20" v-if="project.video">
        <SanityFile :asset-id="project.video.asset._ref">
          <template #default="{ src }">
            <video playsinline muted loop controls>
              <source :src="src" type="video/mp4" />
            </video>
          </template>
        </SanityFile>
        <p class="paragraph-small">Short snippet of the presentation</p>
      </div>

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
            isEager
          />
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

const { project } = toRefs(props)
const blockRef = ref(null);

</script>


<style lang="scss">
.thumbnails {

  img {
    width: 100%;
    object-fit: contain;
    object-position: center;

  }

  .global-image {
            box-shadow: 0 0 2px 2px rgba($black, 0.2);

overflow: visible;
  }

  .full {
    grid-column: 1 / -1;
  }
  video {
    width: 100%;
  }
}
</style>
