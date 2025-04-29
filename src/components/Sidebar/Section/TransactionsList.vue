<template>
    <!-- Transactions List Section -->
    <section
        class="flex w-full flex-col items-stretch rounded-lg border border-solid border-slate-300 bg-white p-4 pb-0 dark:border-zinc-600 dark:bg-zinc-800"
    >
        <div class="flex items-center justify-start gap-3">
            <ReceiptTextIcon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
            <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Последно добавени трансакции</h2>
        </div>
        <div class="relative flex w-full flex-col gap-4 py-4">
            <template v-if="transactions.length === 0">
                <div class="py-4 text-center text-slate-500 dark:text-zinc-400">Няма добавени трансакции.</div>
            </template>

            <template v-else>
                <div
                    class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-white to-transparent dark:from-zinc-800"
                />

                <div class="-my-4 flex max-h-[400px] flex-col gap-4 overflow-y-auto py-4">
                    <template v-for="transaction in getSortedTransactions()" :key="transaction.id">
                        <div
                            class="flex items-stretch justify-between gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <input
                                    v-model="transaction.description"
                                    class="w-full border-none bg-transparent text-base font-medium text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                    type="text"
                                    @change="saveData"
                                />
                                <div class="flex flex-col gap-1">
                                    <span class="text-sm leading-tight text-slate-500 dark:text-zinc-400">
                                        {{ getExpenseName(transaction.expenseId) }}
                                    </span>
                                    <span class="text-sm leading-tight text-slate-500 dark:text-zinc-400">
                                        {{ formatDate(transaction.date) }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col items-end justify-between gap-2">
                                <div class="relative">
                                    <input
                                        v-model="transaction.amount"
                                        class="w-24 border-none bg-transparent pr-7 text-right text-base font-semibold text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        @change="saveData"
                                    />
                                    <span
                                        class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ CURRENCY }}
                                    </span>
                                </div>
                                <button
                                    class="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none dark:text-red-400 dark:hover:text-red-300"
                                    @click="openDeleteTransactionModal(transaction)"
                                >
                                    <Trash2Icon class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 w-full bg-gradient-to-t from-white to-transparent dark:from-zinc-800"
                />
            </template>
        </div>
    </section>
</template>

<script setup>
    import { ReceiptTextIcon, Trash2Icon } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useCalculationsStore } from '@/stores/calculations'
    import { useDiaryStore } from '@/stores/diary'
    import { useModalsStore } from '@/stores/modals'
    import { useTransactionsStore } from '@/stores/transactions'

    // Stores
    const diaryStore = useDiaryStore()
    const modalsStore = useModalsStore()
    const transactionsStore = useTransactionsStore()
    const calculationsStore = useCalculationsStore()

    // Constants
    const CURRENCY = computed(() => diaryStore.CURRENCY)

    // State
    const transactions = computed(() => diaryStore.transactions)

    // Methods
    const getSortedTransactions = () => {
        return transactionsStore.getSortedTransactions
    }

    const getExpenseName = (expenseId) => {
        return diaryStore.getExpenseName(expenseId)
    }

    const openDeleteTransactionModal = (transaction) => {
        modalsStore.currentTransaction = transaction
        modalsStore.showDeleteTransactionModal = true
    }

    const saveData = () => {
        diaryStore.saveData()
    }

    const formatDate = (dateString) => {
        return calculationsStore.formatDate(dateString)
    }
</script>
