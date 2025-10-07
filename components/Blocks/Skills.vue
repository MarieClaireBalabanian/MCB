<template>
  <section class="block-padding text-white bg-black">
    <div class="container">
      <div class="header text-center">
        <PartialsTitle
          :title="block.title"
          color="white"
          direction="to-left"
          class="mb-80" />
      </div>
      <PartialsTech
        :skills="block.skills"
        />
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    block: Object,
    required: true,
  });
</script>

<style lang="scss">
  .block-skills {

  }
</style>
