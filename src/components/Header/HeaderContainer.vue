<template>
    <header
        class="flex items-center justify-between border-b border-slate-300 bg-white px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800 xl:px-6 xl:py-4"
    >
        <h1 class="flex items-center gap-2">
            <WalletCardsIcon class="h-5 w-5 text-slate-900 dark:text-zinc-100" />
            <span class="text-left font-medium uppercase leading-none text-slate-900 dark:text-zinc-100">Финансов дневник</span>
        </h1>

        <div class="flex items-center gap-4">
            <FundsInput v-if="authStore.isAuthenticated" />
            <HeaderButtons />

            <div class="h-4 w-px bg-slate-300 dark:bg-zinc-600" />

            <Authentication />
        </div>
    </header>
</template>

<script setup>
    import { WalletCardsIcon } from 'lucide-vue-next'

    import Authentication from '@/components/Header/Authentication.vue'
    import FundsInput from '@/components/Header/FundsInput.vue'
    import HeaderButtons from '@/components/Header/HeaderButtons.vue'

    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
</script>
