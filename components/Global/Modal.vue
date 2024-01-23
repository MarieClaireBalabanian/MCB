<template>
  <div>
    <button
      ref="triggerRef"
      @click="handleModal(true)"
      class="button"
      :aria-label="`Learn more about ${project.title}`"
    >
      Learn More
    </button>

    <Teleport to="body">
      <transition name="modalTransition" appear>
        <div
          v-if="open"
          class="modal"
          @keyup.esc="handleModal(false)"
          @click.self="handleModal(false)"
        >
          <GlobalFocusTrap class="focus-trap" :enabled="open">
            <div class="modal-wrapper">
              <div
                v-if="project"
                class="modal-content"
                role="dialog"
                aria-modal="true"
                tabindex="-1"
                ref="modalRef"
                aria-labelledby="modal-title"
              >
                <button class="close" @click.stop="handleModal(false)">
                  <span class="sr-only">Close Modal</span>
                </button>

                <div class="header mb-20">
                  <GlobalHero :project="project" class="mb-40" />
                </div>
                <div class="container body">
                  <GlobalTech :skills="project.tech" class="mb-80 black" />

                  <div class="company mb-80" v-if="project.description">
                    <div class="paragraph mb-20">
                      <h3><u>ABOUT THE PROJECT</u></h3>
                    </div>
                    <div class="paragraph mb-40">
                      <SanityContent :blocks="project.description" />
                    </div>
                    <a
                      :href="project.website"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="website paragraph-small button button-black"
                      v-if="project.website"
                      >Visit the Site</a
                    >
                  </div>

                  <div class="video-container mb-80" v-if="project.video">
                    <SanityFile :asset-id="project.video.asset._ref">
                      <template #default="{ src }">
                        <video playsinline muted loop controls>
                          <source :src="src" type="video/mp4" />
                        </video>
                      </template>
                    </SanityFile>
                    <p class="paragraph-small">
                      Short snippet of the presentation
                    </p>
                  </div>
                </div>
                <BlocksThumbnails :project="project" />
              </div>
            </div>
          </GlobalFocusTrap>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
  },
});

const open = ref(false);
const triggerRef = ref(null);
const modalRef = ref(null);

watch(open, (newOpen) => {
  handleModal(newOpen);
});

const handleModal = (val) => {
  const app = document.getElementById("app");

  if (val) {
    document.body.classList.add("lock-scroll");
    app.setAttribute("aria-hidden", true);
    nextTick(() => {
      if (modalRef?.value) modalRef.value.focus();
    });
  } else {
    document.body.classList.remove("lock-scroll");
    app.setAttribute("aria-hidden", false);
    nextTick(() => {
      if (triggerRef?.value) triggerRef.value.focus();
    });
  }
  open.value = val;
};
</script>

<style lang="scss">
.modal {
  // color: $white;
  position: fixed;
  left: 0;
  top: 0;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  > .focus-trap {
    width: 100%;
  }

  .modal-content {
    background: $white;
  }

  .close {
    background: $white;
    border: 0;
    display: block;
    cursor: pointer;
    height: 35px;
    width: 35px;
    padding: 0;
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    margin-left: auto;
    border: 1px solid $black;
    border-top: none;

    &::before,
    &::after {
      background: $black;
      content: "";
      display: block;
      height: 2px;
      left: 8px;
      position: absolute;
      top: 16px;
      width: 20px;
    }

    &::before {
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }

    &:hover,
    &:focus {
      border-radius: 2px;
      background: $red;
      &::before,
      &::after {
        background: $white;
      }
    }
  }
  video {
    width: 100%;
  }

  // .h2-large {
  //   display: inline;
  //   background: $black;
  //   color: $white;
  //   padding: 0 20px;
  //   box-decoration-break: clone;
  //   -webkit-box-decoration-break: clone;
  // }

  .container {
    // max-width: 1000px;
  }

  &.modalTransition-enter-active,
  &.modalTransition-leave-active {
    transition: transform 0.7s ease;
  }

  &.modalTransition-enter-from,
  &.modalTransition-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  &.modalTransition-enter-to,
  &.modalTransition-leave {
    transform: translate3d(0, 0, 0);
  }

  .body {
    max-width: 65rem;
    margin: 0 auto;
  }

  .tech {
    display: flex;
    flex-wrap: wrap;

  }
}
</style>