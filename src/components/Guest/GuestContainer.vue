<template>
    <div class="h-(100%+1.5rem) -my-4 w-full xl:-my-6">
        <div class="h-full overflow-y-auto">
            <div class="flex flex-col gap-4 px-0 py-4 xl:gap-6 xl:py-6">
                <div class="flex w-full flex-col items-start justify-center gap-4 sm:gap-6 md:gap-8">
                    <h1 class="flex items-center justify-start gap-2">
                        <WalletCardsIcon class="h-6 w-6 text-slate-900 dark:text-zinc-100 sm:h-7 sm:w-7" />
                        <span
                            class="text-left text-lg font-semibold leading-normal text-slate-900 dark:text-zinc-100 sm:text-xl md:text-2xl"
                        >
                            Финансов дневник
                        </span>
                    </h1>

                    <div class="flex flex-col items-start justify-center gap-4">
                        <p
                            class="font-base text-left text-lg leading-normal text-slate-700 dark:text-zinc-200 sm:text-xl md:text-2xl"
                        >
                            Възможности на приложението:
                        </p>
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center gap-2">
                                <CircleCheckIcon class="h-4 w-4 text-green-600 dark:text-green-400 sm:h-5 sm:w-5" />
                                <span
                                    class="font-base text-left text-base leading-normal text-slate-700 dark:text-zinc-200 sm:text-lg md:text-xl"
                                >
                                    Въвеждане на основна разполагаемост.
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <CircleCheckIcon class="h-4 w-4 text-green-600 dark:text-green-400 sm:h-5 sm:w-5" />
                                <span
                                    class="font-base text-left text-base leading-normal text-slate-700 dark:text-zinc-200 sm:text-lg md:text-xl"
                                >
                                    Въвеждане на основни категории разходи.
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <CircleCheckIcon class="h-4 w-4 text-green-600 dark:text-green-400 sm:h-5 sm:w-5" />
                                <span
                                    class="font-base text-left text-base leading-normal text-slate-700 dark:text-zinc-200 sm:text-lg md:text-xl"
                                >
                                    Въвеждане на второстепенни категории разходи.
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <CircleCheckIcon class="h-4 w-4 text-green-600 dark:text-green-400 sm:h-5 sm:w-5" />
                                <span
                                    class="font-base text-left text-base leading-normal text-slate-700 dark:text-zinc-200 sm:text-lg md:text-xl"
                                >
                                    Управление на разходите чрез трансакции.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <button
                        class="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2.5 transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700 dark:focus:ring-offset-zinc-900"
                        type="button"
                        @click.prevent="authStore.login"
                    >
                        <span class="text-base font-semibold leading-none text-white">Започнете сега</span>
                        <ArrowRightIcon class="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ArrowRightIcon, CircleCheckIcon, WalletCardsIcon } from 'lucide-vue-next'

    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
</script>
