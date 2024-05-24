<template>
  <section ref="blockRef" class="text-white pseudo-after">
    <GlobalImage
      :gImage="block.image1.image"
      :size="700"
      class="background-cover absolute-cover pseudo-after"
      load="eager"
    />
    <div class="container text-right">
      <h1 class="h1 heading" v-html="block.title"></h1>
      <h2 class="h2-alt heading text-redpink text-right">{{ block.subtitle}}</h2>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  block: Object,
  required: true
})
</script>

<style lang="scss">

.block-hero {
  min-height: 100vh;
  padding: 80px 0;
  overflow: hidden;
  background: linear-gradient(0deg, #000, $green);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 767px) {
    justify-content: flex-end;
    padding-bottom: 20vh;
  }

  &::after {
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

  .global-image {
    right: unset;
    width: 50%;
    mix-blend-mode: lighten;
    position: absolute;

    &::after {
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

  .container {
    position: relative;
    z-index: 5;
  }

  .heading {
    opacity: 0;
    filter: blur(15px);
  }
  .h1 {
    animation: fadeIn 1s forwards 0.4s ease-in;
    
    span {
      display: block;
      &:last-child {
        @extend .text-stroke;
        @extend .stroke-white;
      }
    }
  }

  .h2-alt {
    margin-top: 40px;
    align-self: flex-end;
    animation: fadeIn 1.3s forwards 0.9s ease-in;
  }

  @media (min-width: 768px) {
    .h1 {
      span:first-child {
        padding-right: 5%;
      }
    }
  }

  @keyframes fadeIn {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
}
</style>