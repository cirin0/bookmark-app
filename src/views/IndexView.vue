<template>
  <div class="index">
    <h1 class="index-header">Вітаємо в Bookmarkly</h1>
    <p class="index-description">
      Щоб почати використовувати виберіть категорію закладок або створіть нову.
    </p>
  </div>
</template>

<style scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  min-height: 50vh;
}

.index-header {
  font-size: 24px;
  font-weight: 500;
}
.index-description {
  font-size: 16px;
}
</style>
