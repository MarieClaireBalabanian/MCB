<template>
  <section ref="blockRef" class="block-padding bottom-line">
    <div class="container">
      <h2 class="h2 mb-40">
        {{ block.title }}
      </h2>
      <ul>
        <li
          v-for="(project, index) in data"
          :data-id="index"
          :key="`project-${index}`"
          ref="tileRef"
          class="text-center"
          @mouseover="hovering = index"
          @mouseleave="hovering = null"
          :class="{
            active: hovering === index,
            showing: showing.includes(index),
          }"
          :style="`--bg-color: ${project.theme_color}`"
        >
          <div class="image-wrapper absolute-cover">
            <GlobalImage
              v-if="project.thumbnail?.image"
              :gImage="project.thumbnail.image"
              class="bg background-cover"
              size="desktop-medium"
            />
            <GlobalImage
              logo
              v-if="project.image"
              :gImage="project.image.image"
              class="logo contain"
              size="desktop-small"
            />
          </div>

          <div class="copy">
            <div class="copy-inner">
              <p class="paragraph mb-20" v-if="project.subtitle">
                {{ project.subtitle }}
              </p>

              <div class="actions">
                <GlobalModal :project="project" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const attrs = useAttrs();
const block = attrs.block;

const query = groq`*[_type == "project"] | order(order)`;
const sanity = useSanity();
const { data } = await useAsyncData("projects", () => sanity.fetch(query));

const blockRef = ref(null);
const observer = ref(null);
const tileRef = ref([]);

const hovering = ref(null);
const showing = ref([]);

const initObserver = () => {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let val = parseInt(entry.target.getAttribute("data-id"));
        showing.value.push(val);
      }
    });
  });
  const els = tileRef.value;
  els.forEach((el) => {
    observer.observe(el);
  });

  observer.value = observer;
};

onMounted(() => {
  if (process.client) initObserver();
});
</script>


<style lang="scss">
.block-work {
  background: $black;
  color: $white;
  ul {
    li {
      min-height: 200px;
      position: relative;
      padding: 30px;
      overflow: hidden;
      margin-bottom: 3px;
      break-inside: avoid;

      .global-image {
        &.background-cover {
          @extend .absolute-cover;
        }
      }

      .background-cover img {
        transition: transform 0.8s ease 0.4s, opacity 0.8s ease 0.5s;
        transform: scale(0);
        filter: sepia(40%) brightness(45%);
        opacity: 0;
        transform-origin: center;
      }

      .logo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
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

      &.showing {
        .background-cover img {
          transform: scale(1);
          opacity: 1;
          transition-delay: 0;
        }
        .logo {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
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
            // transform: translate3d(100%, 0, 0) !important;
            transition: 0.5s ease;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    ul {
      columns: 2;
      column-gap: 3px;
      li {
        min-height: 250px;
      }
    }
  }
}
</style>