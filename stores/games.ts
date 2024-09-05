export const useGamesStore = defineStore('games', {
    state: () => ({
        games: [] as any[],
        page: 1,
        totalPages: 0,
        query: '',
        selectedGame: null as any | null,
        loading: false // Tambahkan state loading
    }),
    actions: {
        async fetchGames(page: number, search: string = '') {
            this.loading = true; // Set loading ke true saat memulai fetch
            const apiKey = 'de4310885b84420aad16970815531965';
            try {
                const response = await fetch(`https://api.rawg.io/api/games?page=${page}&page_size=12&key=${apiKey}&search=${search}`);
                const data = await response.json();
                this.games = page === 1 ? data.results : [...this.games, ...data.results];
                this.totalPages = Math.ceil(data.count / 12);
                this.page = page;
            } catch (error) {
                console.error('Failed to fetch games:', error);
            } finally {
                this.loading = false; // Set loading ke false setelah selesai fetch
            }
        },
        async fetchGameDetail(id: string) {
            const apiKey = 'de4310885b84420aad16970815531965';
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
            const data = await response.json();
            this.selectedGame = data;
        },
        setQuery(query: string) {
            this.query = query;
        }
    }
});
