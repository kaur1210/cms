import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ReviewDetail from '../pages/ReviewDetail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/review/:id', 
    name: 'reviewDetail',
    component: ReviewDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
     



