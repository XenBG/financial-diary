import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { CURRENCY, DATE_LOCALE, DEFAULT_VALUES, STORAGE_KEYS } from '@/config/constants'

export const useDiaryStore = defineStore('diary', () => {
    // State
    const funds = ref(0)
    const basicExpenses = ref([])
    const otherExpenses = ref([])
    const transactions = ref([])
    const collapsedCategories = ref({
        basic: {},
        other: {},
    })

    // Getters
    const getTotalAllocated = computed(() => {
        return getBasicExpensesTotal.value + getOtherExpensesTotal.value
    })

    const getTotalSpent = computed(() => {
        return transactions.value.reduce((sum, transaction) => sum + safeParseFloat(transaction.amount), 0)
    })

    const getBasicExpensesTotal = computed(() => {
        return basicExpenses.value.reduce((sum, category) => {
            return sum + category.expenses.reduce((catSum, expense) => catSum + safeParseFloat(expense.amount), 0)
        }, 0)
    })

    const getOtherExpensesTotal = computed(() => {
        return otherExpenses.value.reduce((sum, category) => {
            return sum + category.expenses.reduce((catSum, expense) => catSum + safeParseFloat(expense.amount), 0)
        }, 0)
    })

    const getBasicExpensesSpent = computed(() => {
        let total = 0
        basicExpenses.value.forEach((category) => {
            category.expenses.forEach((expense) => {
                total += getExpenseSpent(expense.id)
            })
        })
        return total
    })

    const getOtherExpensesSpent = computed(() => {
        let total = 0
        otherExpenses.value.forEach((category) => {
            category.expenses.forEach((expense) => {
                total += getExpenseSpent(expense.id)
            })
        })
        return total
    })

    // Actions
    const loadData = () => {
        const diaryData = localStorage.getItem(STORAGE_KEYS.DIARY_DATA)
        if (diaryData) {
            const data = JSON.parse(diaryData)
            basicExpenses.value = data.basicExpenses || []
            otherExpenses.value = data.otherExpenses || []
            funds.value = data.funds || DEFAULT_VALUES.funds
        } else {
            funds.value = DEFAULT_VALUES.funds
            basicExpenses.value = DEFAULT_VALUES.basicExpenses
            otherExpenses.value = DEFAULT_VALUES.otherExpenses
        }

        const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
        if (savedTransactions) {
            transactions.value = JSON.parse(savedTransactions)
        } else {
            transactions.value = DEFAULT_VALUES.transactions
        }
    }

    const saveData = () => {
        const diaryData = {
            basicExpenses: basicExpenses.value,
            otherExpenses: otherExpenses.value,
            funds: funds.value,
        }

        localStorage.setItem(STORAGE_KEYS.DIARY_DATA, JSON.stringify(diaryData))
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions.value))
    }

    const saveFunds = () => {
        const fundsValue = safeParseFloat(funds.value)
        funds.value = fundsValue
        saveData()
    }

    const resetData = () => {
        const currentBasicExpenses = JSON.parse(JSON.stringify(basicExpenses.value))
        const currentOtherExpenses = JSON.parse(JSON.stringify(otherExpenses.value))

        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]))

        const diaryData = {
            basicExpenses: currentBasicExpenses,
            otherExpenses: currentOtherExpenses,
            funds: funds.value,
        }

        localStorage.setItem(STORAGE_KEYS.DIARY_DATA, JSON.stringify(diaryData))
        transactions.value = []
    }

    // Helper functions
    const safeParseFloat = (value) => {
        const parsed = parseFloat(value)
        return isNaN(parsed) ? 0 : parsed
    }

    const getExpenseSpent = (expenseId) => {
        return transactions.value
            .filter((t) => t.expenseId === expenseId)
            .reduce((sum, transaction) => sum + safeParseFloat(transaction.amount), 0)
    }

    const getExpenseName = (expenseId) => {
        for (const category of basicExpenses.value) {
            const expense = category.expenses.find((e) => e.id === expenseId)
            if (expense) return `${category.name} - ${expense.name}`
        }

        for (const category of otherExpenses.value) {
            const expense = category.expenses.find((e) => e.id === expenseId)
            if (expense) return `${category.name} - ${expense.name}`
        }

        return 'Неизвестен разход'
    }

    return {
        // Constants
        CURRENCY,
        DATE_LOCALE,
        STORAGE_KEYS,

        // State
        funds,
        basicExpenses,
        otherExpenses,
        transactions,
        collapsedCategories,

        // Getters
        getTotalAllocated,
        getTotalSpent,
        getBasicExpensesTotal,
        getOtherExpensesTotal,
        getBasicExpensesSpent,
        getOtherExpensesSpent,

        // Actions
        loadData,
        saveData,
        saveFunds,
        resetData,

        // Helper functions
        safeParseFloat,
        getExpenseSpent,
        getExpenseName,
    }
})
