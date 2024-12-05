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
      
      users.push(userData)
      localStorage.setItem('users', JSON.stringify(users))
      commit('SET_USER', userData)
    },
    
    login({ commit }, credentials) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      const user = users.find(
        u => u.username === credentials.username && 
             u.password === credentials.password
      )
      
      // Check if user exists
      if (user) {
        // If admin is logging in, ensure they are treated as an admin
        if (user.username === 'admin') {
          commit('SET_USER', user)
          return user
        } else {
          commit('SET_USER', user)
          return user
        }
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
    },
    
    // Automatically create default admin if not exists
    initializeDefaultAdmin({ commit }) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if admin exists in users
      const adminUser = users.find(u => u.username === 'admin')

      if (!adminUser) {
        // If no admin exists, create the default admin user
        const defaultAdmin = {
          username: 'admin',
          password: 'admin', // Change this to a more secure password in production
        }

        users.push(defaultAdmin)
        localStorage.setItem('users', JSON.stringify(users))
        commit('SET_USER', defaultAdmin) // Log in the admin automatically
      }
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
