<script setup lang="ts">
import { ref } from 'vue';
import ButtonIcon from './ButtonIcon.vue';
import IconPlusBig from '@/icons/IconPlusBig.vue';
import InputString from './InputString.vue';
import IconOk from '@/icons/IconOk.vue';
import { useBookmarkStore } from '@/stores/bookmarks.store';

const isEdited = ref<boolean>(false);
const newUrl = ref<string>();
const { category_id } = defineProps<{ category_id: number }>();
const bookmarkStore = useBookmarkStore();

function toggleIsEdited() {
  isEdited.value = !isEdited.value;
}

function addBookmark() {
  if (!newUrl.value) {
    return;
  }
  bookmarkStore.addBookmark(newUrl.value, category_id);
  newUrl.value = '';
  toggleIsEdited();
}
</script>
<template>
  <div class="bookmark-add">
    <ButtonIcon :size="48" v-if="!isEdited" @click="toggleIsEdited">
      <IconPlusBig />
    </ButtonIcon>
    <div v-else class="bookmark-form">
      <InputString v-model="newUrl" />
      <ButtonIcon @click="addBookmark">
        <IconOk />
      </ButtonIcon>
    </div>
  </div>
</template>
<style scoped>
.bookmark-add {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px dashed var(--color-fg);
}
.bookmark-form {
  display: flex;
  gap: 8px;
}
</style>
