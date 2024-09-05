<template>
    <div class="container mx-auto p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 my-5">
        <NuxtLink to="/"
            class="my-5 px-4 py-3 bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-800 transition duration-300">
            Back to List
        </NuxtLink>
        <h1 class="text-3xl font-bold my-5">Favorite Games</h1>
        <div class="relative my-5">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input v-model="searchQuery" type="search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition duration-300"
                placeholder="Search favorite games..." />
        </div>
        <div v-if="filteredFavorites.length === 0" class="text-center">No favorite games found.</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="game in paginatedFavorites" :key="game.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <NuxtLink :to="`/${game.id}`">
                        <img :src="game.background_image" alt="Game Image"
                            class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4">
                            <h2 class="text-lg font-semibold">{{ game.name }}</h2>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div v-if="hasMore" class="text-center mt-6">
                <button @click="loadMore"
                    class="px-6 py-3 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
                    Load More
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Game {
    id: number;
    name: string;
    background_image: string;
}
const favorites = computed<Array<Game>>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
});
const searchQuery = ref<string>('');
const pageSize = 12;
const currentPage = ref<number>(1);
const filteredFavorites = computed(() => {
    return favorites.value.filter(game =>
        game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
const paginatedFavorites = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredFavorites.value.slice(start, end);
});
const hasMore = computed(() => filteredFavorites.value.length > currentPage.value * pageSize);
const loadMore = () => {
    currentPage.value += 1;
};
</script>
