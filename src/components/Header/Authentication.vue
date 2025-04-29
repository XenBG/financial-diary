<template>
    <button
        v-if="authStore.authenticated"
        class="group flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition-colors duration-200 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
        @click="authStore.logout"
    >
        <span
            class="text-base font-normal text-red-600 group-hover:text-red-700 group-focus:text-red-700 dark:text-red-400 dark:group-hover:text-red-300 dark:group-focus:text-red-300"
        >
            Изход
        </span>
    </button>

    <button
        v-else
        class="group flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition-colors duration-200 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
        @click="authStore.login"
    >
        <span
            class="text-base font-normal text-slate-700 group-hover:text-slate-800 group-focus:text-slate-800 dark:text-zinc-300 dark:group-hover:text-zinc-100 dark:group-focus:text-zinc-100"
        >
            Вход
        </span>
    </button>
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
</script>
