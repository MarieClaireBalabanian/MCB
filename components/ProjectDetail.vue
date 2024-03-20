<template>
    <section class="project-detail">
        <PartialsHero :project="project" />
        <div class="container flex-container block-padding">
            <PartialsThumbnails :project="project" />
            <PartialsProjectDescription class="bg-white" :project="project" />
        </div>
    </section>
</template>
  
  
<script setup>
const props = defineProps({
    project: Object,
});
</script>

<style lang="scss">
    .project-detail {
        @media (max-width: 767px) {
            .project-description {
                margin-top: 40px;
            }
            .paragraph {
                font-size: .95em;
            }
        }
        @media (min-width: 768px) {
            .flex-container {
                display: flex;
                justify-content: space-between;

                .project-description {
                    width: calc(55% - 20px);
                    flex-grow: 0;
                }
                .thumbnails {
                    width: calc(45% - 20px);
                    flex-shrink: 0;
                }
            }
        }
    }
</style>