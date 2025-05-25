import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useDiaryStore } from './diary'

export const useSalaryStore = defineStore('salary', () => {
    const diaryStore = useDiaryStore()

    // Getters
    const getNextSalaryDate = computed(() => {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()
        const currentDay = today.getDate()

        // Create date for the 4th of current month
        let nextSalary = new Date(currentYear, currentMonth, 4)

        // If today is past the 4th, get next month's salary date
        if (currentDay > 4) {
            nextSalary = new Date(currentYear, currentMonth + 1, 4)
        }

        // Format date as YYYY-MM-DD in local time
        const year = nextSalary.getFullYear()
        const month = String(nextSalary.getMonth() + 1).padStart(2, '0')
        const day = String(nextSalary.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    })

    const getDaysUntilSalary = computed(() => {
        const today = new Date()
        const salary = new Date(getNextSalaryDate.value)
        const diffTime = salary - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return Math.max(0, diffDays)
    })

    const getRemainingFunds = computed(() => {
        // Calculate remaining funds from both expense categories
        const basicExpensesRemaining = diaryStore.getBasicExpensesTotal - diaryStore.getBasicExpensesSpent
        const otherExpensesRemaining = diaryStore.getOtherExpensesTotal - diaryStore.getOtherExpensesSpent
        return basicExpensesRemaining + otherExpensesRemaining
    })

    const getDailySpendingLimit = computed(() => {
        const daysUntilSalary = getDaysUntilSalary.value
        if (daysUntilSalary <= 0) return 0

        const remainingFunds = getRemainingFunds.value
        return Math.floor(remainingFunds / daysUntilSalary)
    })

    return {
        // Getters
        getNextSalaryDate,
        getDaysUntilSalary,
        getRemainingFunds,
        getDailySpendingLimit,
    }
})
