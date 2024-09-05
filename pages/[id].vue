<template>
    <div v-if="game" class="container mx-auto p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 my-5">
        <NuxtLink to="/"
            class="my-5 px-4 py-3 bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-800 transition duration-300">
            Back to List
        </NuxtLink>
        <div class="flex flex-col md:flex-row items-stretch my-6">
            <div class="flex-shrink-0 w-full md:w-1/3">
                <div class="relative w-full h-80">
                    <img :src="game.background_image" alt="Game Image"
                        class="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md">
                </div>
            </div>
            <div class="flex flex-col justify-between md:ml-4 mt-4 md:mt-0 w-full md:w-2/3">
                <div>
                    <h1 class="text-3xl font-bold mb-3">{{ game.name }}</h1>
                    <p class="text-lg mb-2"><strong>Original Name:</strong> {{ game.name_original }}</p>
                    <p class="text-lg mb-2"><strong>Released:</strong> {{ game.released }}</p>
                    <p class="text-lg mb-2"><strong>Rating:</strong> {{ game.rating }} / {{ game.rating_top }}</p>
                    <p class="text-lg mb-2"><strong>Website:</strong> <u><a :href="game.website" target="_blank">{{
                        game.website }}</a></u></p>
                </div>
                <div>
                    <a :href="game.website" target="_blank"
                        class="inline-block px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300 mb-4 lg:me-3">Visit
                        Official Site</a>
                    <button @click="toggleFavorite"
                        :class="isFavorite ? 'bg-red-500 dark:bg-red-600' : 'bg-blue-500 dark:bg-blue-700'"
                        class="px-4 py-2 text-white dark:text-gray-200 rounded-lg hover:bg-opacity-80 transition duration-300">
                        {{ isFavorite ? 'Remove from Favorite' : 'Add to Favorite' }}
                    </button>
                </div>
            </div>
        </div>
        <div class="my-6">
            <strong class="text-lg">Description:</strong>
            <div v-html="game.description" class="mt-2 text-gray-700 dark:text-gray-400"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const gamesStore = useGamesStore();
const gameId = route.params.id as string;
const game = computed(() => gamesStore.selectedGame);
const favorites = ref<Array<any>>([]);

const updateFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    favorites.value = savedFavorites ? JSON.parse(savedFavorites) : [];
};

const isFavorite = computed(() => {
    return favorites.value.some((fav: any) => fav.id === game.value.id);
});

const toggleFavorite = () => {
    let updatedFavorites = [...favorites.value];
    if (isFavorite.value) {
        updatedFavorites = updatedFavorites.filter((fav: any) => fav.id !== game.value.id);
    } else {
        updatedFavorites.push(game.value);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    updateFavorites(); // Update favorites after changing
};

onMounted(() => {
    gamesStore.fetchGameDetail(gameId);
    updateFavorites(); // Initial load of favorites
});

watch(game, () => {
    updateFavorites(); // Watch game changes to update favorites
});

</script>
