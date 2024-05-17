<template>
  <section class="block-padding bottom-line">
    <div class="container">
      <PartialsTitle :title="block.title" class="mb-20"/>
      <ul>
        <!-- using mouseover and mouseleave allows for tapping on mobile to reveal content without navigation.
        :hover alone will not. -->
        <li
          v-for="(project, index) in data"
          :data-id="index"
          :key="`project-${index}`"
          ref="tileRef"
          class="text-center bg-black text-white"
          @mouseover="hovering = index"
          @mouseleave="hovering = null"
          :class="{
            active: hovering === index,
          }"
        >
          <div class="image-wrapper absolute-cover">
            <GlobalImage
              v-if="project.thumbnail?.image"
              :gImage="project.thumbnail.image"
              class="bg background-cover absolute-cover"
              :size="600"
              load="lazy"
            />
            <GlobalImage
              logo
              v-if="project.image"
              :gImage="project.image.image"
              class="logo contain"
              load="lazy"
              :size="600"

            />
          </div>

          <div class="copy">
            <div class="copy-inner">
              <p class="paragraph mb-20" v-if="project.subtitle">
                {{ project.subtitle }}
              </p>

              <div class="actions">
                <!-- nix moal for dedicated detail page -->
                <!-- <GlobalModal :project="project" /> -->
                <NuxtLink class="button" :to="`/${project.slug.current}`" :aria-label="`Learn more about ${project.title}`">Learn More</NuxtLink>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  block: Object,
  required: true
})

// get data
const query = groq`*[_type == "project"] | order(order) {
          _id,
          thumbnail,
          slug,
          image,
          subtitle,
          title
      }`;
const sanity = useSanity();
const { data } = await useAsyncData("projects", () => sanity.fetch(query));

// set data
import { useProjectsStore } from '../stores/projects';
const projectsStore = useProjectsStore()
projectsStore.setProjectsData(data.value)

// hover actions
const hovering = ref(null);

</script>


<style lang="scss">
.block-work {
  background-image: url('/img/tron.png') center/cover no-repeat;

  &.block-padding {
    padding-top: 100px;
  }
  .container {
    position: relative;
    z-index: 4;
  }

  ul {
    li {
      min-height: 200px;
      position: relative;
      padding: 30px;
      overflow: hidden;
      margin-bottom: 10px;
      break-inside: avoid;

      .background-cover img {
        transition: transform 0.8s ease 0.4s, opacity 0.8s ease 0.5s;
        filter: sepia(25%) brightness(30%) hue-rotate(-10deg);
        transform-origin: center;
        mix-blend-mode: multiply;

      }

      .logo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 50px;
        transition: 0.8s ease 1s;
        filter: grayscale(100%) brightness(0) invert(1)
          drop-shadow(0 0 0.7rem $black);
      }

      .copy {
        position: relative;
        z-index: 3;
        height: 100%;
        padding-top: 70px;

        .copy-inner {
          opacity: 0;
          transform: scale(0.9);
          transition: transform 1s ease, opacity 1s ease;
        }
      }

      &.active,
      &:focus-within {
        .copy-inner {
          opacity: 1;
          transform: scale(1);
        }
        .logo {
          transition: 0.4s ease;
          top: 30px;
          transform: translate(-50%, 0);
        }

        .background-cover img {
          opacity: 0;
          transition: 0.5s ease;
        }
      }
    }
  }

  @media (min-width: 768px) {
    &.block-padding {
      padding-top: 200px;
    }
    ul {
      columns: 2;
      column-gap: 10px;
      li {
        min-height: 250px;
      }
    }
  }
}
</style>