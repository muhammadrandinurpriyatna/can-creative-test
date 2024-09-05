<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="`/${game.id}`">
            <img :src="game.background_image" alt="Game Image" class="w-full h-48 object-cover rounded-t-lg">
            <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ game.name }}</h2>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    game: {
        id: string;
        name: string;
        background_image: string;
    }
}>();
</script>
