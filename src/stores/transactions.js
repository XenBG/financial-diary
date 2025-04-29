import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useDiaryStore } from './diary'
import { useModalsStore } from './modals'

export const useTransactionsStore = defineStore('transactions', () => {
    const diaryStore = useDiaryStore()
    const modalsStore = useModalsStore()

    // Getters
    const getTransactionsCount = (expenseId) => {
        return diaryStore.transactions.filter((t) => t.expenseId === expenseId).length
    }

    const getSortedTransactions = computed(() => {
        return [...diaryStore.transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    const getSortedExpenseTransactions = (expenseId) => {
        return diaryStore.transactions
            .filter((t) => t.expenseId === expenseId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Actions
    const addTransaction = () => {
        if (!modalsStore.newTransactionDate) return

        const amount = diaryStore.safeParseFloat(modalsStore.newTransactionAmount)

        const newTransaction = {
            id: 'trans-' + Date.now(),
            expenseId: modalsStore.currentExpense.id,
            description: modalsStore.newTransactionDescription || 'Автоматично плащане',
            amount: amount,
            date: modalsStore.newTransactionDate,
        }

        diaryStore.transactions.push(newTransaction)
        diaryStore.saveData()

        // Reset form
        modalsStore.newTransactionDescription = ''
        modalsStore.newTransactionAmount = ''
        modalsStore.newTransactionDate = new Date().toISOString().split('T')[0]
    }

    const deleteTransaction = (transactionId) => {
        diaryStore.transactions = diaryStore.transactions.filter((t) => t.id !== transactionId)
        diaryStore.saveData()
        modalsStore.showDeleteTransactionModal = false
    }

    return {
        // Getters
        getTransactionsCount,
        getSortedTransactions,
        getSortedExpenseTransactions,

        // Actions
        addTransaction,
        deleteTransaction,
    }
})
