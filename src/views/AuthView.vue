<script setup lang="ts">
import ButtonMain from '@/components/ButtonMain.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function redirectToMain() {
  router.push({
    name: 'main',
  });
}
</script>

<template>
  <div class="auth">
    <div class="auth__form">
      <h1 class="auth__header">Bookmarkly</h1>
      <ButtonMain @click="redirectToMain()">Вхід</ButtonMain>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
.auth__header {
  font-size: 32px;
  font-weight: bold;
}
.auth__form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 52px;
  flex-direction: column;
}
</style>
