<template>
  <div class="global-image">
    <SanityImage :asset-id="gImage.asset._ref">
      <template #default="{ src }">
        <NuxtPicture
          :src="cleanUrl(src)"
          :alt="gImage.alt"
          :sizes="sizesSet"
          :loading="isEager ? 'eager' : 'lazy'"
        />
      </template>
    </SanityImage>
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
  isEager: Boolean,
  logo: Boolean,
});

const { size, logo, gImage } = toRefs(props);

const sizesSet = computed(() => {
  if (size.value === "desktop-medium")
    return "xs:320px, sm:768px, md:768px, lg:768px, xl:800px, xxl:1024px";
  if (size.value === "desktop-large")
    return "xs:320px, sm:768px, md:768px, lg:1024px, xl:1024px, xxl:1024px";
  else return "xs:320px, sm:768px, md:768px, lg:1024px, xl:1440px, xxl:1440px";
});

const cleanUrl = (url) => {
  const b = runtimeConfig.public.sanity_media;
  let clean = url.replace(b, "");
  if (url.endsWith('svg')) clean = `${runtimeConfig.public.imagekit}${clean}`
  return clean
};
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
    picture, img {
        height: 100%;
    }
    img {
           object-fit: contain;
           object-position: center;
        
    }
  }
}
</style>
