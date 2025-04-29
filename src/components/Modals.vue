<template>
    <ResetModal />

    <AddCategoryModal />
    <DeleteCategoryModal />

    <AddExpenseModal />
    <DeleteExpenseModal />

    <TransactionsModal />
    <DeleteTransactionModal />
</template>

<script setup>
    import AddCategoryModal from '@/components/Modal/AddCategoryModal.vue'
    import AddExpenseModal from '@/components/Modal/AddExpenseModal.vue'
    import DeleteCategoryModal from '@/components/Modal/DeleteCategoryModal.vue'
    import DeleteExpenseModal from '@/components/Modal/DeleteExpenseModal.vue'
    import DeleteTransactionModal from '@/components/Modal/DeleteTransactionModal.vue'
    import ResetModal from '@/components/Modal/ResetModal.vue'
    import TransactionsModal from '@/components/Modal/TransactionsModal.vue'
</script>
