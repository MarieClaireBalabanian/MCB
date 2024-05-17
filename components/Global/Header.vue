<template>
  <header class="global-header" :class="{ open: open, bg: showBg }" id="header">
    <div class="container">
      <GlobalFocusTrap :enabled="open" class="trap-wrapper">
        <nav class="items-container" @keyup.esc="closeNav('esc')" aria-label="Main Navigation">
          <NuxtLink :to="'/'" class="logo" @click.prevent="closeNav" aria-label="Marie-Claire Balabanian - Homepage">
            <span>M</span><span class="">C</span>
          </NuxtLink>

          <div class="button-wrapper">
            <button id="menu-toggle" aria-haspopup="true" class="hamburger" ref="hamburgerRef" @click="toggleNav"
              :aria-expanded="open.toString()">
              <span class="sr-only">{{ hamburgerSR }}</span>
              <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="19"
                viewBox="0 0 22 19" fill="none">
                <path class="bar-1 bar" d="M1 1.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                <path class="bar-2 bar" d="M1 9.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                <path class="bar-3 bar" d="M1 17.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="bg" :class="{ show: open, hide: !open }"></div>

          <div class="items-wrapper" :class="{ show: open, hide: !open }"> 
            <div class="container">
              <div class="inner-menu" tabindex="-1" id="inner-menu" aria-label="Expanded Navigation">
                <ul class="items">
                  <li v-for="(item, index) in menu" :key="`nav-${index}`">
                    <NuxtLink class="h2-alt text-redpink" @click.prevent="closeNav" :to="item.slug" :tabindex="open ? 0 : -1">
                      {{ item.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </GlobalFocusTrap>
    </div>
  </header>
</template>

<script setup>
  import { useWindowStore } from "@/stores/window";

  const hamburgerRef = ref(null)

  const windowStore = useWindowStore();
  const showBg = computed(() => {
    return windowStore.scrollTop > 80;
  });

  const menu = [
    { title: "Work", slug: "/#work" },
    { title: "About", slug: "/#about" },
    { title: "Contact", slug: "/#contact" },
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
    });
  };

  const closeNav = (action) => {
    open.value = false;
    document.body.classList.remove("lock-scroll");
    if (action === 'esc') {
      nextTick(() => {
        hamburgerRef.value.focus();
      })
    }
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
    transition: background .4s ease, color .4s ease;

    &.bg {
      background: $black;
    }

    >.container {
      height: $header-height;
    }

    .logo {
      font-family: $title;
      position: relative;
      z-index: 999;
      color: $teal;
      border-bottom: 1px solid transparent;

      span {
        font-size:20px;
        background: $black;
      }
      &:hover,
      &:focus {
        border-color: $teal;
      }
    }

    .button-wrapper {
      height: 22px;
      width: 22px;
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
        stroke: $teal;
      }
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: $black;

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
      display: flex;
      padding-top: 11px;
      justify-content: space-between;
      pointer-events: auto;
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

      &.show {
        ul {
          opacity: 1;
          transform: translate3d(0,0,0);
          transition: .6s ease .7s;

        }
      }

      &.hide {
        pointer-events: none;
        ul {
          opacity: 0;
          transform: translate3d(0,200px,0);
          transition: .4s ease;
        }
      }

      ul {
        padding: 90px 0;
      }

      li {
        font-size: 1.4rem;
        letter-spacing: 0.1rem;
        margin-bottom: 2em;

        a {
          border-bottom: 2px solid transparent;
          transition: 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.3em;

          &:hover,
          &:focus {
            border-color: $redpink;
          }
        }
      }
    }

    &.open {
      .button-wrapper {
        .bar {
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
  }
</style>