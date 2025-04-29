<template>
    <!-- Summary Section -->
    <section
        class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
    >
        <div class="flex items-center justify-start gap-3">
            <ChartBarIcon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
            <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Обобщение</h2>
        </div>
        <div class="flex w-full flex-col gap-4">
            <!-- Total Funds -->
            <div class="flex w-full flex-col gap-2">
                <div
                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                >
                    <div class="flex w-full items-center justify-between gap-4">
                        <div
                            class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                        >
                            Общо средства за разходване:
                        </div>
                        <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                            {{ formatCurrency(funds) }} {{ CURRENCY }}
                        </span>
                    </div>

                    <!-- Progress Bar for Allocated Amount -->
                    <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                        <div
                            class="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
                            :style="{ width: calculateAllocatedPercentage() + '%' }"
                        />
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-cyan-900 dark:bg-cyan-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                {{ calculateAllocatedPercentage() }}% са разпределени:
                            </span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(getTotalAllocated()) }} {{ CURRENCY }}
                        </span>
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                {{ formatCurrency(100 - calculateAllocatedPercentage()) }}% оставащи:
                            </span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(funds - getTotalAllocated()) }} {{ CURRENCY }}
                        </span>
                    </div>

                    <!-- Progress Bar for Spent Amount -->
                    <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                        <div
                            class="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
                            :style="{ width: calculateTotalSpentPercentage() + '%' }"
                        />
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-cyan-900 dark:bg-cyan-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                {{ calculateTotalSpentPercentage() }}% са изразходвани:
                            </span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(getTotalSpent()) }} {{ CURRENCY }}
                        </span>
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                {{ calculateRemainingAfterSpentPercentage() }}% оставащи:
                            </span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(getTotalAllocated() - getTotalSpent()) }} {{ CURRENCY }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="block h-px w-full px-2">
                <div class="h-px w-full border-t border-dashed border-slate-300 dark:border-zinc-600" />
            </div>

            <!-- Basic Expenses Breakdown -->
            <div
                class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
            >
                <div class="flex w-full items-center justify-between gap-4">
                    <div class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50">
                        Основни разходи:
                    </div>
                    <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                        {{ formatCurrency(getBasicExpensesTotal()) }} {{ CURRENCY }}
                    </span>
                </div>

                <!-- Progress Bar for Spent Amount -->
                <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                    <div
                        class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
                        :style="{ width: calculateBasicSpentPercentage() + '%' }"
                    />
                </div>

                <div class="flex items-start justify-between gap-4 px-1">
                    <div class="flex-start flex items-center gap-2">
                        <div class="block h-1 w-1 rounded bg-emerald-500 dark:bg-emerald-600" />
                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                            {{ calculateBasicSpentPercentage() }}% са изразходвани:
                        </span>
                    </div>
                    <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                        {{ formatCurrency(getBasicExpensesSpent()) }} {{ CURRENCY }}
                    </span>
                </div>

                <div class="flex items-start justify-between gap-4 px-1">
                    <div class="flex-start flex items-center gap-2">
                        <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(100 - calculateBasicSpentPercentage()) }}% оставащи:
                        </span>
                    </div>
                    <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                        {{ formatCurrency(getBasicExpensesTotal() - getBasicExpensesSpent()) }} {{ CURRENCY }}
                    </span>
                </div>
            </div>

            <!-- Other Expenses Breakdown -->
            <div
                class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
            >
                <div class="flex w-full items-center justify-between gap-4">
                    <div class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50">
                        Други разходи:
                    </div>
                    <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                        {{ formatCurrency(getOtherExpensesTotal()) }} {{ CURRENCY }}
                    </span>
                </div>

                <!-- Progress Bar for Spent Amount -->
                <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                    <div
                        class="h-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700"
                        :style="{ width: calculateOtherSpentPercentage() + '%' }"
                    />
                </div>

                <div class="flex items-start justify-between gap-4 px-1">
                    <div class="flex-start flex items-center gap-2">
                        <div class="block h-1 w-1 rounded bg-amber-900 dark:bg-amber-600" />
                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                            {{ calculateOtherSpentPercentage() }}% са изразходвани:
                        </span>
                    </div>
                    <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                        {{ formatCurrency(getOtherExpensesSpent()) }} {{ CURRENCY }}
                    </span>
                </div>

                <div class="flex items-start justify-between gap-4 px-1">
                    <div class="flex-start flex items-center gap-2">
                        <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(100 - calculateOtherSpentPercentage()) }}% оставащи:
                        </span>
                    </div>
                    <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                        {{ formatCurrency(getOtherExpensesTotal() - getOtherExpensesSpent()) }} {{ CURRENCY }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ChartBarIcon } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useCalculationsStore } from '@/stores/calculations'
    import { useDiaryStore } from '@/stores/diary'

    // Stores
    const diaryStore = useDiaryStore()
    const calculationsStore = useCalculationsStore()

    // Constants
    const CURRENCY = computed(() => diaryStore.CURRENCY)

    // State
    const funds = computed(() => diaryStore.funds)

    // Methods
    const getTotalAllocated = () => {
        return diaryStore.getTotalAllocated
    }

    const getTotalSpent = () => {
        return diaryStore.getTotalSpent
    }

    const getBasicExpensesTotal = () => {
        return diaryStore.getBasicExpensesTotal
    }

    const getOtherExpensesTotal = () => {
        return diaryStore.getOtherExpensesTotal
    }

    const getBasicExpensesSpent = () => {
        return diaryStore.getBasicExpensesSpent
    }

    const getOtherExpensesSpent = () => {
        return diaryStore.getOtherExpensesSpent
    }

    const calculateAllocatedPercentage = () => {
        return calculationsStore.calculateAllocatedPercentage
    }

    const calculateTotalSpentPercentage = () => {
        return calculationsStore.calculateTotalSpentPercentage
    }

    const calculateBasicSpentPercentage = () => {
        return calculationsStore.calculateBasicSpentPercentage
    }

    const calculateOtherSpentPercentage = () => {
        return calculationsStore.calculateOtherSpentPercentage
    }

    const calculateRemainingAfterSpentPercentage = () => {
        return calculationsStore.calculateRemainingAfterSpentPercentage
    }

    const formatCurrency = (value) => {
        return calculationsStore.formatCurrency(value)
    }
</script>
