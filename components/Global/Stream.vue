<template>
  <div
    class="stream"
    v-if="sections?.length">
    <component
      v-for="(block, index) in sections"
      :key="index"
      :is="`Blocks${block._type}`"
      ref="block"
      tabindex="-1"
      :block="block"
      class="block"
      :class="`block-${block._type.toLowerCase()}`"
      :id="block._type.toLowerCase()">
    </component>
  </div>
</template>

<script setup>
  const props = defineProps({
    sections: {
      type: Array,
      default: [],
    },
  });
</script>
