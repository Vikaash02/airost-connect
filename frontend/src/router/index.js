// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// Import all views
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ProgramRecommendationView from '@/views/ProgramRecommendationView.vue'
import AdminView from '@/views/AdminView.vue'

// Define routes with navigation guards
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { guest: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recommendations',
    name: 'Recommendations',
    component: ProgramRecommendationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards for authentication and authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn
  const isAdmin = store.getters.isAdmin
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAdmin) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
