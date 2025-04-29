<template>
    <TransitionRoot :show="showAddExpenseModal" appear as="template">
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
                            <DialogTitle class="text-xl font-semibold leading-6 text-slate-900 dark:text-zinc-100" as="h3">
                                Добавяне на нов разход
                            </DialogTitle>

                            <div class="mt-4">
                                <div class="mb-4">
                                    <label
                                        class="mb-2 block text-base font-medium text-slate-700 dark:text-zinc-300"
                                        for="expenseName"
                                    >
                                        Име на разхода
                                    </label>
                                    <input
                                        id="expenseName"
                                        v-model="newExpenseName"
                                        class="w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                                        type="text"
                                        placeholder="Въведете име на разхода"
                                    />
                                </div>
                                <div class="mb-4">
                                    <label
                                        class="mb-2 block text-base font-medium text-slate-700 dark:text-zinc-300"
                                        for="expenseAmount"
                                    >
                                        Сума
                                    </label>
                                    <input
                                        id="expenseAmount"
                                        v-model="newExpenseAmount"
                                        class="w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div class="mt-6 flex justify-end gap-3">
                                <button
                                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-base font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                                    type="button"
                                    @click="closeModal"
                                >
                                    Отказ
                                </button>
                                <button
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                                    type="button"
                                    @click="addExpense"
                                >
                                    Добави
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
    import { computed } from 'vue'

    import { useCategoriesStore } from '@/stores/categories'
    import { useModalsStore } from '@/stores/modals'

    // Stores
    const categoriesStore = useCategoriesStore()
    const modalsStore = useModalsStore()

    // State
    const showAddExpenseModal = computed({
        get: () => modalsStore.showAddExpenseModal,
        set: (value) => {
            modalsStore.showAddExpenseModal = value
        },
    })

    const newExpenseName = computed({
        get: () => modalsStore.newExpenseName,
        set: (value) => {
            modalsStore.newExpenseName = value
        },
    })

    const newExpenseAmount = computed({
        get: () => modalsStore.newExpenseAmount,
        set: (value) => {
            modalsStore.newExpenseAmount = value
        },
    })

    // Methods
    const closeModal = () => {
        showAddExpenseModal.value = false
    }

    const addExpense = () => {
        categoriesStore.addExpense()
    }
</script>
