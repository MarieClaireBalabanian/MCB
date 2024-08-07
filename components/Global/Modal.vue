<template>
  <div>
    <button
      ref="triggerRef"
      @click="handleModal(true)"
      class="button"
      :aria-label="`Learn more about ${project.title}`">
      Learn More
    </button>

    <Teleport to="body">
      <transition
        name="modalTransition"
        appear>
        <div
          v-if="open"
          class="modal"
          @keyup.esc="handleModal(false)"
          @click.self="handleModal(false)">
          <GlobalFocusTrap
            class="focus-trap"
            :enabled="open">
            <div class="modal-wrapper">
              <div
                v-if="project"
                class="modal-content"
                role="dialog"
                aria-modal="true"
                tabindex="-1"
                ref="modalRef"
                aria-labelledby="modal-title">
                <button
                  class="close pseudo-before-after"
                  @click.stop="handleModal(false)">
                  <span class="sr-only">Close Modal</span>
                </button>
                <PartialsHero :project="project" />

                <section class="tab-section">
                  <div
                    class="tablist"
                    role="tablist"
                    ref="tabRef">
                    <button
                      v-for="(item, index) in items"
                      role="tab"
                      class="project-tab tab paragraph-small text-center pseudo-before"
                      :id="'project-tab-' + index"
                      :class="{ active: index === activeTab }"
                      :aria-selected="index === activeTab ? true : false.toString()"
                      :key="`buttontab${index}`"
                      :aria-controls="'grid-panel-' + index"
                      :tabindex="index === activeTab ? 0 : -1"
                      @keyup.right="arrowFocus('right')"
                      @keyup.left="arrowFocus('left')"
                      @click="activeTab = index">
                      <span>{{ item.title }}</span>
                    </button>
                  </div>
                  <div class="container">
                    <div
                      v-for="(panel, index) in items"
                      v-show="index === activeTab"
                      :id="'grid-panel-' + index"
                      :key="`paneltab${index}`"
                      role="tabpanel"
                      class="tabpanel"
                      :aria-labelledby="'project-tab-' + index">
                      <transition name="show">
                        <div
                          class="panel-wrapper"
                          v-show="index === activeTab"
                          :class="{
                            hide: index !== activeTab,
                            show: index === activeTab,
                          }">
                          <component
                            :is="panel.content"
                            :project="project">
                          </component>
                        </div>
                      </transition>
                    </div>
                  </div>
                </section>
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
  const { project } = toRefs(props);

  const activeTab = ref(0);
  const tabRef = ref(null);
  const items = [
    {
      title: "Screens",
      content: "PartialsThumbnails",
    },
    {
      title: "Description",
      content: `PartialsProjectDescription`,
    },
  ];

  const arrowFocus = (direction) => {
    let currentFocus = document.activeElement.getAttribute("id");
    let currentIndex = parseInt(currentFocus.charAt(currentFocus.length - 1));
    let tabs = tabRef.value.querySelectorAll(".project-tab");

    let nextFocus;
    tabs.forEach((item, index) => {
      if (index === currentIndex) {
        if (direction === "right") {
          if (index >= 0 && index < tabs.length - 1) nextFocus = index + 1;
          else nextFocus = 0;
        } else if (direction === "left") {
          if (index > 0) nextFocus = index - 1;
          else nextFocus = tabs.length - 1;
        }
      }
    });
    document.getElementById(`project-tab-${nextFocus}`).focus();
  };

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
      min-height: 100vh;
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
        height: 2px;
        left: 8px;
        top: 16px;
        width: 20px;
        background: $black;
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

    .tablist {
      display: flex;
      justify-content: center;
      background: rgba(0, 0, 0, 0.08);
      > button {
        width: auto;
        flex-grow: 0;
        min-width: 38%;
        padding: 0.6em 0.1em;
        color: rgba($black, 0.6);
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        font-weight: 500;
        &::before {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }

        span {
          flex-grow: 0;
        }
        &.active {
          &::before {
            background: $teal;
          }
          span {
            color: $teal;
          }
        }
      }
    }

    .panel-wrapper {
      padding: 50px 0 100px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .show-enter-from {
      opacity: 0;
    }

    .show-leave-to {
      opacity: 0;
    }

    .show-enter-to,
    .show-leave {
      opacity: 1;
    }

    .show-enter-active,
    .show-leave-active {
      transition: 0.4s ease;
    }
  }
</style>
