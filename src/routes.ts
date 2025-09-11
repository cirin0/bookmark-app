import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  routes: [
    {
      path: '/:pathMath(.*)*',
      name: 'NotFound',
      component: () => import('./views/NonFoundView.vue'),
    },
    {
      path: '/',
      component: () => import('./views/AuthView.vue'),
    },
    {
      path: '/main',
      component: () => import('./views/MainView.vue'),
      children: [
        { path: '', component: () => import('./views/IndexView.vue'), name: 'main' },
        { path: ':alias', component: () => import('./views/CategoryView.vue') },
      ],
    },
  ],
  history: createWebHistory(),
});
