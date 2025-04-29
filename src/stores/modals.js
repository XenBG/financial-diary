import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalsStore = defineStore('modals', () => {
    // State
    const showResetModal = ref(false)
    const showAddCategoryModal = ref(false)
    const showDeleteCategoryModal = ref(false)
    const showAddExpenseModal = ref(false)
    const showDeleteExpenseModal = ref(false)
    const showTransactionsModal = ref(false)
    const showDeleteTransactionModal = ref(false)

    // Current selections for modals
    const currentSection = ref(null) // 'basic' or 'other'
    const currentCategoryIndex = ref(null)
    const currentExpenseIndex = ref(null)
    const currentExpense = ref(null)
    const currentTransaction = ref(null)

    // Form inputs
    const newCategoryName = ref('')
    const newFirstExpenseName = ref('')
    const newFirstExpenseAmount = ref('')
    const newExpenseName = ref('')
    const newExpenseAmount = ref('')
    const newTransactionDescription = ref('')
    const newTransactionAmount = ref('')
    const newTransactionDate = ref(new Date().toISOString().split('T')[0]) // Today's date
    const editTransactionDescription = ref('')
    const editTransactionAmount = ref('')
    const editTransactionDate = ref('')

    // Actions
    const closeAllModals = () => {
        showResetModal.value = false
        showAddCategoryModal.value = false
        showDeleteCategoryModal.value = false
        showAddExpenseModal.value = false
        showDeleteExpenseModal.value = false
        showTransactionsModal.value = false
        showDeleteTransactionModal.value = false

        // Reset form values
        newCategoryName.value = ''
        newFirstExpenseName.value = ''
        newFirstExpenseAmount.value = ''
        newExpenseName.value = ''
        newExpenseAmount.value = ''
        newTransactionDescription.value = ''
        newTransactionAmount.value = ''
        newTransactionDate.value = new Date().toISOString().split('T')[0]
        editTransactionDescription.value = ''
        editTransactionAmount.value = ''
        editTransactionDate.value = ''

        // Reset current selections
        currentSection.value = null
        currentCategoryIndex.value = null
        currentExpenseIndex.value = null
        currentExpense.value = null
        currentTransaction.value = null
    }

    return {
        // State
        showResetModal,
        showAddCategoryModal,
        showDeleteCategoryModal,
        showAddExpenseModal,
        showDeleteExpenseModal,
        showTransactionsModal,
        showDeleteTransactionModal,
        currentSection,
        currentCategoryIndex,
        currentExpenseIndex,
        currentExpense,
        currentTransaction,
        newCategoryName,
        newFirstExpenseName,
        newFirstExpenseAmount,
        newExpenseName,
        newExpenseAmount,
        newTransactionDescription,
        newTransactionAmount,
        newTransactionDate,
        editTransactionDescription,
        editTransactionAmount,
        editTransactionDate,

        // Actions
        closeAllModals,
    }
})
