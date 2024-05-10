<template>
  <section v-if="block.blurbs" class="block-padding">
    <div class="container">
      <PartialsTitle :title="block.title" class="text-stroke stroke-white mb-20" />
      <div class="copy-container" ref="slidesRef">
        <div
          class="copy"
          v-for="(blurb, index) in block.blurbs"
          :key="`copy-${index}`"
      
        >
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
  required: true
})

const observer = ref(null);
const slidesRef = ref([]);

const initObserver = () => {
  const options = { threshold: .6 };
  let obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("showing");
      } else {
      }
    }, options);
  });

  obs.observe(slidesRef.value);
  observer.value = obs;
};

onMounted(() => {
  if (process.client) initObserver();
});
</script>


<style lang="scss">
.block-about {
  position: relative;
  background: $black;

  .copy-container {
    padding: 10px 0 0;
    position: relative;
  }

  .copy {
    width: calc(100% - 20px);
    padding: 25px 20px;
    background: $white;
    &:first-child {
      margin-left: auto;
    }
    &:last-child {
      margin-top: 20px;
    }
  }

  h3 {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    background: linear-gradient(90deg, $black 50%,$teal 0);

    .copy-container {
      display: flex;
      justify-content: space-between;
      padding: 40px 30px;
      &::after {
        position: absolute;
        inset: 0 0 0 0;
        display: block;
        content: '';
        transition: .9s ease;
        background: linear-gradient(90deg, $white 50%,$black 0);
        opacity: 0;
        z-index: 1;
      }

      &.showing {
        &::after {
          opacity: 1;
        }
      }
    }
    .copy {
      width: calc(50% - 20px);
      max-width: 37rem;
      position: relative;
      z-index: 2;
      background: unset;
      transition: transform .6s ease,  opacity .9s ease;

      &:first-child {
        margin: 0;
      }
      &:last-child {
        color: $white;
        margin: 0;
      }
    }
  }
}
</style>