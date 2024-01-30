<template>
  <section class="block-padding text-white">
    <div class="container">
      <h2 class="h2 mb-40 text-center">{{ block.title }}</h2>
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
    background: $black;

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