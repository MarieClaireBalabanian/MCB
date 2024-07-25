<template>
  <section
    v-if="block.blurbs"
    class="block-padding">
    <GlobalImage
      class="background-cover absolute-cover"
      load="lazy"
      :size="1000"
      :gImage="block.Image.image" />

    <div class="container">
      <PartialsTitle
        :title="block.title"
        class="text-black mb-120" />
      <div class="copy-container">
        <div
          class="copy"
          v-for="(blurb, index) in block.blurbs"
          :key="`copy-${index}`"
          ref="slidesRef">
          <div class="paragraph">
            <SanityContent :blocks="blurb.copy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    block: Object,
    required: true,
  });

  const currentIndex = ref(0);
  const observer = ref(null);
  const slidesRef = ref([]);
  const blockRef = ref(null);

  const initObserver = () => {
    const options = { threshold: 0.6 };
    let obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("showing");
        } else {
        }
      }, options);
    });

    slidesRef.value.forEach((el) => {
      obs.observe(el);
    });
    observer.value = obs;
  };

  onMounted(() => {
    if (process.client) initObserver();
  });
</script>

<style lang="scss">
  .block-about {
    position: relative;
    background: rgba($white, 0.9);
    color: $black;
    transform: translate3d(0, 0, 0); // for safari support mix blend mode

    .copy {
      transition:
        transform 0.6s ease,
        opacity 0.9s ease;
      &:nth-child(even) {
        margin-left: auto;
        margin-top: 40px;
      }
      @media (min-width: 768px) {
        max-width: 42rem;

        &:nth-child(even) {
          margin-top: 80px;
        }
      }

      &:not(.showing) {
        opacity: 0;
        transform: translate3d(0, 60px, 0);
      }
      &.showing {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    .global-image {
      mix-blend-mode: screen;
      img {
        filter: grayscale(100%);
        object-position: 40% top !important;
      }
    }
  }
</style>
