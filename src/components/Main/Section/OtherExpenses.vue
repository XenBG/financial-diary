<template>
    <!-- Other Expenses Section -->
    <section
        class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
    >
        <div class="flex items-center justify-start gap-3">
            <!-- Heading -->
            <div class="flex w-full items-center justify-start gap-3">
                <FolderIcon class="h-4 w-4 text-red-500 dark:text-red-400" />
                <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Други разходи</h2>
            </div>

            <!-- Control Buttons -->
            <div class="flex items-center justify-end gap-2">
                <button
                    class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                    title="Добавяне на нова категория"
                    @click="openAddCategoryModal('other')"
                >
                    <FolderPlusIcon
                        class="h-full w-full text-slate-700 transition-all duration-200 hover:text-slate-900 dark:text-zinc-300 hover:dark:text-zinc-100"
                    />
                </button>
            </div>
        </div>
        <div class="flex w-full flex-col gap-4">
            <template v-if="otherExpenses.length === 0">
                <div
                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                >
                    <p class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50">
                        Няма добавени категории.
                    </p>
                </div>
            </template>

            <template v-else>
                <!-- Category Loop -->
                <div
                    v-for="(category, categoryIndex) in otherExpenses"
                    :key="'other-' + categoryIndex"
                    class="flex w-full flex-col items-stretch rounded-md border border-solid border-slate-300 bg-slate-50 dark:border-zinc-600 dark:bg-zinc-900"
                >
                    <!-- Heading -->
                    <div class="flex items-center justify-start gap-3 p-4">
                        <div class="flex w-full items-center justify-start gap-3">
                            <button class="focus:outline-none" @click="toggleCategoryCollapse('other', categoryIndex)">
                                <FolderOpenIcon
                                    v-if="!isCategoryCollapsed('other', categoryIndex)"
                                    class="h-4 w-4 text-amber-500 dark:text-amber-400"
                                />
                                <FolderIcon v-else class="h-4 w-4 text-amber-500 dark:text-amber-400" />
                            </button>
                            <input
                                v-model="category.name"
                                class="h-full w-full border-none bg-transparent text-lg font-medium leading-none text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                type="text"
                                @change="saveData"
                            />
                        </div>

                        <!-- Control Buttons -->
                        <div class="flex items-center justify-end gap-2">
                            <!-- Move Category Up/Down -->
                            <button
                                v-if="categoryIndex > 0"
                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                title="Преместване нагоре"
                                @click="moveCategory('other', categoryIndex, 'up')"
                            >
                                <ChevronUpIcon
                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                />
                            </button>
                            <button
                                v-if="categoryIndex < otherExpenses.length - 1"
                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                title="Преместване надолу"
                                @click="moveCategory('other', categoryIndex, 'down')"
                            >
                                <ChevronDownIcon
                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                />
                            </button>

                            <button
                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                title="Добавяне на нов разход"
                                @click="openAddExpenseModal('other', categoryIndex)"
                            >
                                <FilePlusIcon
                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                />
                            </button>

                            <button
                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                title="Изтриване на категорията"
                                @click="openDeleteCategoryModal('other', categoryIndex)"
                            >
                                <Trash2Icon
                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- Expenses List -->
                    <div
                        v-if="!isCategoryCollapsed('other', categoryIndex)"
                        class="flex w-full flex-col gap-px overflow-hidden rounded-bl rounded-br border-t border-solid border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-800/40"
                    >
                        <template v-if="category.expenses.length === 0">
                            <div class="flex w-full items-center justify-start gap-3 p-4 pl-11">
                                <p
                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                >
                                    Няма добавени разходи.
                                </p>
                            </div>
                        </template>

                        <template v-else>
                            <!-- Expense Item Loop -->
                            <div
                                v-for="(expense, expenseIndex) in category.expenses"
                                :key="expense.id"
                                class="flex w-full text-slate-900 ring-1 ring-slate-300 dark:text-zinc-100 dark:ring-zinc-600"
                            >
                                <div class="grid w-full grid-cols-5 gap-px ring-1 ring-slate-300 dark:ring-zinc-600">
                                    <div class="relative col-span-3 h-10 w-full">
                                        <FileIcon
                                            class="pointer-events-none absolute left-11 top-1/2 h-4 w-4 -translate-y-1/2 select-none text-slate-700 dark:text-zinc-300"
                                        />
                                        <input
                                            v-model="expense.name"
                                            class="h-full w-full border-none bg-transparent pl-16 text-base outline-none focus:outline-none"
                                            type="text"
                                            @change="saveData"
                                        />
                                    </div>
                                    <div class="relative col-span-1 h-10 w-full">
                                        <input
                                            :id="expense.id"
                                            v-model="expense.amount"
                                            class="h-full w-full border-none bg-transparent pr-7 text-right text-base font-semibold leading-tight text-slate-900 placeholder-opacity-100 outline-none placeholder:text-slate-400 focus:outline-none dark:bg-transparent dark:text-zinc-50 dark:placeholder:text-zinc-400"
                                            :name="expense.id"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            step="0.01"
                                            @change="saveData"
                                        />
                                        <label
                                            class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                            :for="expense.id"
                                        >
                                            {{ CURRENCY }}
                                        </label>
                                    </div>
                                    <div class="col-span-1 flex h-10 w-full items-center justify-end gap-2 pr-4">
                                        <!-- Move Expense Up/Down -->
                                        <button
                                            v-if="expenseIndex > 0"
                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                            title="Преместване нагоре"
                                            @click="moveExpense('other', categoryIndex, expenseIndex, 'up')"
                                        >
                                            <ChevronUpIcon
                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                            />
                                        </button>
                                        <button
                                            v-if="expenseIndex < category.expenses.length - 1"
                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                            title="Преместване надолу"
                                            @click="moveExpense('other', categoryIndex, expenseIndex, 'down')"
                                        >
                                            <ChevronDownIcon
                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                            />
                                        </button>

                                        <button
                                            class="group flex items-center gap-2 border-none outline-none focus:outline-none"
                                            title="Преглед и добавяне на трансакция"
                                            @click="openTransactionsModal('other', categoryIndex, expenseIndex)"
                                        >
                                            <span
                                                class="text-sm font-normal leading-tight text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                            >
                                                {{ getTransactionsCount(expense.id) }}
                                            </span>
                                            <ReceiptTextIcon
                                                class="h-4 w-4 text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                            />
                                        </button>

                                        <button
                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                            title="Изтриване на разхода"
                                            @click="openDeleteExpenseModal('other', categoryIndex, expenseIndex)"
                                        >
                                            <Trash2Icon
                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                            />
                                        </button>
                                    </div>
                                    <div class="col-span-5 flex flex-col items-start justify-start gap-2 px-4 pb-4 pl-11">
                                        <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                            <div
                                                class="h-full bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700"
                                                :style="{ width: calculateExpenseSpentPercentage(expense) + '%' }"
                                            />
                                        </div>

                                        <div class="flex w-full items-start justify-between gap-4 px-1">
                                            <div class="flex-start flex items-center gap-2">
                                                <div class="block h-1 w-1 rounded bg-sky-500 dark:bg-sky-600" />
                                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                    {{ calculateExpenseSpentPercentage(expense) }}% са изразходвани
                                                </span>
                                            </div>
                                            <span
                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                            >
                                                {{ formatCurrency(getExpenseSpent(expense.id)) }}
                                                {{ CURRENCY }} от
                                                <span class="font-bold">{{ formatCurrency(expense.amount) }} {{ CURRENCY }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <!-- Category Summary -->
                    <div class="flex w-full flex-col gap-2 border-t border-solid border-slate-300 p-4 dark:border-zinc-600">
                        <div class="flex w-full items-center justify-between gap-4">
                            <div
                                class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                            >
                                Общо за категорията:
                            </div>
                            <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                                {{ formatCurrency(getCategoryTotal('other', categoryIndex)) }} {{ CURRENCY }}
                            </span>
                        </div>

                        <!-- Progress Bar for Spent Amount -->
                        <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                            <div
                                class="h-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700"
                                :style="{ width: calculateCategorySpentPercentage('other', categoryIndex) + '%' }"
                            />
                        </div>

                        <div class="flex items-start justify-between gap-4 px-1">
                            <div class="flex-start flex items-center gap-2">
                                <div class="block h-1 w-1 rounded bg-amber-900 dark:bg-amber-600" />
                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ calculateCategorySpentPercentage('other', categoryIndex) }}% са изразходвани:
                                </span>
                            </div>
                            <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                {{ formatCurrency(getCategorySpent('other', categoryIndex)) }} {{ CURRENCY }}
                            </span>
                        </div>

                        <div class="flex items-start justify-between gap-4 px-1">
                            <div class="flex-start flex items-center gap-2">
                                <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ formatCurrency(100 - calculateCategorySpentPercentage('other', categoryIndex)) }}%
                                    оставащи:
                                </span>
                            </div>
                            <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                {{
                                    formatCurrency(
                                        getCategoryTotal('other', categoryIndex) - getCategorySpent('other', categoryIndex),
                                    )
                                }}
                                {{ CURRENCY }}
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup>
    import {
        ChevronDownIcon,
        ChevronUpIcon,
        FileIcon,
        FilePlusIcon,
        FolderIcon,
        FolderOpenIcon,
        FolderPlusIcon,
        ReceiptTextIcon,
        Trash2Icon,
    } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useCalculationsStore } from '@/stores/calculations'
    import { useCategoriesStore } from '@/stores/categories'
    import { useDiaryStore } from '@/stores/diary'
    import { useModalsStore } from '@/stores/modals'
    import { useTransactionsStore } from '@/stores/transactions'

    // Stores
    const diaryStore = useDiaryStore()
    const categoriesStore = useCategoriesStore()
    const modalsStore = useModalsStore()
    const transactionsStore = useTransactionsStore()
    const calculationsStore = useCalculationsStore()

    // Constants
    const CURRENCY = computed(() => diaryStore.CURRENCY)

    // State
    const otherExpenses = computed(() => diaryStore.otherExpenses)

    // Methods
    const toggleCategoryCollapse = (section, categoryIndex) => {
        categoriesStore.toggleCategoryCollapse(section, categoryIndex)
    }

    const isCategoryCollapsed = (section, categoryIndex) => {
        return categoriesStore.isCategoryCollapsed(section, categoryIndex)
    }

    const moveCategory = (section, categoryIndex, direction) => {
        categoriesStore.moveCategory(section, categoryIndex, direction)
    }

    const moveExpense = (section, categoryIndex, expenseIndex, direction) => {
        categoriesStore.moveExpense(section, categoryIndex, expenseIndex, direction)
    }

    const openAddCategoryModal = (section) => {
        modalsStore.currentSection = section
        modalsStore.showAddCategoryModal = true
    }

    const openDeleteCategoryModal = (section, categoryIndex) => {
        modalsStore.currentSection = section
        modalsStore.currentCategoryIndex = categoryIndex
        modalsStore.showDeleteCategoryModal = true
    }

    const openAddExpenseModal = (section, categoryIndex) => {
        modalsStore.currentSection = section
        modalsStore.currentCategoryIndex = categoryIndex
        modalsStore.showAddExpenseModal = true
    }

    const openDeleteExpenseModal = (section, categoryIndex, expenseIndex) => {
        modalsStore.currentSection = section
        modalsStore.currentCategoryIndex = categoryIndex
        modalsStore.currentExpenseIndex = expenseIndex
        modalsStore.showDeleteExpenseModal = true
    }

    const openTransactionsModal = (section, categoryIndex, expenseIndex) => {
        modalsStore.currentSection = section
        modalsStore.currentCategoryIndex = categoryIndex
        modalsStore.currentExpenseIndex = expenseIndex
        modalsStore.currentExpense = otherExpenses.value[categoryIndex].expenses[expenseIndex]
        modalsStore.showTransactionsModal = true
    }

    const saveData = () => {
        diaryStore.saveData()
    }

    const getTransactionsCount = (expenseId) => {
        return transactionsStore.getTransactionsCount(expenseId)
    }

    const getExpenseSpent = (expenseId) => {
        return diaryStore.getExpenseSpent(expenseId)
    }

    const getCategoryTotal = (section, categoryIndex) => {
        return categoriesStore.getCategoryTotal(section, categoryIndex)
    }

    const getCategorySpent = (section, categoryIndex) => {
        return categoriesStore.getCategorySpent(section, categoryIndex)
    }

    const calculateExpenseSpentPercentage = (expense) => {
        const total = diaryStore.safeParseFloat(expense.amount)
        if (total <= 0) return 0
        const spent = getExpenseSpent(expense.id)
        const percentage = (spent / total) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const calculateCategorySpentPercentage = (section, categoryIndex) => {
        return categoriesStore.calculateCategorySpentPercentage(section, categoryIndex)
    }

    const formatCurrency = (value) => {
        return calculationsStore.formatCurrency(value)
    }
</script>
