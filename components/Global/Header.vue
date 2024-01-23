<template>
  <header class="global-header" :class="{ open: open, 'bg': showBg }" id="header">
    <div class="container">
      <GlobalFocusTrap :enabled="open" class="trap-wrapper">
        <nav
          class="items-container"
          @keyup.esc="closeNav"
          aria-label="Main Navigation"
        >
          <a
            href="#hero"
            class="logo mright-auto"
            @click.prevent="scroll('hero')"
          >
            <span>MCB</span>
          </a>

          <div class="button-wrapper">
            <button
              id="menu-toggle"
              aria-haspopup="true"
              class="hamburger"
              ref="hamburger"
              @click="toggleNav"
              :aria-expanded="open.toString()"
            >
              <span class="sr-only">{{ hamburgerSR }}</span>
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
              >
                <path
                  class="bar-1 bar"
                  d="M1 1.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  class="bar-2 bar"
                  d="M1 9.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  class="bar-3 bar"
                  d="M1 17.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        

        <div class="bg" :class="{ 'show': open, 'hide': !open }"></div>

          <transition name="showItems">
            <div class="items-wrapper" v-show="open">
              <div class="container">
                <div
                  class="inner-menu"
                  tabindex="-1"
                  id="inner-menu"
                  aria-label="Expanded Navigation"
                >
                  <ul class="items">
                    <li v-for="(item, index) in menu" :key="`nav-${index}`">
                      <a
                       class="h2"
                        @click.prevent="scroll(item.slug)"
                        :href="`#${item.slug}`"
                        ref="topLevel"
                      >
                        {{ item.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </nav>
      </GlobalFocusTrap>
    </div>
  </header>
</template>

<script setup>
import { scrollTo } from "@/composables/scrollTo.js";


import { useWindowStore } from '@/stores/window';
  
const windowStore = useWindowStore();
const showBg = computed(() =>  {
    let scroll = windowStore.scrollTop;
    return windowStore.scrollTop > 20;
});

const menu = [
  { title: "Work", slug: "work" },
  { title: "About", slug: "about" },
  { title: "Contact", slug: "contact" },
];

const open = ref(false);

const toggleNav = () => {
  if (open.value) closeNav();
  else openNav();
};

const openNav = () => {
  open.value = true;
  nextTick(() => {
    document.body.classList.add("lock-scroll");
    const focus = document.getElementById("inner-menu");
    focus.focus();
  });
};

const closeNav = () => {
  open.value = false;
  document.body.classList.remove("lock-scroll");
};

const scroll = (id) => {
  const anim = open.value ? "instant" : "smooth";
  if (open.value) closeNav();
  scrollTo(id, anim);
};

const skipToContent = () => {
  const anchor = document.getElementById("main");
  anchor.focus();
};

const hamburgerSR = computed(() => {
  return open.value ? "Close Navigation" : "Open Navigation";
});
</script>

<style lang="scss">
.global-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  transition: .5s ease;
  color: $white;
   transform: translateY(-100px);
    opacity: 1;
animation: header-show 1s forwards 1s;

  &.bg {
    background: white;
    color: $black;
     .button-wrapper {
      .bar {
        
        stroke: $black;
      }
      .logo {
          transition: .2s ease !important;
      }
    }
  }

  > .container {
    height: $header-height;
  }

  .logo {
    font-family: $major-mono;
    font-size: 26px;
    transition: 0.25s ease;
    position: relative;
    z-index: 999;

    &:hover, &:focus {
        border-color: $turquoise;
        color: $turquoise;
        letter-spacing: .1em;
    }
  }

  .button-wrapper {
    height: 22px;
    width: 22px;
    margin-top: 5px;
  }

  .hamburger {
    display: block;
    z-index: 9;
    position: relative;
    width: 100%;
    height: 100%;

    svg {
      display: inline-block;
      width: 100%;
    }

    .bar {
      transition: 0.25s ease 0.2s;
        stroke: $white;
    }
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    

    &.hide {
      transform: scaleX(0);
      opacity: 0;
    transition: transform 0.4s ease-out 0.25s, opacity 0.45s ease-out 0.45s;

    }

    &.show {
        opacity: 1;
      transform: scaleX(1);
        transition: transform 0.4s ease-in, opacity 0.45s ease;

    }
  }

  .items-container {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    z-index: 9999;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
  }

  .items-wrapper {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: auto;
    color: $white;
    padding-top: $header-height;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ul {
      padding: 60px 0 60px 4.5vw;
    }

    li {
      font-size: 1.6rem;
      letter-spacing: 0.1rem;
      margin-bottom: 2em;
      @media (max-width: 767px) {
        font-size: 1.3rem;
      }

      a {
        border-bottom: 2px solid transparent;
        transition:  .2s ease;
        text-transform: uppercase;
        letter-spacing: .3em;
        &:hover, &:focus {
            border-color: $white;
        }
      }
    }
  }

  &.open {
    .logo {
      color: $white;
    }

    .items-container {
      pointer-events: auto;
    }

    .button-wrapper {
      .bar {
        stroke: $white;

        &.bar-1 {
          transform: translate(4px, 1px) rotate(45deg);
        }

        &.bar-2 {
          opacity: 0;
        }

        &.bar-3 {
          transform: translate(-9px, 5px) rotate(-45deg);
        }
      }
    }
  }

  .showItems-enter-active {
    transition: transform 0.4s ease-out 0.65s, opacity 0.6s ease-out 0.69s;
  }

  .showItems-leave-active {
    transition: 0.2s ease-out;
  }

  .showItems-enter-from,
  .showItems-leave-to {
    opacity: 0;
    transform: translate3d(0, 200px, 0);
  }

  .showItems-enter-to,
  .showItems-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  @keyframes header-show {
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>