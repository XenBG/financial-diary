<template>
    <TransitionRoot :show="showTransactionsModal" appear as="template">
        <Dialog class="relative z-10" as="div" @close="closeModal">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25 dark:bg-black/50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="flex w-full max-w-2xl transform flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-800"
                        >
                            <DialogTitle class="text-lg font-medium leading-6 text-slate-900 dark:text-zinc-100" as="h3">
                                {{ currentExpense ? `Трансакции за "${currentExpense.name}"` : 'Трансакции' }}
                            </DialogTitle>

                            <!-- Existing Transactions -->
                            <template v-if="currentExpense">
                                <template v-if="getSortedExpenseTransactions(currentExpense.id).length === 0">
                                    <div
                                        class="flex flex-col items-center justify-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-900"
                                    >
                                        <InfoIcon class="h-6 w-6 text-slate-600 dark:text-zinc-300" />
                                        <p
                                            class="text-center text-base font-normal leading-none text-slate-600 dark:text-zinc-300"
                                        >
                                            В тази категория все още няма трансакции.
                                        </p>
                                    </div>
                                </template>

                                <template v-else>
                                    <div
                                        class="flex max-h-80 flex-col gap-4 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-900"
                                    >
                                        <template
                                            v-for="transaction in getSortedExpenseTransactions(currentExpense.id)"
                                            :key="transaction.id"
                                        >
                                            <div
                                                class="flex items-stretch justify-between gap-2 rounded-md border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
                                            >
                                                <div class="flex w-full flex-col gap-2">
                                                    <input
                                                        v-model="transaction.description"
                                                        class="w-full border-none bg-transparent text-base font-medium text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                                        type="text"
                                                        @change="saveData"
                                                    />
                                                    <div class="flex flex-col gap-1">
                                                        <span
                                                            class="text-sm font-semibold leading-none text-slate-600 dark:text-zinc-300"
                                                        >
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
                                </template>
                            </template>

                            <div class="block h-px w-full px-2">
                                <div class="h-px w-full border-t border-dashed border-slate-300 dark:border-zinc-600" />
                            </div>

                            <!-- Add New Transaction Form -->
                            <form
                                class="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-900"
                                @submit.prevent="addTransaction"
                            >
                                <h4 class="mb-3 font-medium text-slate-900 dark:text-zinc-100">Добавяне на нова трансакция</h4>
                                <div class="mb-3">
                                    <label
                                        class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300"
                                        for="transactionDescription"
                                    >
                                        Описание
                                    </label>
                                    <input
                                        id="transactionDescription"
                                        v-model="newTransactionDescription"
                                        class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                                        type="text"
                                        placeholder="Въведете описание"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                        class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300"
                                        for="transactionAmount"
                                    >
                                        Сума
                                    </label>
                                    <input
                                        id="transactionAmount"
                                        v-model="newTransactionAmount"
                                        class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                        class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300"
                                        for="transactionDate"
                                    >
                                        Дата
                                    </label>
                                    <input
                                        id="transactionDate"
                                        v-model="newTransactionDate"
                                        class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                                        type="date"
                                    />
                                </div>
                                <button
                                    class="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
                                    type="submit"
                                >
                                    Добави трансакция
                                </button>
                            </form>

                            <div class="mt-4 flex justify-end">
                                <button
                                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                                    type="button"
                                    @click="closeModal"
                                >
                                    Затвори
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { InfoIcon, Trash2Icon } from 'lucide-vue-next'
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
    const showTransactionsModal = computed({
        get: () => modalsStore.showTransactionsModal,
        set: (value) => {
            modalsStore.showTransactionsModal = value
        },
    })

    const currentExpense = computed(() => modalsStore.currentExpense)

    const newTransactionDescription = computed({
        get: () => modalsStore.newTransactionDescription,
        set: (value) => {
            modalsStore.newTransactionDescription = value
        },
    })

    const newTransactionAmount = computed({
        get: () => modalsStore.newTransactionAmount,
        set: (value) => {
            modalsStore.newTransactionAmount = value
        },
    })

    const newTransactionDate = computed({
        get: () => modalsStore.newTransactionDate,
        set: (value) => {
            modalsStore.newTransactionDate = value
        },
    })

    // Methods
    const closeModal = () => {
        showTransactionsModal.value = false
    }

    const getSortedExpenseTransactions = (expenseId) => {
        return transactionsStore.getSortedExpenseTransactions(expenseId)
    }

    const openDeleteTransactionModal = (transaction) => {
        modalsStore.currentTransaction = transaction
        modalsStore.showDeleteTransactionModal = true
    }

    const saveData = () => {
        diaryStore.saveData()
    }

    const addTransaction = () => {
        transactionsStore.addTransaction()
    }

    const formatDate = (dateString) => {
        return calculationsStore.formatDate(dateString)
    }
</script>
