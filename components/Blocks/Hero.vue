

<template>
  <section ref="blockRef">
    <GlobalImage
      :gImage="block.image.image"
      size="desktop-large"
      class="background-cover"
      isEager
    />

    <div class="container">
      <div class="slides">
        <div
          class="slide"
          v-for="(slide, index) in block.slides"
          :key="`hero-${index}`"
          :class="`slide-${index}`"
        >
          <template v-if="index === 0">
            <p class="h1 heading mb-40" v-html="slide.title"></p>
            <p class="h2-alt heading" v-html="slide.subtitle"></p>
          </template>
          <template v-else>
            <h1 class="h1 heading mb-40" v-html="slide.title"></h1>
            <h2 class="h2-alt heading" v-html="slide.subtitle"></h2>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const attrs = useAttrs();
const block = attrs.block;
// const blockRef = ref(null);
// const observer = ref(null);

// const initObserver = () => {
//   let obs = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("start-play");
//       } else {
//       }
//     });
//   });

//   obs.observe(blockRef.value);
//   observer.value = obs;
// };

// onMounted(() => {
//   // if (process.client) initObserver();
// });
</script>



<style lang="scss">
.block-hero {
  position: relative;
  height: 100vh;
  // min-height: 400px;
  color: $white;
  overflow: hidden;
  background: linear-gradient(0deg, #000, $green);
  &::after {
    position: absolute;
    content: "";
    display: block;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(214, 0, 94, 0) 50%
    );
    z-index: 4;

    @media (max-width: 767px) {
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(214, 0, 94, 0) 60%
      );
    }
  }

  .container {
    overflow: hidden;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 5;
    justify-content: center;
    align-items: flex-end;

    @media (max-width: 767px) {
      justify-content: flex-end;
      padding-bottom: 20vh;
    }
  }

  .global-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    mix-blend-mode: lighten;
    z-index: 0;

    &::after {
      position: absolute;
      content: "";
      display: block;
      bottom: 0;
      right: 0;
      width: 30%;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(214, 0, 94, 0) 70%
      );
      z-index: 4;
    }

    @media (max-width: 767px) {
      width: 70%;
      &::after {
        width: 20%;
      }
    }
    img {
      filter: contrast(0.95) brightness(70%);
      object-position: 75% center !important;
    }
  }

  .heading {
    margin-left: auto;
    @media (max-width: 767px) {
      text-align: right;
    }
  }

  .h1 {
    margin-right: -0.15em;
  }

  .h2-alt {
    margin-top: 7vh;
    line-height: 1.2em;
    @media (max-width: 767px) {
      margin-top: 4vh;
    }
  }

  .slides {
    display: flex;
    width: 100%;
    .slide {
      width: 100%;
      flex-shrink: 0;
      text-align: right;
    }
    .slide-0 {
      animation: fadeOut 0.8s forwards 4.5s;
      .h1,
      .h2-alt {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
        filter: blur(20px);
      }

      .h1 {
        animation: fadeIn 1s forwards 1s;
      }
      .h2-alt {
        animation: fadeIn 1s forwards 2.5s;
      }
    }
    .slide-1 {
      opacity: 0;
      filter: blur(20px);
    }

    .slide-1 {
      transform: translateX(-100%);
      animation: fadeIn2 1.4s forwards 5.5s;
    }
  }

  @keyframes fadeOut {
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    80% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      filter: blur(0);
    }
  }
  @keyframes fadeIn2 {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
}
</style>

