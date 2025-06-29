<template>
    <!-- Spending by Description Section -->
    <section
        class="flex w-full flex-col items-stretch rounded-lg border border-solid border-slate-300 bg-white p-4 pb-0 dark:border-zinc-600 dark:bg-zinc-800"
    >
        <div class="flex items-center justify-start gap-3">
            <BarChart3Icon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
            <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Разходи по описание</h2>
        </div>
        <div class="relative flex w-full flex-col gap-4 py-4">
            <template v-if="spendingByDescription.length === 0">
                <div class="py-4 text-center text-slate-500 dark:text-zinc-400">Няма добавени разходи.</div>
            </template>

            <template v-else>
                <div
                    class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-white to-transparent dark:from-zinc-800"
                />

                <div class="-my-4 flex max-h-[400px] flex-col gap-4 overflow-y-auto py-4">
                    <template v-for="(item, index) in spendingByDescription" :key="item.description">
                        <div
                            class="flex flex-col gap-1 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                        >
                            <!-- Main description header -->
                            <div class="flex w-full items-center justify-between gap-4">
                                <div
                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                >
                                    {{ item.description }}:
                                </div>
                                <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                                    {{ formatCurrency(item.totalAmount) }} {{ CURRENCY }}
                                </span>
                            </div>

                            <!-- Transaction count -->
                            <div class="pb-4 text-sm leading-tight text-slate-500 dark:text-zinc-400">
                                {{ item.totalCount }} {{ item.totalCount === 1 ? 'трансакция' : 'трансакции' }}
                            </div>

                            <!-- Subcategories with indentation -->
                            <div class="flex flex-col gap-2">
                                <template v-for="(subcategory, subIndex) in item.subcategories" :key="subcategory.expenseName">
                                    <div class="flex items-start justify-between gap-4">
                                        <div class="flex-start flex items-center gap-2">
                                            <div
                                                class="block h-1 w-1 shrink-0 grow-0 basis-auto rounded"
                                                :class="getSubcategoryColor(index, subIndex)"
                                            />
                                            <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                {{ subcategory.expenseName }}
                                            </span>
                                        </div>
                                        <span
                                            class="whitespace-nowrap text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                        >
                                            {{ formatCurrency(subcategory.amount) }} {{ CURRENCY }}
                                        </span>
                                    </div>
                                </template>
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
    import { BarChart3Icon } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useCalculationsStore } from '@/stores/calculations'
    import { useDiaryStore } from '@/stores/diary'

    // Stores
    const diaryStore = useDiaryStore()
    const calculationsStore = useCalculationsStore()

    // Constants
    const CURRENCY = computed(() => diaryStore.CURRENCY)

    // Computed
    const spendingByDescription = computed(() => {
        const descriptionGroups = {}

        // Group transactions by description
        diaryStore.transactions.forEach((transaction) => {
            const description = transaction.description || 'Без описание'
            const amount = diaryStore.safeParseFloat(transaction.amount)
            const expenseName = diaryStore.getExpenseName(transaction.expenseId)

            if (!descriptionGroups[description]) {
                descriptionGroups[description] = {
                    description: description,
                    totalAmount: 0,
                    totalCount: 0,
                    subcategories: {},
                }
            }

            descriptionGroups[description].totalAmount += amount
            descriptionGroups[description].totalCount += 1

            // Group by expense name within this description
            if (!descriptionGroups[description].subcategories[expenseName]) {
                descriptionGroups[description].subcategories[expenseName] = {
                    expenseName: expenseName,
                    amount: 0,
                    count: 0,
                }
            }

            descriptionGroups[description].subcategories[expenseName].amount += amount
            descriptionGroups[description].subcategories[expenseName].count += 1
        })

        // Convert subcategories to arrays and sort
        Object.values(descriptionGroups).forEach((group) => {
            group.subcategories = Object.values(group.subcategories).sort((a, b) => b.amount - a.amount)
        })

        // Convert to array and sort by total amount (descending)
        return Object.values(descriptionGroups).sort((a, b) => b.totalAmount - a.totalAmount)
    })

    // Methods
    const formatCurrency = (value) => {
        return calculationsStore.formatCurrency(value)
    }

    const getSubcategoryColor = (descriptionIndex, subcategoryIndex) => {
        const colors = [
            'bg-red-500 dark:bg-red-600',
            'bg-orange-500 dark:bg-orange-600',
            'bg-amber-500 dark:bg-amber-600',
            'bg-yellow-500 dark:bg-yellow-600',
            'bg-lime-500 dark:bg-lime-600',
            'bg-green-500 dark:bg-green-600',
            'bg-emerald-500 dark:bg-emerald-600',
            'bg-teal-500 dark:bg-teal-600',
            'bg-cyan-500 dark:bg-cyan-600',
            'bg-sky-500 dark:bg-sky-600',
            'bg-blue-500 dark:bg-blue-600',
            'bg-indigo-500 dark:bg-indigo-600',
            'bg-violet-500 dark:bg-violet-600',
            'bg-purple-500 dark:bg-purple-600',
            'bg-fuchsia-500 dark:bg-fuchsia-600',
            'bg-pink-500 dark:bg-pink-600',
            'bg-rose-500 dark:bg-rose-600',
        ]

        const colorIndex = (descriptionIndex + subcategoryIndex) % colors.length
        return colors[colorIndex]
    }
</script>
