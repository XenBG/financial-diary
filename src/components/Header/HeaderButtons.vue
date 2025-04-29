<template>
    <div class="flex items-center gap-2">
        <template v-if="authStore.isAuthenticated">
            <button
                class="group flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white transition-colors duration-200 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
                @click="modalsStore.showResetModal = true"
            >
                <RefreshCcwIcon
                    class="h-4 w-4 text-red-600 group-hover:text-red-700 group-focus:text-red-700 dark:text-red-400 dark:group-hover:text-red-300 dark:group-focus:text-red-300"
                />
            </button>
        </template>

        <button
            class="group flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white transition-colors duration-200 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
            @click="toggleDark()"
        >
            <SunIcon v-if="isDark" class="h-4 w-4 text-amber-400 group-hover:text-amber-300 group-focus:text-amber-300" />
            <MoonIcon v-else class="h-4 w-4 text-blue-600 group-hover:text-blue-700 group-focus:text-blue-700" />
        </button>
    </div>
</template>

<script setup>
    import { useDark, useToggle } from '@vueuse/core'
    import { MoonIcon, RefreshCcwIcon, SunIcon } from 'lucide-vue-next'

    import { useAuthStore } from '@/stores/auth'
    import { useModalsStore } from '@/stores/modals'

    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const modalsStore = useModalsStore()
    const authStore = useAuthStore()
</script>
