<script setup lang="ts">
import CategoryList from '@/components/CategoryList.vue';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import IconBurger from '@/icons/IconBurger.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false;
  },
);
</script>

<template>
  <div class="app">
    <button class="burger-menu" @click="toggleSidebar" aria-label="Toggle menu">
      <IconBurger />
    </button>
    <nav class="nav" :class="{ 'nav--open': isSidebarOpen }">
      <button class="nav__close" @click="toggleSidebar" aria-label="Close menu">&times;</button>
      <ProfileAvatar />
      <CategoryList />
    </nav>
    <div v-if="isSidebarOpen" class="backdrop" @click="toggleSidebar"></div>
    <main class="main"><RouterView /></main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: calc(100vh - 150px);
  gap: 10px;
  max-width: 1450px;
  margin: 140px auto 0 auto;
  position: relative;
}

.nav {
  min-width: 320px;
  transition: transform 0.3s ease;
}

.main {
  width: 100%;
  padding: 0px 10px;
}

.burger-menu {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  color: var(--color-fg);
  padding: 10px;
}

.nav__close {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: var(--color-fg);
  padding: 10px;
  margin-top: 4px;
}

.backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

@media screen and (max-width: 768px) {
  .app {
    flex-direction: column;
    margin-top: 80px;
  }

  .burger-menu {
    display: block;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    background-color: var(--color-bg);
    padding: 60px 20px 20px;
    transform: translateX(-100%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .nav--open {
    transform: translateX(0);
  }

  .nav__close {
    display: block;
  }

  .backdrop {
    display: block;
  }
}
</style>
