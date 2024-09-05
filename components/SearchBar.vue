<template>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </div>
        <input v-model="searchQuery" @input="search" type="search" placeholder="Search Games ..."
            class="block w-full p-4 ps-10 text-sm text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition duration-300" />
    </div>
</template>

<script setup lang="ts">
const searchQuery = ref('');
const gamesStore = useGamesStore();
function search() {
    gamesStore.setQuery(searchQuery.value);
    gamesStore.fetchGames(1, searchQuery.value);
}
</script>
