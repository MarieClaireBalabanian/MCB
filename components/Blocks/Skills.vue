<template>
  <section class="block-padding text-center">
    <div class="container">
      <div class="header">
        <!-- <PartialsTitle :title="block.title" class=" text-redpink" /> -->
      </div>
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
    columns: 2;
    column-gap: 1vw;
  }
  @media (min-width: 768px) {
    .tech {
      columns: 4;
    
      li {
        break-inside: avoid;
      }
    }
  }
}
</style>