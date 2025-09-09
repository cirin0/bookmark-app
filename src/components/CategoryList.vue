<script setup lang="ts">
import { userCategoryStore } from '@/stores/categories.store';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonIcon from './ButtonIcon.vue';
import IconPlus from '../icons/IconPlus.vue';

const store = userCategoryStore();

onMounted(() => {
  store.fetchCategories();
});
</script>
<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in store.categories" :key="item.id">
      <RouterLink active-class="active-link" :to="`/main/${item.alias}`">{{
        item.name
      }}</RouterLink>
    </li>
    <li>
      <ButtonIcon @click="store.createCategory">
        <IconPlus />
      </ButtonIcon>
    </li>
  </ul>
</template>
<style scoped>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 34px;
}
.list-item {
  list-style: none;
}
.list-item a {
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  color: var(--color-fg);
}
.category-list li {
  list-style: none;
}

.list-item a:hover,
.list-item a.active-link {
  font-size: 24px;
  font-weight: 700;
}
</style>
