<template>
    <div class="flex items-center gap-2">
        <label class="whitespace-nowrap text-base font-medium leading-tight text-slate-900 dark:text-zinc-100" for="funds">
            Средства:
        </label>
        <div class="relative w-full">
            <input
                id="funds"
                v-model="diaryStore.funds"
                class="w-16 border-none bg-transparent pr-6 text-right text-base font-semibold leading-tight text-slate-900 outline-none focus:outline-none dark:bg-transparent dark:text-zinc-50"
                type="number"
                placeholder="0"
                min="0"
                name="funds"
                step="10"
                @change="saveFunds"
            />
            <label
                class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                for="funds"
            >
                {{ CURRENCY }}
            </label>
        </div>
    </div>
</template>

<script setup>
    import { useDiaryStore } from '@/stores/diary'

    import { CURRENCY } from '@/config/constants'

    // Stores
    const diaryStore = useDiaryStore()

    // Methods
    const saveFunds = () => {
        const fundsValue = diaryStore.safeParseFloat(diaryStore.funds)
        diaryStore.setFunds(fundsValue)
    }
</script>
