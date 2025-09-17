<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories.store';
import { nextTick, onMounted, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ButtonIcon from './ButtonIcon.vue';
import IconPlus from '../icons/IconPlus.vue';
import { useAuthStore } from '@/stores/auth.store';
import InputString from './InputString.vue';
import IconOk from '@/icons/IconOk.vue';

const store = useCategoryStore();
const authStore = useAuthStore();
const router = useRouter();
const isCreate = ref<boolean>(false);
const newCategoryName = ref<string>();

watch(isCreate, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  const createForm = document.querySelector('.category-create');
  const plusButton = document.querySelector('.category-list li:nth-last-child(2) button');

  if (createForm && !createForm.contains(target) && !plusButton?.contains(target)) {
    isCreate.value = false;
  }
}

onMounted(() => {
  store.fetchCategories();
});

function logout() {
  authStore.clearToken();
  router.push({ name: 'auth' });
}

async function toggleCreate() {
  isCreate.value = !isCreate.value;
  if (isCreate.value) {
    newCategoryName.value = '';
    await nextTick();
  }
}

function createCategory() {
  if (!newCategoryName.value) {
    return;
  }
  store.createCategory(newCategoryName.value);
  setTimeout(() => {
    toggleCreate();
  }, 100);
}
</script>
<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in store.categories" :key="item.id">
      <RouterLink active-class="active-link" :to="`/main/${item.alias}`">{{
        item.name
      }}</RouterLink>
    </li>
    <li>
      <div class="category-create" v-if="isCreate">
        <InputString v-model="newCategoryName" is-focused />
        <ButtonIcon @click="createCategory">
          <IconOk />
        </ButtonIcon>
      </div>
      <ButtonIcon v-if="!isCreate" @click="toggleCreate">
        <IconPlus />
      </ButtonIcon>
    </li>
    <li class="list-item">
      <a href="#" @click="logout()">Вихід</a>
    </li>
  </ul>
</template>
<style scoped>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 34px;
}
.category-create {
  display: flex;
  gap: 10px;
  transition: 0.3s ease-in-out;
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
