<script setup lang="ts">
import IconTrashWhite from '@/icons/IconTrashWhite.vue';
import type { Bookmark } from '@/interfaces/bookmark.interface';
import ButtonCard from './ButtonCard.vue';
import IconLinkWhite from '@/icons/IconLinkWhite.vue';
import { useBookmarkStore } from '@/stores/bookmarks.store';
import { ref } from 'vue';
import PopupConfirm from './PopupConfirm.vue';

const { id, title, image, url, category_id } = defineProps<Bookmark>();
const bookmarkStore = useBookmarkStore();
const isOpened = ref<boolean>(false);

function openLink() {
  window.open(url, '_blank');
}

function deleteBookmark() {
  isOpened.value = !isOpened.value;
  bookmarkStore.deleteBookmark(id, category_id);
}
</script>
<template>
  <div class="bookmark-card">
    <div class="bookmark-card__image" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="bookmark-card__title">
      {{ title }}
    </div>
    <div class="bookmark-card__footer">
      <ButtonCard @click="isOpened = !isOpened">
        <IconTrashWhite />
      </ButtonCard>
      <ButtonCard @click="openLink">
        <IconLinkWhite />
      </ButtonCard>
      <PopupConfirm
        text="Хочете видалити закладку?"
        :is-opened="isOpened"
        @cancel="isOpened = !isOpened"
        @ok="deleteBookmark"
      />
    </div>
  </div>
</template>

<style scoped>
.bookmark-card {
  border-radius: 30px;
  background: var(--color-fg);
  box-shadow: 0px 10px 10px 0px rgba(245, 245, 247, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}
.bookmark-card__image {
  min-height: 160px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}
.bookmark-card__title {
  color: var(--color-bg);
  font-size: 16px;
  font-weight: 500;
}
.bookmark-card__footer {
  display: flex;
  justify-content: space-between;
}
</style>
