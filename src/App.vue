<template>
    <!-- Header -->
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

    <div class="relative mx-auto flex h-full w-full max-w-screen-xl items-stretch gap-4 overflow-hidden p-4 xl:gap-6 xl:p-6">
        <div
            class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-slate-100 to-transparent dark:from-zinc-900 xl:h-6"
        />

        <!-- Main Container -->
        <div class="h-(100%+1.5rem) -my-4 w-full xl:-my-6">
            <div class="h-full overflow-y-auto">
                <div class="flex flex-col gap-4 px-0 py-4 xl:gap-6 xl:py-6">
                    <!-- Basic Expenses Section -->
                    <section
                        class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
                    >
                        <div class="flex items-center justify-start gap-3">
                            <!-- Heading -->
                            <div class="flex w-full items-center justify-start gap-3">
                                <FolderIcon class="h-4 w-4 text-red-500 dark:text-red-400" />
                                <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">
                                    Основни разходи
                                </h2>
                            </div>

                            <!-- Control Buttons -->
                            <div class="flex items-center justify-end gap-2">
                                <button
                                    class="h-4 w-4 border-none outline-none focus:outline-none"
                                    title="Добавяне на нова категория"
                                    @click="openAddCategoryModal('basic')"
                                >
                                    <FolderPlusIcon
                                        class="h-full w-full text-slate-700 transition-all duration-200 hover:text-slate-900 dark:text-zinc-300 hover:dark:text-zinc-100"
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="flex w-full flex-col gap-4">
                            <template v-if="basicExpenses.length === 0">
                                <div
                                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                                >
                                    <p
                                        class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                    >
                                        Няма добавени категории.
                                    </p>
                                </div>
                            </template>

                            <template v-else>
                                <!-- Category Loop -->
                                <div
                                    v-for="(category, categoryIndex) in basicExpenses"
                                    :key="'basic-' + categoryIndex"
                                    class="flex w-full flex-col items-stretch rounded-md border border-solid border-slate-300 bg-slate-50 dark:border-zinc-600 dark:bg-zinc-900"
                                >
                                    <!-- Heading -->
                                    <div class="flex items-center justify-start gap-3 p-4">
                                        <div class="flex w-full items-center justify-start gap-3">
                                            <button
                                                class="focus:outline-none"
                                                @click="toggleCategoryCollapse('basic', categoryIndex)"
                                            >
                                                <FolderOpenIcon
                                                    v-if="!isCategoryCollapsed('basic', categoryIndex)"
                                                    class="h-4 w-4 text-amber-500 dark:text-amber-400"
                                                />
                                                <FolderIcon v-else class="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                            </button>
                                            <input
                                                v-model="category.name"
                                                class="h-full w-full border-none bg-transparent text-lg font-medium leading-none text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                                type="text"
                                                @change="saveData"
                                            />
                                        </div>

                                        <!-- Control Buttons -->
                                        <div class="flex items-center justify-end gap-2">
                                            <!-- Move Category Up/Down -->
                                            <button
                                                v-if="categoryIndex > 0"
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Преместване нагоре"
                                                @click="moveCategory('basic', categoryIndex, 'up')"
                                            >
                                                <ChevronUpIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>
                                            <button
                                                v-if="categoryIndex < basicExpenses.length - 1"
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Преместване надолу"
                                                @click="moveCategory('basic', categoryIndex, 'down')"
                                            >
                                                <ChevronDownIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>

                                            <button
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Добавяне на нов разход"
                                                @click="openAddExpenseModal('basic', categoryIndex)"
                                            >
                                                <FilePlusIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>

                                            <button
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Изтриване на категорията"
                                                @click="openDeleteCategoryModal('basic', categoryIndex)"
                                            >
                                                <Trash2Icon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Expenses List -->
                                    <div
                                        v-if="!isCategoryCollapsed('basic', categoryIndex)"
                                        class="flex w-full flex-col gap-px overflow-hidden rounded-bl rounded-br border-t border-solid border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-800/40"
                                    >
                                        <template v-if="category.expenses.length === 0">
                                            <div class="flex w-full items-center justify-start gap-3 p-4 pl-11">
                                                <p
                                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                                >
                                                    Няма добавени разходи.
                                                </p>
                                            </div>
                                        </template>

                                        <template v-else>
                                            <!-- Expense Item Loop -->
                                            <div
                                                v-for="(expense, expenseIndex) in category.expenses"
                                                :key="expense.id"
                                                class="flex w-full text-slate-900 ring-1 ring-slate-300 dark:text-zinc-100 dark:ring-zinc-600"
                                            >
                                                <div
                                                    class="grid w-full grid-cols-5 gap-px ring-1 ring-slate-300 dark:ring-zinc-600"
                                                >
                                                    <div class="relative col-span-3 h-10 w-full">
                                                        <FileIcon
                                                            class="pointer-events-none absolute left-11 top-1/2 h-4 w-4 -translate-y-1/2 select-none text-slate-700 dark:text-zinc-300"
                                                        />
                                                        <input
                                                            v-model="expense.name"
                                                            class="h-full w-full border-none bg-transparent pl-16 text-base outline-none focus:outline-none"
                                                            type="text"
                                                            @change="saveData"
                                                        />
                                                    </div>
                                                    <div class="relative col-span-1 h-10 w-full">
                                                        <input
                                                            :id="expense.id"
                                                            v-model="expense.amount"
                                                            class="h-full w-full border-none bg-transparent pr-7 text-right text-base font-semibold leading-tight text-slate-900 placeholder-opacity-100 outline-none placeholder:text-slate-400 focus:outline-none dark:bg-transparent dark:text-zinc-50 dark:placeholder:text-zinc-400"
                                                            :name="expense.id"
                                                            type="number"
                                                            placeholder="0"
                                                            min="0"
                                                            step="0.01"
                                                            @change="saveData"
                                                        />
                                                        <label
                                                            class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                                            :for="expense.id"
                                                        >
                                                            {{ CURRENCY }}
                                                        </label>
                                                    </div>
                                                    <div class="col-span-1 flex h-10 w-full items-center justify-end gap-2 pr-4">
                                                        <!-- Move Expense Up/Down -->
                                                        <button
                                                            v-if="expenseIndex > 0"
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Преместване нагоре"
                                                            @click="moveExpense('basic', categoryIndex, expenseIndex, 'up')"
                                                        >
                                                            <ChevronUpIcon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>
                                                        <button
                                                            v-if="expenseIndex < category.expenses.length - 1"
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Преместване надолу"
                                                            @click="moveExpense('basic', categoryIndex, expenseIndex, 'down')"
                                                        >
                                                            <ChevronDownIcon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>

                                                        <button
                                                            class="group flex shrink-0 grow-0 basis-auto items-center gap-2 border-none outline-none focus:outline-none"
                                                            title="Преглед и добавяне на трансакция"
                                                            @click="openTransactionsModal('basic', categoryIndex, expenseIndex)"
                                                        >
                                                            <span
                                                                class="text-sm font-normal leading-tight text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                                            >
                                                                {{ getTransactionsCount(expense.id) }}
                                                            </span>
                                                            <ReceiptTextIcon
                                                                class="h-4 w-4 text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                                            />
                                                        </button>

                                                        <button
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Изтриване на разхода"
                                                            @click="openDeleteExpenseModal('basic', categoryIndex, expenseIndex)"
                                                        >
                                                            <Trash2Icon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div
                                                        class="col-span-5 flex flex-col items-start justify-start gap-2 px-4 pb-4 pl-11"
                                                    >
                                                        <div
                                                            class="h-1.5 w-full overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600"
                                                        >
                                                            <div
                                                                class="h-full bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700"
                                                                :style="{ width: calculateExpenseSpentPercentage(expense) + '%' }"
                                                            />
                                                        </div>

                                                        <div class="flex w-full items-start justify-between gap-4 px-1">
                                                            <div class="flex-start flex items-center gap-2">
                                                                <div class="block h-1 w-1 rounded bg-sky-500 dark:bg-sky-600" />
                                                                <span
                                                                    class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300"
                                                                >
                                                                    {{ calculateExpenseSpentPercentage(expense) }}% са
                                                                    изразходвани
                                                                </span>
                                                            </div>
                                                            <span
                                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                                            >
                                                                {{ formatCurrency(getExpenseSpent(expense.id)) }}
                                                                {{ CURRENCY }} от
                                                                <span class="font-bold">
                                                                    {{ formatCurrency(expense.amount) }} {{ CURRENCY }}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                    <!-- Category Summary -->
                                    <div
                                        class="flex w-full flex-col gap-2 border-t border-solid border-slate-300 p-4 dark:border-zinc-600"
                                    >
                                        <div class="flex w-full items-center justify-between gap-4">
                                            <div
                                                class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                            >
                                                Общо за категорията:
                                            </div>
                                            <span
                                                class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50"
                                            >
                                                {{ formatCurrency(getCategoryTotal('basic', categoryIndex)) }} {{ CURRENCY }}
                                            </span>
                                        </div>

                                        <!-- Progress Bar for Spent Amount -->
                                        <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                            <div
                                                class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
                                                :style="{ width: calculateCategorySpentPercentage('basic', categoryIndex) + '%' }"
                                            />
                                        </div>

                                        <div class="flex items-start justify-between gap-4 px-1">
                                            <div class="flex-start flex items-center gap-2">
                                                <div class="block h-1 w-1 rounded bg-emerald-500 dark:bg-emerald-600" />
                                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                    {{ calculateCategorySpentPercentage('basic', categoryIndex) }}% са
                                                    изразходвани:
                                                </span>
                                            </div>
                                            <span
                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                            >
                                                {{ formatCurrency(getCategorySpent('basic', categoryIndex)) }} {{ CURRENCY }}
                                            </span>
                                        </div>

                                        <div class="flex items-start justify-between gap-4 px-1">
                                            <div class="flex-start flex items-center gap-2">
                                                <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                    {{
                                                        formatCurrency(
                                                            100 - calculateCategorySpentPercentage('basic', categoryIndex),
                                                        )
                                                    }}% оставащи:
                                                </span>
                                            </div>
                                            <span
                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                            >
                                                {{
                                                    formatCurrency(
                                                        getCategoryTotal('basic', categoryIndex) -
                                                            getCategorySpent('basic', categoryIndex),
                                                    )
                                                }}
                                                {{ CURRENCY }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </section>

                    <!-- Other Expenses Section -->
                    <section
                        class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
                    >
                        <div class="flex items-center justify-start gap-3">
                            <!-- Heading -->
                            <div class="flex w-full items-center justify-start gap-3">
                                <FolderIcon class="h-4 w-4 text-red-500 dark:text-red-400" />
                                <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Други разходи</h2>
                            </div>

                            <!-- Control Buttons -->
                            <div class="flex items-center justify-end gap-2">
                                <button
                                    class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                    title="Добавяне на нова категория"
                                    @click="openAddCategoryModal('other')"
                                >
                                    <FolderPlusIcon
                                        class="h-full w-full text-slate-700 transition-all duration-200 hover:text-slate-900 dark:text-zinc-300 hover:dark:text-zinc-100"
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="flex w-full flex-col gap-4">
                            <template v-if="otherExpenses.length === 0">
                                <div
                                    class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                                >
                                    <p
                                        class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                    >
                                        Няма добавени категории.
                                    </p>
                                </div>
                            </template>

                            <template v-else>
                                <!-- Category Loop -->
                                <div
                                    v-for="(category, categoryIndex) in otherExpenses"
                                    :key="'other-' + categoryIndex"
                                    class="flex w-full flex-col items-stretch rounded-md border border-solid border-slate-300 bg-slate-50 dark:border-zinc-600 dark:bg-zinc-900"
                                >
                                    <!-- Heading -->
                                    <div class="flex items-center justify-start gap-3 p-4">
                                        <div class="flex w-full items-center justify-start gap-3">
                                            <button
                                                class="focus:outline-none"
                                                @click="toggleCategoryCollapse('other', categoryIndex)"
                                            >
                                                <FolderOpenIcon
                                                    v-if="!isCategoryCollapsed('other', categoryIndex)"
                                                    class="h-4 w-4 text-amber-500 dark:text-amber-400"
                                                />
                                                <FolderIcon v-else class="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                            </button>
                                            <input
                                                v-model="category.name"
                                                class="h-full w-full border-none bg-transparent text-lg font-medium leading-none text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                                type="text"
                                                @change="saveData"
                                            />
                                        </div>

                                        <!-- Control Buttons -->
                                        <div class="flex items-center justify-end gap-2">
                                            <!-- Move Category Up/Down -->
                                            <button
                                                v-if="categoryIndex > 0"
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Преместване нагоре"
                                                @click="moveCategory('other', categoryIndex, 'up')"
                                            >
                                                <ChevronUpIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>
                                            <button
                                                v-if="categoryIndex < otherExpenses.length - 1"
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Преместване надолу"
                                                @click="moveCategory('other', categoryIndex, 'down')"
                                            >
                                                <ChevronDownIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>

                                            <button
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Добавяне на нов разход"
                                                @click="openAddExpenseModal('other', categoryIndex)"
                                            >
                                                <FilePlusIcon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>

                                            <button
                                                class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                title="Изтриване на категорията"
                                                @click="openDeleteCategoryModal('other', categoryIndex)"
                                            >
                                                <Trash2Icon
                                                    class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Expenses List -->
                                    <div
                                        v-if="!isCategoryCollapsed('other', categoryIndex)"
                                        class="flex w-full flex-col gap-px overflow-hidden rounded-bl rounded-br border-t border-solid border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-800/40"
                                    >
                                        <template v-if="category.expenses.length === 0">
                                            <div class="flex w-full items-center justify-start gap-3 p-4 pl-11">
                                                <p
                                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                                >
                                                    Няма добавени разходи.
                                                </p>
                                            </div>
                                        </template>

                                        <template v-else>
                                            <!-- Expense Item Loop -->
                                            <div
                                                v-for="(expense, expenseIndex) in category.expenses"
                                                :key="expense.id"
                                                class="flex w-full text-slate-900 ring-1 ring-slate-300 dark:text-zinc-100 dark:ring-zinc-600"
                                            >
                                                <div
                                                    class="grid w-full grid-cols-5 gap-px ring-1 ring-slate-300 dark:ring-zinc-600"
                                                >
                                                    <div class="relative col-span-3 h-10 w-full">
                                                        <FileIcon
                                                            class="pointer-events-none absolute left-11 top-1/2 h-4 w-4 -translate-y-1/2 select-none text-slate-700 dark:text-zinc-300"
                                                        />
                                                        <input
                                                            v-model="expense.name"
                                                            class="h-full w-full border-none bg-transparent pl-16 text-base outline-none focus:outline-none"
                                                            type="text"
                                                            @change="saveData"
                                                        />
                                                    </div>
                                                    <div class="relative col-span-1 h-10 w-full">
                                                        <input
                                                            :id="expense.id"
                                                            v-model="expense.amount"
                                                            class="h-full w-full border-none bg-transparent pr-7 text-right text-base font-semibold leading-tight text-slate-900 placeholder-opacity-100 outline-none placeholder:text-slate-400 focus:outline-none dark:bg-transparent dark:text-zinc-50 dark:placeholder:text-zinc-400"
                                                            :name="expense.id"
                                                            type="number"
                                                            placeholder="0"
                                                            min="0"
                                                            step="0.01"
                                                            @change="saveData"
                                                        />
                                                        <label
                                                            class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                                            :for="expense.id"
                                                        >
                                                            {{ CURRENCY }}
                                                        </label>
                                                    </div>
                                                    <div class="col-span-1 flex h-10 w-full items-center justify-end gap-2 pr-4">
                                                        <!-- Move Expense Up/Down -->
                                                        <button
                                                            v-if="expenseIndex > 0"
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Преместване нагоре"
                                                            @click="moveExpense('other', categoryIndex, expenseIndex, 'up')"
                                                        >
                                                            <ChevronUpIcon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>
                                                        <button
                                                            v-if="expenseIndex < category.expenses.length - 1"
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Преместване надолу"
                                                            @click="moveExpense('other', categoryIndex, expenseIndex, 'down')"
                                                        >
                                                            <ChevronDownIcon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>

                                                        <button
                                                            class="group flex items-center gap-2 border-none outline-none focus:outline-none"
                                                            title="Преглед и добавяне на трансакция"
                                                            @click="openTransactionsModal('other', categoryIndex, expenseIndex)"
                                                        >
                                                            <span
                                                                class="text-sm font-normal leading-tight text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                                            >
                                                                {{ getTransactionsCount(expense.id) }}
                                                            </span>
                                                            <ReceiptTextIcon
                                                                class="h-4 w-4 text-slate-600 transition-all duration-200 group-hover:text-slate-800 dark:text-zinc-400 group-hover:dark:text-zinc-200"
                                                            />
                                                        </button>

                                                        <button
                                                            class="h-4 w-4 shrink-0 grow-0 basis-auto border-none outline-none focus:outline-none"
                                                            title="Изтриване на разхода"
                                                            @click="openDeleteExpenseModal('other', categoryIndex, expenseIndex)"
                                                        >
                                                            <Trash2Icon
                                                                class="h-full w-full text-slate-600 transition-all duration-200 hover:text-slate-800 dark:text-zinc-400 hover:dark:text-zinc-200"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div
                                                        class="col-span-5 flex flex-col items-start justify-start gap-2 px-4 pb-4 pl-11"
                                                    >
                                                        <div
                                                            class="h-1.5 w-full overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600"
                                                        >
                                                            <div
                                                                class="h-full bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700"
                                                                :style="{ width: calculateExpenseSpentPercentage(expense) + '%' }"
                                                            />
                                                        </div>

                                                        <div class="flex w-full items-start justify-between gap-4 px-1">
                                                            <div class="flex-start flex items-center gap-2">
                                                                <div class="block h-1 w-1 rounded bg-sky-500 dark:bg-sky-600" />
                                                                <span
                                                                    class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300"
                                                                >
                                                                    {{ calculateExpenseSpentPercentage(expense) }}% са
                                                                    изразходвани
                                                                </span>
                                                            </div>
                                                            <span
                                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                                            >
                                                                {{ formatCurrency(getExpenseSpent(expense.id)) }}
                                                                {{ CURRENCY }} от
                                                                <span class="font-bold">
                                                                    {{ formatCurrency(expense.amount) }} {{ CURRENCY }}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                    <!-- Category Summary -->
                                    <div
                                        class="flex w-full flex-col gap-2 border-t border-solid border-slate-300 p-4 dark:border-zinc-600"
                                    >
                                        <div class="flex w-full items-center justify-between gap-4">
                                            <div
                                                class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                            >
                                                Общо за категорията:
                                            </div>
                                            <span
                                                class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50"
                                            >
                                                {{ formatCurrency(getCategoryTotal('other', categoryIndex)) }} {{ CURRENCY }}
                                            </span>
                                        </div>

                                        <!-- Progress Bar for Spent Amount -->
                                        <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                            <div
                                                class="h-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700"
                                                :style="{ width: calculateCategorySpentPercentage('other', categoryIndex) + '%' }"
                                            />
                                        </div>

                                        <div class="flex items-start justify-between gap-4 px-1">
                                            <div class="flex-start flex items-center gap-2">
                                                <div class="block h-1 w-1 rounded bg-amber-900 dark:bg-amber-600" />
                                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                    {{ calculateCategorySpentPercentage('other', categoryIndex) }}% са
                                                    изразходвани:
                                                </span>
                                            </div>
                                            <span
                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                            >
                                                {{ formatCurrency(getCategorySpent('other', categoryIndex)) }} {{ CURRENCY }}
                                            </span>
                                        </div>

                                        <div class="flex items-start justify-between gap-4 px-1">
                                            <div class="flex-start flex items-center gap-2">
                                                <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                                <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                                    {{
                                                        formatCurrency(
                                                            100 - calculateCategorySpentPercentage('other', categoryIndex),
                                                        )
                                                    }}% оставащи:
                                                </span>
                                            </div>
                                            <span
                                                class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                            >
                                                {{
                                                    formatCurrency(
                                                        getCategoryTotal('other', categoryIndex) -
                                                            getCategorySpent('other', categoryIndex),
                                                    )
                                                }}
                                                {{ CURRENCY }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <!-- Sidebar Container -->
        <div class="h-(100%+1.5rem) -my-6 w-[400px] shrink-0 grow-0 basis-auto">
            <div class="flex h-full flex-col gap-6 overflow-y-auto px-0 py-6">
                <!-- Summary Section -->
                <section
                    class="flex w-full flex-col items-stretch gap-4 rounded-lg border border-solid border-slate-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800"
                >
                    <div class="flex items-center justify-start gap-3">
                        <ChartBarIcon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
                        <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">Обобщение</h2>
                    </div>
                    <div class="flex w-full flex-col gap-4">
                        <!-- Total Funds -->
                        <div class="flex w-full flex-col gap-2">
                            <div
                                class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                            >
                                <div class="flex w-full items-center justify-between gap-4">
                                    <div
                                        class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                    >
                                        Общо средства за разходване:
                                    </div>
                                    <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                                        {{ formatCurrency(funds) }} {{ CURRENCY }}
                                    </span>
                                </div>

                                <!-- Progress Bar for Allocated Amount -->
                                <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                    <div
                                        class="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
                                        :style="{ width: calculateAllocatedPercentage() + '%' }"
                                    />
                                </div>

                                <div class="flex items-start justify-between gap-4 px-1">
                                    <div class="flex-start flex items-center gap-2">
                                        <div class="block h-1 w-1 rounded bg-cyan-900 dark:bg-cyan-600" />
                                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                            {{ calculateAllocatedPercentage() }}% са разпределени:
                                        </span>
                                    </div>
                                    <span
                                        class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ formatCurrency(getTotalAllocated()) }} {{ CURRENCY }}
                                    </span>
                                </div>

                                <div class="flex items-start justify-between gap-4 px-1">
                                    <div class="flex-start flex items-center gap-2">
                                        <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                            {{ formatCurrency(100 - calculateAllocatedPercentage()) }}% оставащи:
                                        </span>
                                    </div>
                                    <span
                                        class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ formatCurrency(funds - getTotalAllocated()) }} {{ CURRENCY }}
                                    </span>
                                </div>

                                <!-- Progress Bar for Spent Amount -->
                                <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                    <div
                                        class="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
                                        :style="{ width: calculateTotalSpentPercentage() + '%' }"
                                    />
                                </div>

                                <div class="flex items-start justify-between gap-4 px-1">
                                    <div class="flex-start flex items-center gap-2">
                                        <div class="block h-1 w-1 rounded bg-cyan-900 dark:bg-cyan-600" />
                                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                            {{ calculateTotalSpentPercentage() }}% са изразходвани:
                                        </span>
                                    </div>
                                    <span
                                        class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ formatCurrency(getTotalSpent()) }} {{ CURRENCY }}
                                    </span>
                                </div>

                                <div class="flex items-start justify-between gap-4 px-1">
                                    <div class="flex-start flex items-center gap-2">
                                        <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                        <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                            {{ calculateRemainingAfterSpentPercentage() }}% оставащи:
                                        </span>
                                    </div>
                                    <span
                                        class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ formatCurrency(getTotalAllocated() - getTotalSpent()) }} {{ CURRENCY }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="block h-px w-full px-2">
                            <div class="h-px w-full border-t border-dashed border-slate-300 dark:border-zinc-600" />
                        </div>

                        <!-- Basic Expenses Breakdown -->
                        <div
                            class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                        >
                            <div class="flex w-full items-center justify-between gap-4">
                                <div
                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                >
                                    Основни разходи:
                                </div>
                                <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                                    {{ formatCurrency(getBasicExpensesTotal()) }} {{ CURRENCY }}
                                </span>
                            </div>

                            <!-- Progress Bar for Spent Amount -->
                            <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                <div
                                    class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
                                    :style="{ width: calculateBasicSpentPercentage() + '%' }"
                                />
                            </div>

                            <div class="flex items-start justify-between gap-4 px-1">
                                <div class="flex-start flex items-center gap-2">
                                    <div class="block h-1 w-1 rounded bg-emerald-500 dark:bg-emerald-600" />
                                    <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                        {{ calculateBasicSpentPercentage() }}% са изразходвани:
                                    </span>
                                </div>
                                <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ formatCurrency(getBasicExpensesSpent()) }} {{ CURRENCY }}
                                </span>
                            </div>

                            <div class="flex items-start justify-between gap-4 px-1">
                                <div class="flex-start flex items-center gap-2">
                                    <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                    <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                        {{ formatCurrency(100 - calculateBasicSpentPercentage()) }}% оставащи:
                                    </span>
                                </div>
                                <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ formatCurrency(getBasicExpensesTotal() - getBasicExpensesSpent()) }} {{ CURRENCY }}
                                </span>
                            </div>
                        </div>

                        <!-- Other Expenses Breakdown -->
                        <div
                            class="flex flex-col gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                        >
                            <div class="flex w-full items-center justify-between gap-4">
                                <div
                                    class="whitespace-nowrap text-left text-base font-normal leading-tight text-slate-900 dark:text-zinc-50"
                                >
                                    Други разходи:
                                </div>
                                <span class="text-right text-base font-bold leading-tight text-slate-900 dark:text-zinc-50">
                                    {{ formatCurrency(getOtherExpensesTotal()) }} {{ CURRENCY }}
                                </span>
                            </div>

                            <!-- Progress Bar for Spent Amount -->
                            <div class="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-zinc-600">
                                <div
                                    class="h-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700"
                                    :style="{ width: calculateOtherSpentPercentage() + '%' }"
                                />
                            </div>

                            <div class="flex items-start justify-between gap-4 px-1">
                                <div class="flex-start flex items-center gap-2">
                                    <div class="block h-1 w-1 rounded bg-amber-900 dark:bg-amber-600" />
                                    <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                        {{ calculateOtherSpentPercentage() }}% са изразходвани:
                                    </span>
                                </div>
                                <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ formatCurrency(getOtherExpensesSpent()) }} {{ CURRENCY }}
                                </span>
                            </div>

                            <div class="flex items-start justify-between gap-4 px-1">
                                <div class="flex-start flex items-center gap-2">
                                    <div class="block h-1 w-1 rounded bg-slate-300 dark:bg-zinc-600" />
                                    <span class="text-sm font-normal leading-tight text-slate-700 dark:text-zinc-300">
                                        {{ formatCurrency(100 - calculateOtherSpentPercentage()) }}% оставащи:
                                    </span>
                                </div>
                                <span class="text-right text-sm font-semibold leading-tight text-slate-700 dark:text-zinc-300">
                                    {{ formatCurrency(getOtherExpensesTotal() - getOtherExpensesSpent()) }} {{ CURRENCY }}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Transactions List Section -->
                <section
                    class="flex w-full flex-col items-stretch rounded-lg border border-solid border-slate-300 bg-white p-4 pb-0 dark:border-zinc-600 dark:bg-zinc-800"
                >
                    <div class="flex items-center justify-start gap-3">
                        <ReceiptTextIcon class="flex h-4 w-4 text-blue-600 dark:text-sky-400" />
                        <h2 class="text-lg font-medium leading-none text-slate-900 dark:text-zinc-100">
                            Последно добавени трансакции
                        </h2>
                    </div>
                    <div class="relative flex w-full flex-col gap-4 py-4">
                        <template v-if="transactions.length === 0">
                            <div class="py-4 text-center text-slate-500 dark:text-zinc-400">Няма добавени трансакции.</div>
                        </template>

                        <template v-else>
                            <div
                                class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-white to-transparent dark:from-zinc-800"
                            />

                            <div class="-my-4 flex max-h-[400px] flex-col gap-4 overflow-y-auto py-4">
                                <template v-for="transaction in getSortedTransactions()" :key="transaction.id">
                                    <div
                                        class="flex items-stretch justify-between gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                                    >
                                        <div class="flex w-full flex-col gap-2">
                                            <input
                                                v-model="transaction.description"
                                                class="w-full border-none bg-transparent text-base font-medium text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                                type="text"
                                                @change="saveData"
                                            />
                                            <div class="flex flex-col gap-1">
                                                <span class="text-sm leading-tight text-slate-500 dark:text-zinc-400">
                                                    {{ getExpenseName(transaction.expenseId) }}
                                                </span>
                                                <span
                                                    class="text-sm font-semibold leading-none text-slate-500 dark:text-zinc-400"
                                                >
                                                    {{ formatDate(transaction.date) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col items-end justify-between gap-2">
                                            <div class="relative">
                                                <input
                                                    v-model="transaction.amount"
                                                    class="w-24 border-none bg-transparent pr-7 text-right text-base font-semibold text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    @change="saveData"
                                                />
                                                <span
                                                    class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                                >
                                                    {{ CURRENCY }}
                                                </span>
                                            </div>
                                            <button
                                                class="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none dark:text-red-400 dark:hover:text-red-300"
                                                @click="openDeleteTransactionModal(transaction)"
                                            >
                                                <Trash2Icon class="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <div
                                class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 w-full bg-gradient-to-t from-white to-transparent dark:from-zinc-800"
                            />
                        </template>
                    </div>
                </section>
            </div>
        </div>

        <div
            class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 w-full bg-gradient-to-t from-slate-100 to-transparent dark:from-zinc-900 xl:h-6"
        />
    </div>

    <!-- Modal Backgrounds -->
    <div
        v-if="
            showResetModal ||
            showAddCategoryModal ||
            showDeleteCategoryModal ||
            showAddExpenseModal ||
            showDeleteExpenseModal ||
            showTransactionsModal ||
            showDeleteTransactionModal
        "
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click="closeAllModals"
    />

    <!-- Reset Modal -->
    <div
        v-if="showResetModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Нулиране на данните</h3>
        <p class="mb-6 text-slate-700 dark:text-zinc-300">
            Сигурни ли сте, че искате да нулирате всички данни? Това действие не може да бъде отменено.
        </p>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showResetModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
                @click="resetData"
            >
                Нулиране
            </button>
        </div>
    </div>

    <!-- Add Category Modal -->
    <div
        v-if="showAddCategoryModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Добавяне на нова категория</h3>
        <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="categoryName">
                Име на категорията
            </label>
            <input
                id="categoryName"
                v-model="newCategoryName"
                class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                type="text"
                placeholder="Въведете име на категорията"
            />
        </div>
        <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="firstExpenseName">
                Име на първия разход (незадължително)
            </label>
            <input
                id="firstExpenseName"
                v-model="newFirstExpenseName"
                class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                type="text"
                placeholder="Въведете име на първия разход"
            />
        </div>
        <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="firstExpenseAmount">
                Сума за първия разход (незадължително)
            </label>
            <input
                id="firstExpenseAmount"
                v-model="newFirstExpenseAmount"
                class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
            />
        </div>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showAddCategoryModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
                @click="addCategory"
            >
                Добави
            </button>
        </div>
    </div>

    <!-- Delete Category Modal -->
    <div
        v-if="showDeleteCategoryModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Изтриване на категория</h3>
        <p class="mb-6 text-slate-700 dark:text-zinc-300">
            Сигурни ли сте, че искате да изтриете тази категория и всички разходи в нея?
        </p>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showDeleteCategoryModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
                @click="deleteCategory"
            >
                Изтрий
            </button>
        </div>
    </div>

    <!-- Add Expense Modal -->
    <div
        v-if="showAddExpenseModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Добавяне на нов разход</h3>
        <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="expenseName">
                Име на разхода
            </label>
            <input
                id="expenseName"
                v-model="newExpenseName"
                class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                type="text"
                placeholder="Въведете име на разхода"
            />
        </div>
        <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="expenseAmount">Сума</label>
            <input
                id="expenseAmount"
                v-model="newExpenseAmount"
                class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
            />
        </div>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showAddExpenseModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
                @click="addExpense"
            >
                Добави
            </button>
        </div>
    </div>

    <!-- Delete Expense Modal -->
    <div
        v-if="showDeleteExpenseModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Изтриване на разход</h3>
        <p class="mb-6 text-slate-700 dark:text-zinc-300">
            Сигурни ли сте, че искате да изтриете този разход и всички свързани с него трансакции?
        </p>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showDeleteExpenseModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
                @click="deleteExpense"
            >
                Изтрий
            </button>
        </div>
    </div>

    <!-- Transactions Modal -->
    <div
        v-if="showTransactionsModal"
        class="fixed left-1/2 top-1/2 z-50 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="text-lg font-medium text-slate-900 dark:text-zinc-100">
            Трансакции за {{ currentExpense ? currentExpense.name : '' }}
        </h3>

        <!-- Existing Transactions -->
        <div v-if="currentExpense" class="relative -mt-4 py-4">
            <template v-if="getSortedExpenseTransactions(currentExpense.id).length === 0">
                <div class="py-4 text-center text-slate-500 dark:text-zinc-400">Няма трансакции за тази категория.</div>
            </template>

            <template v-else>
                <div
                    class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-white to-transparent dark:from-zinc-800"
                />

                <div class="-my-4 flex max-h-[180px] flex-col gap-4 overflow-y-auto py-4">
                    <template v-for="transaction in getSortedExpenseTransactions(currentExpense.id)" :key="transaction.id">
                        <div
                            class="flex items-stretch justify-between gap-2 rounded-md border border-solid border-slate-300 bg-slate-50 p-4 dark:border-zinc-600 dark:bg-zinc-900"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <input
                                    v-model="transaction.description"
                                    class="w-full border-none bg-transparent text-base font-medium text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                    type="text"
                                    @change="saveData"
                                />
                                <div class="flex flex-col gap-1">
                                    <span class="text-sm font-semibold leading-none text-slate-500 dark:text-zinc-400">
                                        {{ formatDate(transaction.date) }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col items-end justify-between gap-2">
                                <div class="relative">
                                    <input
                                        v-model="transaction.amount"
                                        class="w-24 border-none bg-transparent pr-7 text-right text-base font-semibold text-slate-900 outline-none focus:outline-none dark:text-zinc-100"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        @change="saveData"
                                    />
                                    <span
                                        class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-base font-normal leading-none text-slate-700 dark:text-zinc-300"
                                    >
                                        {{ CURRENCY }}
                                    </span>
                                </div>
                                <button
                                    class="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none dark:text-red-400 dark:hover:text-red-300"
                                    @click="openDeleteTransactionModal(transaction)"
                                >
                                    <Trash2Icon class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 w-full bg-gradient-to-t from-white to-transparent dark:from-zinc-800"
                />
            </template>
        </div>

        <!-- Add New Transaction Form -->
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h4 class="mb-3 font-medium text-slate-900 dark:text-zinc-100">Добавяне на нова трансакция</h4>
            <div class="mb-3">
                <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="transactionDescription">
                    Описание
                </label>
                <input
                    id="transactionDescription"
                    v-model="newTransactionDescription"
                    class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                    type="text"
                    placeholder="Въведете описание"
                />
            </div>
            <div class="mb-3">
                <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="transactionAmount">
                    Сума
                </label>
                <input
                    id="transactionAmount"
                    v-model="newTransactionAmount"
                    class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>
            <div class="mb-3">
                <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300" for="transactionDate">Дата</label>
                <input
                    id="transactionDate"
                    v-model="newTransactionDate"
                    class="w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                    type="date"
                />
            </div>
            <button
                class="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
                @click="addTransaction"
            >
                Добави трансакция
            </button>
        </div>

        <div class="flex justify-end">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showTransactionsModal = false"
            >
                Затвори
            </button>
        </div>
    </div>

    <!-- Delete Transaction Modal -->
    <div
        v-if="showDeleteTransactionModal"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-300 bg-white p-6 shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
        @click.stop
    >
        <h3 class="mb-4 text-lg font-medium text-slate-900 dark:text-zinc-100">Изтриване на трансакция</h3>
        <p class="mb-6 text-slate-700 dark:text-zinc-300">Сигурни ли сте, че искате да изтриете тази трансакция?</p>
        <div class="flex justify-end gap-2">
            <button
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                @click="showDeleteTransactionModal = false"
            >
                Отказ
            </button>
            <button
                class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
                @click="deleteTransaction(currentTransaction.id)"
            >
                Изтрий
            </button>
        </div>
    </div>
</template>

<script setup>
    import { useDark, useToggle } from '@vueuse/core'
    import {
        ChartBarIcon,
        ChevronDownIcon,
        ChevronUpIcon,
        FileIcon,
        FilePlusIcon,
        FolderIcon,
        FolderOpenIcon,
        FolderPlusIcon,
        MoonIcon,
        ReceiptTextIcon,
        RefreshCcwIcon,
        SunIcon,
        Trash2Icon,
    } from 'lucide-vue-next'
    import { onMounted, ref } from 'vue'

    // Constants
    const CURRENCY = 'лв.'
    const DATE_LOCALE = 'bg-BG'

    // Local Storage keys
    const STORAGE_KEYS = {
        DIARY_DATA: 'financial-diary-data',
        TRANSACTIONS: 'financial-diary-transactions',
    }

    // Theme state using VueUse
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    // Funds state
    const funds = ref(0)

    // Expenses data
    const basicExpenses = ref([])
    const otherExpenses = ref([])
    const transactions = ref([])

    // Collapsed categories
    const collapsedCategories = ref({
        basic: {},
        other: {},
    })

    // Modal states
    const showResetModal = ref(false)
    const showAddCategoryModal = ref(false)
    const showDeleteCategoryModal = ref(false)
    const showAddExpenseModal = ref(false)
    const showDeleteExpenseModal = ref(false)
    const showTransactionsModal = ref(false)
    const showDeleteTransactionModal = ref(false)

    // Current selections for modals
    const currentSection = ref(null) // 'basic' or 'other'
    const currentCategoryIndex = ref(null)
    const currentExpenseIndex = ref(null)
    const currentExpense = ref(null)
    const currentTransaction = ref(null)

    // Form inputs
    const newCategoryName = ref('')
    const newFirstExpenseName = ref('')
    const newFirstExpenseAmount = ref('')
    const newExpenseName = ref('')
    const newExpenseAmount = ref('')
    const newTransactionDescription = ref('')
    const newTransactionAmount = ref('')
    const newTransactionDate = ref(new Date().toISOString().split('T')[0]) // Today's date
    const editTransactionDescription = ref('')
    const editTransactionAmount = ref('')
    const editTransactionDate = ref('')

    onMounted(() => {
        loadData()
    })

    // Data loading and saving functions
    const loadData = () => {
        // Load from new storage format
        const diaryData = localStorage.getItem(STORAGE_KEYS.DIARY_DATA)
        if (diaryData) {
            const data = JSON.parse(diaryData)
            basicExpenses.value = data.basicExpenses || []
            otherExpenses.value = data.otherExpenses || []
            funds.value = data.funds || 2000
        } else {
            // Default values if no data exists
            funds.value = 2000
            basicExpenses.value = [
                {
                    name: 'Кредити',
                    expenses: [{ id: 'credits-1', name: 'Ипотека', amount: 500 }],
                },
                {
                    name: 'Комунални услуги',
                    expenses: [
                        { id: 'communal-1', name: 'Ток', amount: 100 },
                        { id: 'communal-2', name: 'Вода', amount: 30 },
                        { id: 'communal-3', name: 'Парно', amount: 200 },
                        { id: 'communal-4', name: 'Интернет', amount: 20 },
                        { id: 'communal-5', name: 'Телевизия', amount: 20 },
                        { id: 'communal-6', name: 'Телефон', amount: 20 },
                    ],
                },
                {
                    name: 'Абонаменти',
                    expenses: [
                        { id: 'subscriptions-1', name: 'YouTube Premium', amount: 28 },
                        { id: 'subscriptions-2', name: 'Spotify Premium', amount: 15 },
                    ],
                },
            ]
            otherExpenses.value = [
                {
                    name: 'Жизнени нужди',
                    expenses: [
                        { id: 'life-1', name: 'Храна', amount: 500 },
                        { id: 'life-2', name: 'Здраве', amount: 50 },
                        { id: 'life-3', name: 'Спорт', amount: 100 },
                    ],
                },
                {
                    name: 'Други',
                    expenses: [{ id: 'other-1', name: 'Неразпределени', amount: 100 }],
                },
            ]
        }

        // Load transactions
        const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
        if (savedTransactions) {
            transactions.value = JSON.parse(savedTransactions)
        } else {
            transactions.value = []
        }
    }

    const saveData = () => {
        // Save to new format
        const diaryData = {
            basicExpenses: basicExpenses.value,
            otherExpenses: otherExpenses.value,
            funds: funds.value,
        }

        localStorage.setItem(STORAGE_KEYS.DIARY_DATA, JSON.stringify(diaryData))
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions.value))
    }

    const saveFunds = () => {
        const fundsValue = safeParseFloat(funds.value)
        funds.value = fundsValue

        const diaryData = {
            basicExpenses: basicExpenses.value,
            otherExpenses: otherExpenses.value,
            funds: fundsValue,
        }

        localStorage.setItem(STORAGE_KEYS.DIARY_DATA, JSON.stringify(diaryData))
    }

    // Reset all data - modified to keep categories but clear transactions
    const resetData = () => {
        // Keep the current categories and their allocated amounts
        const currentBasicExpenses = JSON.parse(JSON.stringify(basicExpenses.value))
        const currentOtherExpenses = JSON.parse(JSON.stringify(otherExpenses.value))

        // Clear only the transactions
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]))

        // Save the current categories back
        const diaryData = {
            basicExpenses: currentBasicExpenses,
            otherExpenses: currentOtherExpenses,
            funds: funds.value,
        }

        localStorage.setItem(STORAGE_KEYS.DIARY_DATA, JSON.stringify(diaryData))

        // Reset only the transactions array in memory
        transactions.value = []

        showResetModal.value = false
    }

    // Category collapse functions
    const toggleCategoryCollapse = (section, categoryIndex) => {
        if (!collapsedCategories.value[section]) {
            collapsedCategories.value[section] = {}
        }

        collapsedCategories.value[section][categoryIndex] = !collapsedCategories.value[section][categoryIndex]
    }

    const isCategoryCollapsed = (section, categoryIndex) => {
        if (!collapsedCategories.value[section]) {
            return false
        }

        return !!collapsedCategories.value[section][categoryIndex]
    }

    // Category and expense movement functions
    const moveCategory = (section, categoryIndex, direction) => {
        if (section === 'basic') {
            if (direction === 'up' && categoryIndex > 0) {
                const temp = basicExpenses.value[categoryIndex]
                basicExpenses.value[categoryIndex] = basicExpenses.value[categoryIndex - 1]
                basicExpenses.value[categoryIndex - 1] = temp
            } else if (direction === 'down' && categoryIndex < basicExpenses.value.length - 1) {
                const temp = basicExpenses.value[categoryIndex]
                basicExpenses.value[categoryIndex] = basicExpenses.value[categoryIndex + 1]
                basicExpenses.value[categoryIndex + 1] = temp
            }
        } else {
            if (direction === 'up' && categoryIndex > 0) {
                const temp = otherExpenses.value[categoryIndex]
                otherExpenses.value[categoryIndex] = otherExpenses.value[categoryIndex - 1]
                otherExpenses.value[categoryIndex - 1] = temp
            } else if (direction === 'down' && categoryIndex < otherExpenses.value.length - 1) {
                const temp = otherExpenses.value[categoryIndex]
                otherExpenses.value[categoryIndex] = otherExpenses.value[categoryIndex + 1]
                otherExpenses.value[categoryIndex + 1] = temp
            }
        }

        saveData()
    }

    const moveExpense = (section, categoryIndex, expenseIndex, direction) => {
        const expenses =
            section === 'basic' ? basicExpenses.value[categoryIndex].expenses : otherExpenses.value[categoryIndex].expenses

        if (direction === 'up' && expenseIndex > 0) {
            const temp = expenses[expenseIndex]
            expenses[expenseIndex] = expenses[expenseIndex - 1]
            expenses[expenseIndex - 1] = temp
        } else if (direction === 'down' && expenseIndex < expenses.length - 1) {
            const temp = expenses[expenseIndex]
            expenses[expenseIndex] = expenses[expenseIndex + 1]
            expenses[expenseIndex + 1] = temp
        }

        saveData()
    }

    // Modal control functions
    const closeAllModals = () => {
        showResetModal.value = false
        showAddCategoryModal.value = false
        showDeleteCategoryModal.value = false
        showAddExpenseModal.value = false
        showDeleteExpenseModal.value = false
        showTransactionsModal.value = false
        showDeleteTransactionModal.value = false

        // Reset form values
        newCategoryName.value = false
        newFirstExpenseName.value = ''
        newFirstExpenseAmount.value = ''
        newExpenseName.value = ''
        newExpenseAmount.value = ''
        newTransactionDescription.value = ''
        newTransactionAmount.value = ''
        newTransactionDate.value = new Date().toISOString().split('T')[0]
        editTransactionDescription.value = ''
        editTransactionAmount.value = ''
        editTransactionDate.value = ''

        // Reset current selections
        currentSection.value = null
        currentCategoryIndex.value = null
        currentExpenseIndex.value = null
        currentExpense.value = null
        currentTransaction.value = null
    }

    // Category functions
    const openAddCategoryModal = (section) => {
        currentSection.value = section
        showAddCategoryModal.value = true
    }

    const openDeleteCategoryModal = (section, categoryIndex) => {
        currentSection.value = section
        currentCategoryIndex.value = categoryIndex
        showDeleteCategoryModal.value = true
    }

    const addCategory = () => {
        if (!newCategoryName.value.trim()) return

        const newCategory = {
            name: newCategoryName.value,
            expenses: [],
        }

        // Add first expense if provided
        if (newFirstExpenseName.value.trim() || newFirstExpenseAmount.value) {
            const expenseName = newFirstExpenseName.value.trim() || 'Нов разход'
            const expenseAmount = safeParseFloat(newFirstExpenseAmount.value)

            newCategory.expenses.push({
                id: 'expense-' + Date.now(),
                name: expenseName,
                amount: expenseAmount,
            })
        }

        if (currentSection.value === 'basic') {
            basicExpenses.value.push(newCategory)
        } else {
            otherExpenses.value.push(newCategory)
        }

        saveData()
        showAddCategoryModal.value = false
        newCategoryName.value = ''
        newFirstExpenseName.value = ''
        newFirstExpenseAmount.value = ''
    }

    const deleteCategory = () => {
        if (currentSection.value === 'basic') {
            // Delete all transactions for expenses in this category
            const category = basicExpenses.value[currentCategoryIndex.value]
            category.expenses.forEach((expense) => {
                transactions.value = transactions.value.filter((t) => t.expenseId !== expense.id)
            })

            // Remove the category
            basicExpenses.value.splice(currentCategoryIndex.value, 1)
        } else {
            // Delete all transactions for expenses in this category
            const category = otherExpenses.value[currentCategoryIndex.value]
            category.expenses.forEach((expense) => {
                transactions.value = transactions.value.filter((t) => t.expenseId !== expense.id)
            })

            // Remove the category
            otherExpenses.value.splice(currentCategoryIndex.value, 1)
        }

        saveData()
        showDeleteCategoryModal.value = false
    }

    // Expense functions
    const openAddExpenseModal = (section, categoryIndex) => {
        currentSection.value = section
        currentCategoryIndex.value = categoryIndex
        showAddExpenseModal.value = true
    }

    const openDeleteExpenseModal = (section, categoryIndex, expenseIndex) => {
        currentSection.value = section
        currentCategoryIndex.value = categoryIndex
        currentExpenseIndex.value = expenseIndex
        showDeleteExpenseModal.value = true
    }

    const addExpense = () => {
        if (!newExpenseName.value.trim()) return

        const amount = safeParseFloat(newExpenseAmount.value)

        const newExpense = {
            id: 'expense-' + Date.now(),
            name: newExpenseName.value,
            amount: amount,
        }

        if (currentSection.value === 'basic') {
            basicExpenses.value[currentCategoryIndex.value].expenses.push(newExpense)
        } else {
            otherExpenses.value[currentCategoryIndex.value].expenses.push(newExpense)
        }

        saveData()
        showAddExpenseModal.value = false
        newExpenseName.value = ''
        newExpenseAmount.value = ''
    }

    const deleteExpense = () => {
        let expenseId

        if (currentSection.value === 'basic') {
            expenseId = basicExpenses.value[currentCategoryIndex.value].expenses[currentExpenseIndex.value].id
            basicExpenses.value[currentCategoryIndex.value].expenses.splice(currentExpenseIndex.value, 1)
        } else {
            expenseId = otherExpenses.value[currentCategoryIndex.value].expenses[currentExpenseIndex.value].id
            otherExpenses.value[currentCategoryIndex.value].expenses.splice(currentExpenseIndex.value, 1)
        }

        // Delete all transactions for this expense
        transactions.value = transactions.value.filter((t) => t.expenseId !== expenseId)

        saveData()
        showDeleteExpenseModal.value = false
    }

    // Transaction functions
    const openTransactionsModal = (section, categoryIndex, expenseIndex) => {
        currentSection.value = section
        currentCategoryIndex.value = categoryIndex
        currentExpenseIndex.value = expenseIndex

        if (section === 'basic') {
            currentExpense.value = basicExpenses.value[categoryIndex].expenses[expenseIndex]
        } else {
            currentExpense.value = otherExpenses.value[categoryIndex].expenses[expenseIndex]
        }

        showTransactionsModal.value = true
    }

    const addTransaction = () => {
        if (!newTransactionDate.value) return

        const amount = safeParseFloat(newTransactionAmount.value)

        const newTransaction = {
            id: 'trans-' + Date.now(),
            expenseId: currentExpense.value.id,
            description: newTransactionDescription.value || 'Автоматично плащане',
            amount: amount,
            date: newTransactionDate.value,
        }

        transactions.value.push(newTransaction)
        saveData()

        // Reset form
        newTransactionDescription.value = ''
        newTransactionAmount.value = ''
        newTransactionDate.value = new Date().toISOString().split('T')[0]
    }

    const deleteTransaction = (transactionId) => {
        transactions.value = transactions.value.filter((t) => t.id !== transactionId)

        saveData()
        showDeleteTransactionModal.value = false
    }

    const openDeleteTransactionModal = (transaction) => {
        currentTransaction.value = transaction
        showDeleteTransactionModal.value = true
    }

    // Helper functions
    const safeParseFloat = (value) => {
        const parsed = parseFloat(value)
        return isNaN(parsed) ? 0 : parsed
    }

    const getTransactionsCount = (expenseId) => {
        return transactions.value.filter((t) => t.expenseId === expenseId).length
    }

    const getSortedTransactions = () => {
        return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    const getSortedExpenseTransactions = (expenseId) => {
        return transactions.value.filter((t) => t.expenseId === expenseId).sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    const getExpenseName = (expenseId) => {
        // Search in basic expenses
        for (const category of basicExpenses.value) {
            const expense = category.expenses.find((e) => e.id === expenseId)
            if (expense) return `${category.name} - ${expense.name}`
        }

        // Search in other expenses
        for (const category of otherExpenses.value) {
            const expense = category.expenses.find((e) => e.id === expenseId)
            if (expense) return `${category.name} - ${expense.name}`
        }

        return 'Неизвестен разход'
    }

    const getExpenseSpent = (expenseId) => {
        return transactions.value
            .filter((t) => t.expenseId === expenseId)
            .reduce((sum, transaction) => sum + safeParseFloat(transaction.amount), 0)
    }

    const calculateExpenseSpentPercentage = (expense) => {
        const spent = getExpenseSpent(expense.id)
        const amount = safeParseFloat(expense.amount)
        if (amount <= 0) return 0
        const percentage = (spent / amount) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const formatCurrency = (value) => {
        return safeParseFloat(value).toFixed(2)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(DATE_LOCALE)
    }

    // Summary calculations
    const getTotalAllocated = () => {
        return getBasicExpensesTotal() + getOtherExpensesTotal()
    }

    const getTotalSpent = () => {
        return transactions.value.reduce((sum, transaction) => sum + safeParseFloat(transaction.amount), 0)
    }

    const getBasicExpensesTotal = () => {
        return basicExpenses.value.reduce((sum, category) => {
            return sum + category.expenses.reduce((catSum, expense) => catSum + safeParseFloat(expense.amount), 0)
        }, 0)
    }

    const getOtherExpensesTotal = () => {
        return otherExpenses.value.reduce((sum, category) => {
            return sum + category.expenses.reduce((catSum, expense) => catSum + safeParseFloat(expense.amount), 0)
        }, 0)
    }

    const getBasicExpensesSpent = () => {
        let total = 0
        basicExpenses.value.forEach((category) => {
            category.expenses.forEach((expense) => {
                total += getExpenseSpent(expense.id)
            })
        })
        return total
    }

    const getOtherExpensesSpent = () => {
        let total = 0
        otherExpenses.value.forEach((category) => {
            category.expenses.forEach((expense) => {
                total += getExpenseSpent(expense.id)
            })
        })
        return total
    }

    // Percentage calculations
    const calculateAllocatedPercentage = () => {
        const fundsValue = safeParseFloat(funds.value)
        if (fundsValue <= 0) return 0
        const percentage = (getTotalAllocated() / fundsValue) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const calculateTotalSpentPercentage = () => {
        const fundsValue = safeParseFloat(funds.value)
        if (fundsValue <= 0) return 0
        const percentage = (getTotalSpent() / fundsValue) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const calculateBasicSpentPercentage = () => {
        const basicTotal = getBasicExpensesTotal()
        if (basicTotal <= 0) return 0
        const percentage = (getBasicExpensesSpent() / basicTotal) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const calculateOtherSpentPercentage = () => {
        const otherTotal = getOtherExpensesTotal()
        if (otherTotal <= 0) return 0
        const percentage = (getOtherExpensesSpent() / otherTotal) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    const calculateRemainingAfterSpentPercentage = () => {
        const totalAllocated = getTotalAllocated()
        if (totalAllocated <= 0) return 0
        const percentage = ((totalAllocated - getTotalSpent()) / totalAllocated) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }

    // Add new helper functions for category calculations
    const getCategoryTotal = (section, categoryIndex) => {
        const expenses = section === 'basic' ? basicExpenses.value : otherExpenses.value
        if (!expenses[categoryIndex]) return 0
        return expenses[categoryIndex].expenses.reduce((sum, expense) => sum + safeParseFloat(expense.amount), 0)
    }

    const getCategorySpent = (section, categoryIndex) => {
        const expenses = section === 'basic' ? basicExpenses.value : otherExpenses.value
        if (!expenses[categoryIndex]) return 0
        return expenses[categoryIndex].expenses.reduce((sum, expense) => sum + getExpenseSpent(expense.id), 0)
    }

    const calculateCategorySpentPercentage = (section, categoryIndex) => {
        const total = getCategoryTotal(section, categoryIndex)
        if (total <= 0) return 0
        const spent = getCategorySpent(section, categoryIndex)
        const percentage = (spent / total) * 100
        return Math.min(100, Math.round(percentage * 100) / 100)
    }
</script>
