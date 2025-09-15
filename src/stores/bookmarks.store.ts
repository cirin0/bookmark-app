import { API_ROUTES, client } from '@/api';
import type { Bookmark } from '@/interfaces/bookmark.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Bookmark[]>([]);

  async function fetchBookmarks(categoryId: number) {
    const { data } = await client().get<Bookmark[]>(API_ROUTES.bookmarks.get(categoryId));
    bookmarks.value = data;
  }

  async function deleteBookmark(id: number, category_id: number) {
    await client().delete<Bookmark[]>(API_ROUTES.bookmarks.delete(id));
    fetchBookmarks(category_id);
  }

  return { bookmarks, fetchBookmarks, deleteBookmark };
});
