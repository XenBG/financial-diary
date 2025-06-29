<template>
    <div class="h-(100%+1.5rem) -my-4 w-full xl:-my-6">
        <div class="h-full overflow-y-auto">
            <div class="flex flex-col gap-4 px-0 py-4 xl:gap-6 xl:py-6">
                <div class="flex w-full flex-col items-start justify-center gap-4 md:gap-6">
                    <div class="flex flex-col items-start justify-center gap-4 md:gap-6">
                        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900"
                                    >
                                        <WalletCardsIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                        Управление на основна разполагаемост
                                    </h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Проследявайте Вашите приходи и започващ баланс. Лесно добавяйте и редактирайте суми, за да
                                    имате ясна представа за Вашата финансова ситуация.
                                </p>
                            </div>

                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900"
                                    >
                                        <CircleCheckIcon class="h-5 w-5 text-green-600 dark:text-green-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                        Основни категории разходи
                                    </h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Създайте и управлявайте основни категории като Храна, Транспорт, Забавления и други.
                                    Персонализирайте категориите според Вашите нужди.
                                </p>
                            </div>

                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900"
                                    >
                                        <ListIcon class="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">Подкатегории разходи</h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Разделете основните категории на по-детайлни подкатегории. Например, под Храна можете да имате
                                    Ресторанти, Хранителни магазини, Закуски и други.
                                </p>
                            </div>

                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900"
                                    >
                                        <ReceiptIcon class="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                        Управление на трансакции
                                    </h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Добавяйте и проследявайте всички Ваши разходи с детайлна информация. Виждайте история на
                                    трансакциите, филтрирайте по категории и анализирайте Вашите разходи във времето.
                                </p>
                            </div>

                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                                        <Trash2Icon class="h-5 w-5 text-red-600 dark:text-red-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                        Нулиране на трансакции
                                    </h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Изтрийте всички трансакции, като запазите текущата разполагаемост и разпределението ѝ по
                                    категории. Полезно при започване на нов период или при нужда от изчистване на историята.
                                </p>
                            </div>

                            <div
                                class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900"
                                    >
                                        <MoonIcon class="h-5 w-5 text-orange-600 dark:text-orange-300" />
                                    </div>
                                    <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">Тъмна тема</h3>
                                </div>
                                <p class="text-base text-slate-600 dark:text-zinc-300">
                                    Персонализирайте изгледа на приложението с тъмна тема, която е по-удобна за очите при
                                    използване през нощта или в слабо осветени помещения.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        class="mx-auto flex items-center justify-center gap-3 rounded-lg bg-indigo-600 px-5 py-3 text-lg transition-all duration-300 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:bg-indigo-700"
                        type="button"
                        @click.prevent="authStore.login"
                    >
                        <span class="text-lg font-semibold leading-none text-white">Започнете сега</span>
                        <ArrowRightIcon class="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ArrowRightIcon,
        CircleCheckIcon,
        ListIcon,
        MoonIcon,
        ReceiptIcon,
        Trash2Icon,
        WalletCardsIcon,
    } from 'lucide-vue-next'

    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
</script>
