import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    selectedCategories: [],
    programs: [],
    recommendedPrograms: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
      state.selectedCategories = []
      state.recommendedPrograms = []
    },
    SET_SELECTED_CATEGORIES(state, categories) {
      state.selectedCategories = categories
    },
    ADD_PROGRAM(state, program) {
      state.programs.push(program)
      localStorage.setItem('programs', JSON.stringify(state.programs))
    },
    SET_RECOMMENDED_PROGRAMS(state, programs) {
      state.recommendedPrograms = programs
    }
  },
  actions: {
    async register({ commit }, userData) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find(u => u.username === userData.username)
      if (existingUser) {
        throw new Error('Username already exists')
      }
      users.push(userData)
      localStorage.setItem('users', JSON.stringify(users))

      // Save selected categories to localStorage
      if (userData.selectedCategories) {
        localStorage.setItem('selectedCategories', JSON.stringify(userData.selectedCategories))
        commit('SET_SELECTED_CATEGORIES', userData.selectedCategories) // Commit to Vuex
      }

      commit('SET_USER', userData)
    },

    async login({ commit }, credentials) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(
        u => u.username === credentials.username && u.password === credentials.password
      )

      if (user) {
        commit('SET_USER', user)
        
        // Load selected categories from localStorage and commit to Vuex
        const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]')
        commit('SET_SELECTED_CATEGORIES', selectedCategories)

        return user
      } else {
        throw new Error('Invalid credentials')
      }
    },
    
    logout({ commit }) {
      commit('LOGOUT')
    },

    selectCategories({ commit }, categories) {
      commit('SET_SELECTED_CATEGORIES', categories)
    },

    recommendPrograms({ commit, state }) {
      // Simple recommendation based on selected categories
      const allPrograms = JSON.parse(localStorage.getItem('programs') || '[]')
      const recommendedPrograms = allPrograms.filter(program => 
        state.selectedCategories.includes(program.category)
      )
      commit('SET_RECOMMENDED_PROGRAMS', recommendedPrograms)
    }
  },
  getters: {
    isLoggedIn: state => state.isAuthenticated,
    isAdmin: state => state.user && state.user.username === 'admin',
    currentUser: state => state.user,
    selectedCategories: state => state.selectedCategories,
    recommendedPrograms: state => state.recommendedPrograms
  }
})
