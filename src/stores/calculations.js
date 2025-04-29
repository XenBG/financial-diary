import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useDiaryStore } from './diary'

export const useCalculationsStore = defineStore('calculations', () => {
    const diaryStore = useDiaryStore()

    // Getters
    const calculateAllocatedPercentage = computed(() => {
        const fundsValue = diaryStore.safeParseFloat(diaryStore.funds)
        if (fundsValue <= 0) return 0
        const percentage = (diaryStore.getTotalAllocated / fundsValue) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    })

    const calculateTotalSpentPercentage = computed(() => {
        const fundsValue = diaryStore.safeParseFloat(diaryStore.funds)
        if (fundsValue <= 0) return 0
        const percentage = (diaryStore.getTotalSpent / fundsValue) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    })

    const calculateBasicSpentPercentage = computed(() => {
        const basicTotal = diaryStore.getBasicExpensesTotal
        if (basicTotal <= 0) return 0
        const percentage = (diaryStore.getBasicExpensesSpent / basicTotal) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    })

    const calculateOtherSpentPercentage = computed(() => {
        const otherTotal = diaryStore.getOtherExpensesTotal
        if (otherTotal <= 0) return 0
        const percentage = (diaryStore.getOtherExpensesSpent / otherTotal) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    })

    const calculateRemainingAfterSpentPercentage = computed(() => {
        const totalAllocated = diaryStore.getTotalAllocated
        if (totalAllocated <= 0) return 0
        const percentage = ((totalAllocated - diaryStore.getTotalSpent) / totalAllocated) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    })

    // Helper functions
    const formatCurrency = (value) => {
        return diaryStore.safeParseFloat(value).toFixed(2)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(diaryStore.DATE_LOCALE)
    }

    return {
        // Getters
        calculateAllocatedPercentage,
        calculateTotalSpentPercentage,
        calculateBasicSpentPercentage,
        calculateOtherSpentPercentage,
        calculateRemainingAfterSpentPercentage,

        // Helper functions
        formatCurrency,
        formatDate,
    }
})
