<template>
    <TransitionRoot :show="showResetModal" appear as="template">
        <Dialog class="relative z-10" as="div" @close="closeModal">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25 dark:bg-black/50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="flex w-full max-w-2xl transform flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-800"
                        >
                            <DialogTitle class="text-xl font-semibold leading-6 text-slate-900 dark:text-zinc-100" as="h3">
                                Нулиране на данните
                            </DialogTitle>

                            <div class="mt-3">
                                <p class="text-base text-slate-700 dark:text-zinc-300">
                                    Сигурни ли сте, че искате да нулирате всички данни? Това ще изтрие всички разходи, трансакции
                                    и настройки. Действието е необратимо.
                                </p>
                            </div>

                            <div class="mt-6 flex justify-end gap-3">
                                <button
                                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-base font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                                    type="button"
                                    @click="closeModal"
                                >
                                    Отказ
                                </button>
                                <button
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-800"
                                    type="button"
                                    @click="resetData"
                                >
                                    Нулирай
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { computed } from 'vue'

    import { useDiaryStore } from '@/stores/diary'
    import { useModalsStore } from '@/stores/modals'

    // Stores
    const modalsStore = useModalsStore()
    const diaryStore = useDiaryStore()

    // State
    const showResetModal = computed({
        get: () => modalsStore.showResetModal,
        set: (value) => {
            modalsStore.showResetModal = value
        },
    })

    // Methods
    const closeModal = () => {
        showResetModal.value = false
    }

    const resetData = () => {
        diaryStore.resetData()
        closeModal()
    }
</script>
