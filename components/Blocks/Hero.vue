<template>
  <section ref="blockRef">
    <GlobalImage
      :gImage="block.image.image"
      size="desktop-large"
      class="background-cover"
      isEager
    />
    <div class="container">
        <h1 class="h1 heading mb-40">
          MC<br />
          Balabanian
        </h1>
        <h2 class="h2-alt heading">Web Developer</h2>
    </div>
  </section>
</template>

<script setup>
const attrs = useAttrs();
const block = attrs.block;
</script>

<style lang="scss">
.block-hero {
  position: relative;
  min-height: 100vh;
  padding: 80px 0;
  color: $white;
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
    opacity: 0;
    filter: blur(5px);
  }

  .h1 {
    margin-right: -0.1em;
  }

  .h2-alt {
    margin-top: 7vh;
    line-height: 1.2em;

    @media (max-width: 767px) {
      margin-top: 4vh;
    }
  }

  .container {
    position: relative;
    z-index: 5;
    text-align: right;

    .h1 {
      animation: fadeIn 1.4s forwards 0.4s ease-in;
    }

    .h2-alt {
      animation: fadeIn 1.4s forwards 0.9s ease-in;
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