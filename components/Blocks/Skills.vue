<template>
  <section class="block-padding text-center bottom-line">
    <div class="container">
      <PartialsTech :skills="block.skills" animate class=""/>
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
.block-skills {
  .tech {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
}
</style>