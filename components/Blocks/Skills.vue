<template>
  <section class="block-padding text-white bg-black">
    <div class="container">
      <div class="header text-center">
        <PartialsTitle :title="block.title" color="white" direction="to-left" class="mb-80" />
      </div>
      <PartialsTech :skills="block.skills" animate />
    </div>
  </section>
</template>

<script setup>
const attrs = useAttrs();
const block = attrs.block;
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