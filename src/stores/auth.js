import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // State
    const authenticated = ref(false)

    // Getters
    const isAuthenticated = computed(() => authenticated.value)

    // Actions
    const login = () => {
        authenticated.value = true
    }

    const logout = () => {
        authenticated.value = false
    }

    return {
        // State
        authenticated,

        // Getters
        isAuthenticated,

        // Actions
        login,
        logout,
    }
})
