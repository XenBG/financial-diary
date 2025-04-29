<template>
    <!-- Main Container -->
    <div class="h-(100%+1.5rem) -my-4 w-full xl:-my-6">
        <div class="h-full overflow-y-auto">
            <div class="flex flex-col gap-4 px-0 py-4 xl:gap-6 xl:py-6">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup></script>
