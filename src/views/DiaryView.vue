<template>
    <template v-if="authStore.isAuthenticated">
        <MainContainer>
            <BasicExpenses />
            <OtherExpenses />
        </MainContainer>

        <SidebarContainer>
            <Summary />
            <DailySpendingLimit />
            <TransactionsList />
            <SpendingByDescription />
        </SidebarContainer>

        <Modals />
    </template>

    <template v-else>
        <GuestContainer />
    </template>
</template>

<script setup>
    import GuestContainer from '@/components/Guest/GuestContainer.vue'
    import MainContainer from '@/components/Main/MainContainer.vue'
    import BasicExpenses from '@/components/Main/Section/BasicExpenses.vue'
    import OtherExpenses from '@/components/Main/Section/OtherExpenses.vue'
    import Modals from '@/components/Modals.vue'
    import DailySpendingLimit from '@/components/Sidebar/Section/DailySpendingLimit.vue'
    import SpendingByDescription from '@/components/Sidebar/Section/SpendingByDescription.vue'
    import Summary from '@/components/Sidebar/Section/Summary.vue'
    import TransactionsList from '@/components/Sidebar/Section/TransactionsList.vue'
    import SidebarContainer from '@/components/Sidebar/SidebarContainer.vue'
    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
</script>
