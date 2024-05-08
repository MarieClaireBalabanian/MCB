<template>
  <section class="block-padding text-center">
    <div class="container">
      <div class="header">
        <PartialsTitle :title="block.title" class=" text-stroke stroke-black" />
      </div>
      <PartialsTech :skills="block.skills" animate class="text-center"/>
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
    padding: 20px 0;
    columns: 2;
    column-gap: 1vw;
  }
  @media (min-width: 768px) {
    .tech {
      columns: 3;
      

      li {
        break-inside: avoid;
      }
    }
  }
}
</style>