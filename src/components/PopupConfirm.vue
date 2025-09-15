<script setup lang="ts">
import ButtonMain from './ButtonMain.vue';

const { isOpened, text } = defineProps<{
  isOpened: boolean;
  text: string;
}>();

const emit = defineEmits<{
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <Transition name="fade">
    <Teleport to="body">
      <div class="popup__cover" v-if="isOpened">
        <div class="popup">
          {{ text }}
          <div class="popup__actions">
            <ButtonMain @click="emit('ok')">Так</ButtonMain>
            <ButtonMain @click="emit('cancel')">Ні</ButtonMain>
          </div>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>
<style scoped>
.popup__cover {
  position: fixed;
  inset: 0;
  background-color: var(--color-inactive);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  padding: 20px;
  border-radius: 20px;
  background-color: var(--color-bg);
  min-width: 350px;
  text-align: center;
}
.popup__actions {
  display: flex;
  margin-top: 16px;
  gap: 8px;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
