<template>
    <div class="container mx-auto p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div class="flex flex-col sm:flex-row justify-between items-center my-5">
            <SearchBar />
            <NuxtLink to="/favorite"
                class="mt-4 sm:mt-0 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
                My Favorite
            </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <GameCard v-for="game in gamesStore.games" :key="game.id" :game="game" />
        </div>
        <div class="flex justify-center my-6">
            <button v-if="showLoadMore" @click="loadMore" :disabled="loading"
                class="px-6 py-3 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
                <span v-if="loading">Loading...</span>
                <span v-else>Load More</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const gamesStore = useGamesStore();
const loading = ref(false);
const showLoadMore = computed(() => gamesStore.page < gamesStore.totalPages);

onMounted(() => {
    gamesStore.fetchGames(1);
});

async function loadMore() {
    loading.value = true;
    try {
        await gamesStore.fetchGames(gamesStore.page + 1, gamesStore.query);
    } catch (error) {
        console.error('Failed to load more games:', error);
    } finally {
        loading.value = false;
    }
}
</script>