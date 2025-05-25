<template>
    <!-- Daily Spending Limit Section -->
    <section
        class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
    >
        <div class="flex items-center justify-start gap-3">
            <CalendarIcon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
            <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Дневен лимит за харчене</h2>
        </div>

        <div class="flex w-full flex-col gap-4">
            <!-- Next Salary Date -->
            <div class="flex w-full flex-col gap-2">
                <div
                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                >
                    <div class="flex w-full items-center justify-between gap-4">
                        <div
                            class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                        >
                            Следваща заплата:
                        </div>
                        <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                            {{ formatDate(salaryStore.getNextSalaryDate) }}
                        </span>
                    </div>

                    <!-- Progress Bar for Days -->
                    <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                        <div
                            class="h-full bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700"
                            :style="{ width: calculateDaysProgress() + '%' }"
                        />
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-rose-900 dark:bg-rose-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">Оставащи дни:</span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ salaryStore.getDaysUntilSalary }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Remaining Funds and Daily Limit -->
            <div class="flex w-full flex-col gap-2">
                <div
                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                >
                    <div class="flex w-full items-center justify-between gap-4">
                        <div
                            class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                        >
                            Оставащи средства:
                        </div>
                        <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                            {{ formatCurrency(salaryStore.getRemainingFunds) }} {{ CURRENCY }}
                        </span>
                    </div>

                    <!-- Progress Bar for Remaining Funds -->
                    <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                        <div
                            class="h-full bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-600 dark:to-lime-700"
                            :style="{ width: calculateFundsProgress() + '%' }"
                        />
                    </div>

                    <div class="flex items-start justify-between gap-4 px-1">
                        <div class="flex-start flex items-center gap-2">
                            <div class="block h-1 w-1 rounded bg-lime-900 dark:bg-lime-600" />
                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">Дневен лимит:</span>
                        </div>
                        <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                            {{ formatCurrency(salaryStore.getDailySpendingLimit) }} {{ CURRENCY }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { CalendarIcon } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useCalculationsStore } from '@/stores/calculations'
    import { useDiaryStore } from '@/stores/diary'
    import { useSalaryStore } from '@/stores/salary'

    // Stores
    const diaryStore = useDiaryStore()
    const salaryStore = useSalaryStore()
    const calculationsStore = useCalculationsStore()

    // Constants
    const CURRENCY = computed(() => diaryStore.CURRENCY)

    // Methods
    const formatCurrency = (value) => {
        return calculationsStore.formatCurrency(value)
    }

    const formatDate = (dateString) => {
        return calculationsStore.formatDate(dateString)
    }

    const calculateDaysProgress = () => {
        const today = new Date()

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        const totalDays = lastDayOfMonth.getDate()
        const remainingDays = salaryStore.getDaysUntilSalary

        return Math.min(100, Math.max(0, ((totalDays - remainingDays) / totalDays) * 100))
    }

    const calculateFundsProgress = () => {
        const totalFunds = diaryStore.funds
        const remainingFunds = salaryStore.getRemainingFunds

        return Math.min(100, Math.max(0, ((totalFunds - remainingFunds) / totalFunds) * 100))
    }
</script>
