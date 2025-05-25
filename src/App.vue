<template>
    <HeaderContainer />

    <div class="relative mx-auto flex h-full w-full max-w-screen-xl items-stretch gap-4 overflow-hidden p-4 xl:gap-6 xl:p-6">
        <div
            class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-slate-100 to-transparent dark:from-zinc-900 xl:h-6"
        />

        <router-view />

        <div
            class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 w-full bg-gradient-to-t from-slate-100 to-transparent dark:from-zinc-900 xl:h-6"
        />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'

    import HeaderContainer from '@/components/Header/HeaderContainer.vue'
    import { useDiaryStore } from '@/stores/diary'

    const diaryStore = useDiaryStore()

    onMounted(() => {
        diaryStore.loadData()
    })
</script>
