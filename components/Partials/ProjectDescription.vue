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

      <div class="video-container mb-80" v-if="project.video">
        <SanityFile :asset-id="project.video.asset._ref">
          <template #default="{ src }">
            <video playsinline muted loop controls>
              <source :src="src" type="video/mp4" />
            </video>
          </template>
        </SanityFile>
        <p class="paragraph-small">Short snippet of the presentation</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: Object,
});
</script>
