<template>
    <header
        class="flex items-center justify-between border-b border-slate-300 bg-white px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800 xl:px-6 xl:py-4"
    >
        <h1 class="text-lg font-medium uppercase text-slate-900 dark:text-zinc-100">Финансов дневник</h1>
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
                <label
                    class="whitespace-nowrap text-base font-medium leading-tight text-slate-900 dark:text-zinc-100"
                    for="funds"
                >
                    Средства:
                </label>
                <div class="relative w-full">
                    <input
                        id="funds"
                        v-model="funds"
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
            <div class="flex items-center gap-2">
                <button
                    class="rounded-lg border border-slate-300 bg-white p-2 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    @click="toggleDark()"
                >
                    <SunIcon v-if="isDark" class="h-4 w-4 text-amber-500 dark:text-amber-400" />
                    <MoonIcon v-else class="h-4 w-4 text-slate-600 dark:text-blue-400" />
                </button>
                <button
                    class="rounded-lg border border-slate-300 bg-white p-2 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    @click="showResetModal = true"
                >
                    <RefreshCcwIcon class="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { useDark, useToggle } from '@vueuse/core'
    import { MoonIcon, RefreshCcwIcon, SunIcon } from 'lucide-vue-next'
    import { computed } from 'vue'

    import { useDiaryStore } from '../stores/diary'
    import { useModalsStore } from '../stores/modals'

    const diaryStore = useDiaryStore()
    const modalsStore = useModalsStore()

    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const CURRENCY = computed(() => diaryStore.CURRENCY)

    const funds = computed({
        get: () => diaryStore.funds,
        set: (value) => {
            diaryStore.funds = value
        },
    })

    const showResetModal = computed({
        get: () => modalsStore.showResetModal,
        set: (value) => {
            modalsStore.showResetModal = value
        },
    })

    const saveFunds = () => {
        diaryStore.saveFunds()
    }
</script>
