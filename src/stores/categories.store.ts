import { API_ROUTES, http } from '@/api';
import type { Category } from '@/interfaces/category.inteface';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const userCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data } = await http.get<Category[]>(API_ROUTES.categories);
    categories.value = data;
  }

  async function createCategory() {
    const { data } = await http.post<Category>(API_ROUTES.categories, {
      name: 'Нова категорія',
      alias: uuidv4(),
    });
    categories.value.push(data);
  }

  return { categories, fetchCategories, createCategory };
});
