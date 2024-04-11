<template>
  <div class="global-image">
    <img
      :src="$urlFor(gImage).size(size).url()"
      :alt="gImage.alt"
      :loading="load"
  />
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  gImage: Object,
  size: {
    type: String,
    default: "",
  },
  load: String,
  logo: Boolean,
  size: Number,
});
</script>



<style lang="scss">
.global-image {
  display: block;
  position: relative;
  overflow: hidden;

  img,
  picture {
    display: block;
    width: 100%;
    height: auto;
  }

  &.background-cover {
    picture,
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-position: center;
      display: block;
      object-fit: cover;
      z-index: 1;
    }
  }
  &.object-fit-top {
    picture,
    img {
      object-position: center top;
    }
  }
  &.object-fit-bottom {
    picture,
    img {
      object-position: center bottom;
    }
  }

  &.contain {
    picture,
    img {
      height: 100%;
    }
    img {
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
