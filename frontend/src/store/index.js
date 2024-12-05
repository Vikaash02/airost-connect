import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    selectedCategories: [],
    programs: [],
    recommendedPrograms: []
  },
  mutations: {
    // User Authentication Mutations
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
    
    // Category Selection Mutations
    SET_SELECTED_CATEGORIES(state, categories) {
      state.selectedCategories = categories
      localStorage.setItem('selectedCategories', JSON.stringify(categories)) // Store in localStorage
    },
    
    // Program Management Mutations
    ADD_PROGRAM(state, program) {
      state.programs.push(program)
      localStorage.setItem('programs', JSON.stringify(state.programs))
    },
    
    // Recommendation Mutations
    SET_RECOMMENDED_PROGRAMS(state, programs) {
      state.recommendedPrograms = programs
    }
  },
  actions: {
    // User Authentication Actions
    register({ commit }, userData) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if user already exists
      const existingUser = users.find(u => u.username === userData.username)
      if (existingUser) {
        throw new Error('Username already exists')
      }
      
      // Save categories after registration
      commit('SET_SELECTED_CATEGORIES', userData.selectedCategories)

      // Store user and selected categories
      users.push(userData)
      localStorage.setItem('users', JSON.stringify(users))
      commit('SET_USER', userData)
    },
    
    login({ commit, dispatch }, credentials) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      const user = users.find(
        u => u.username === credentials.username && 
             u.password === credentials.password
      )
      
      if (user) {
        commit('SET_USER', user)

        // Load selected categories for the logged-in user
        const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || []
        commit('SET_SELECTED_CATEGORIES', selectedCategories)

        // Trigger program recommendations after login
        dispatch('recommendPrograms')

        return user
      } else {
        throw new Error('Invalid credentials')
      }
    },
    
    logout({ commit }) {
      commit('LOGOUT')
    },
    
    // Category Selection Actions
    selectCategories({ commit }, categories) {
      commit('SET_SELECTED_CATEGORIES', categories)
    },
    
    // Program Recommendation Actions
    addProgram({ commit }, program) {
      commit('ADD_PROGRAM', program)

      // Add program to localStorage for persistence
      const allPrograms = JSON.parse(localStorage.getItem('programs') || '[]')
      allPrograms.push(program)
      localStorage.setItem('programs', JSON.stringify(allPrograms))

      // Trigger recommendation update for all users
      commit('SET_RECOMMENDED_PROGRAMS', allPrograms) // Optional: if you want real-time updates
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
