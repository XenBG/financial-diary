import { defineStore } from 'pinia'

import { useDiaryStore } from './diary'
import { useModalsStore } from './modals'

export const useCategoriesStore = defineStore('categories', () => {
    const diaryStore = useDiaryStore()
    const modalsStore = useModalsStore()

    // Getters
    const getCategoryTotal = (section, categoryIndex) => {
        const expenses = section === 'basic' ? diaryStore.basicExpenses : diaryStore.otherExpenses
        if (!expenses[categoryIndex]) return 0
        return expenses[categoryIndex].expenses.reduce((sum, expense) => sum + diaryStore.safeParseFloat(expense.amount), 0)
    }

    const getCategorySpent = (section, categoryIndex) => {
        const expenses = section === 'basic' ? diaryStore.basicExpenses : diaryStore.otherExpenses
        if (!expenses[categoryIndex]) return 0
        return expenses[categoryIndex].expenses.reduce((sum, expense) => sum + diaryStore.getExpenseSpent(expense.id), 0)
    }

    const calculateCategorySpentPercentage = (section, categoryIndex) => {
        const total = getCategoryTotal(section, categoryIndex)
        if (total <= 0) return 0
        const spent = getCategorySpent(section, categoryIndex)
        const percentage = (spent / total) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    // Actions
    const toggleCategoryCollapse = (section, categoryIndex) => {
        if (!diaryStore.collapsedCategories[section]) {
            diaryStore.collapsedCategories[section] = {}
        }

        diaryStore.collapsedCategories[section][categoryIndex] = !diaryStore.collapsedCategories[section][categoryIndex]
    }

    const isCategoryCollapsed = (section, categoryIndex) => {
        if (!diaryStore.collapsedCategories[section]) {
            return false
        }

        return !!diaryStore.collapsedCategories[section][categoryIndex]
    }

    const moveCategory = (section, categoryIndex, direction) => {
        if (section === 'basic') {
            if (direction === 'up' && categoryIndex > 0) {
                const temp = diaryStore.basicExpenses[categoryIndex]
                diaryStore.basicExpenses[categoryIndex] = diaryStore.basicExpenses[categoryIndex - 1]
                diaryStore.basicExpenses[categoryIndex - 1] = temp
            } else if (direction === 'down' && categoryIndex < diaryStore.basicExpenses.length - 1) {
                const temp = diaryStore.basicExpenses[categoryIndex]
                diaryStore.basicExpenses[categoryIndex] = diaryStore.basicExpenses[categoryIndex + 1]
                diaryStore.basicExpenses[categoryIndex + 1] = temp
            }
        } else {
            if (direction === 'up' && categoryIndex > 0) {
                const temp = diaryStore.otherExpenses[categoryIndex]
                diaryStore.otherExpenses[categoryIndex] = diaryStore.otherExpenses[categoryIndex - 1]
                diaryStore.otherExpenses[categoryIndex - 1] = temp
            } else if (direction === 'down' && categoryIndex < diaryStore.otherExpenses.length - 1) {
                const temp = diaryStore.otherExpenses[categoryIndex]
                diaryStore.otherExpenses[categoryIndex] = diaryStore.otherExpenses[categoryIndex + 1]
                diaryStore.otherExpenses[categoryIndex + 1] = temp
            }
        }

        diaryStore.saveData()
    }

    const moveExpense = (section, categoryIndex, expenseIndex, direction) => {
        const expenses =
            section === 'basic'
                ? diaryStore.basicExpenses[categoryIndex].expenses
                : diaryStore.otherExpenses[categoryIndex].expenses

        if (direction === 'up' && expenseIndex > 0) {
            const temp = expenses[expenseIndex]
            expenses[expenseIndex] = expenses[expenseIndex - 1]
            expenses[expenseIndex - 1] = temp
        } else if (direction === 'down' && expenseIndex < expenses.length - 1) {
            const temp = expenses[expenseIndex]
            expenses[expenseIndex] = expenses[expenseIndex + 1]
            expenses[expenseIndex + 1] = temp
        }

        diaryStore.saveData()
    }

    const addCategory = () => {
        if (!modalsStore.newCategoryName.trim()) return

        const newCategory = {
            name: modalsStore.newCategoryName,
            expenses: [],
        }

        // Add first expense if provided
        if (modalsStore.newFirstExpenseName.trim() || modalsStore.newFirstExpenseAmount) {
            const expenseName = modalsStore.newFirstExpenseName.trim() || 'Нов разход'
            const expenseAmount = diaryStore.safeParseFloat(modalsStore.newFirstExpenseAmount)

            newCategory.expenses.push({
                id: 'expense-' + Date.now(),
                name: expenseName,
                amount: expenseAmount,
            })
        }

        if (modalsStore.currentSection === 'basic') {
            diaryStore.basicExpenses.push(newCategory)
        } else {
            diaryStore.otherExpenses.push(newCategory)
        }

        diaryStore.saveData()
        modalsStore.showAddCategoryModal = false
        modalsStore.newCategoryName = ''
        modalsStore.newFirstExpenseName = ''
        modalsStore.newFirstExpenseAmount = ''
    }

    const deleteCategory = () => {
        if (modalsStore.currentSection === 'basic') {
            // Delete all transactions for expenses in this category
            const category = diaryStore.basicExpenses[modalsStore.currentCategoryIndex]
            category.expenses.forEach((expense) => {
                diaryStore.transactions = diaryStore.transactions.filter((t) => t.expenseId !== expense.id)
            })

            // Remove the category
            diaryStore.basicExpenses.splice(modalsStore.currentCategoryIndex, 1)
        } else {
            // Delete all transactions for expenses in this category
            const category = diaryStore.otherExpenses[modalsStore.currentCategoryIndex]
            category.expenses.forEach((expense) => {
                diaryStore.transactions = diaryStore.transactions.filter((t) => t.expenseId !== expense.id)
            })

            // Remove the category
            diaryStore.otherExpenses.splice(modalsStore.currentCategoryIndex, 1)
        }

        diaryStore.saveData()
        modalsStore.showDeleteCategoryModal = false
    }

    const addExpense = () => {
        if (!modalsStore.newExpenseName.trim()) return

        const amount = diaryStore.safeParseFloat(modalsStore.newExpenseAmount)

        const newExpense = {
            id: 'expense-' + Date.now(),
            name: modalsStore.newExpenseName,
            amount: amount,
        }

        if (modalsStore.currentSection === 'basic') {
            diaryStore.basicExpenses[modalsStore.currentCategoryIndex].expenses.push(newExpense)
        } else {
            diaryStore.otherExpenses[modalsStore.currentCategoryIndex].expenses.push(newExpense)
        }

        diaryStore.saveData()
        modalsStore.showAddExpenseModal = false
        modalsStore.newExpenseName = ''
        modalsStore.newExpenseAmount = ''
    }

    const deleteExpense = () => {
        let expenseId

        if (modalsStore.currentSection === 'basic') {
            expenseId = diaryStore.basicExpenses[modalsStore.currentCategoryIndex].expenses[modalsStore.currentExpenseIndex].id
            diaryStore.basicExpenses[modalsStore.currentCategoryIndex].expenses.splice(modalsStore.currentExpenseIndex, 1)
        } else {
            expenseId = diaryStore.otherExpenses[modalsStore.currentCategoryIndex].expenses[modalsStore.currentExpenseIndex].id
            diaryStore.otherExpenses[modalsStore.currentCategoryIndex].expenses.splice(modalsStore.currentExpenseIndex, 1)
        }

        // Delete all transactions for this expense
        diaryStore.transactions = diaryStore.transactions.filter((t) => t.expenseId !== expenseId)

        diaryStore.saveData()
        modalsStore.showDeleteExpenseModal = false
    }

    return {
        // Getters
        getCategoryTotal,
        getCategorySpent,
        calculateCategorySpentPercentage,

        // Actions
        toggleCategoryCollapse,
        isCategoryCollapsed,
        moveCategory,
        moveExpense,
        addCategory,
        deleteCategory,
        addExpense,
        deleteExpense,
    }
})
