<script>
import { URLS } from "../../const/api-url.js";

export default {
    props: {
        complexId: String,
        options: {
            type: Object,
        },
    },
    data() {
        return {
            items: [],
            totalPages: 1,
            totalItems: 0,
            page: 1,
            lotDataIsLoading: false,
            isError: false,
            url: URLS.LOT,
            searchUrl: "",
            abortController: null,
            lastScrollY: 0,
        };
    },
    methods: {
        async fetchData() {
            if (this.lotDataIsLoading) return;

            try {
                this.lotDataIsLoading = true;
                this.isError = false;

                this.abortController = new AbortController();
                const { signal } = this.abortController;

                const requestOptions = { ...this.options, page: this.page };

                const response = await fetch(`${this.url}${this.complexId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestOptions),
                    signal,
                });

                const data = await response.json();

                this.items = [...this.items, ...data.items];

                this.page++;
                this.totalPages = data.pages;
                this.totalItems = data.total;
            } catch (error) {
                if (error.name === "AbortError") return;

                console.error("API Error:", error);
                this.isError = true;
            } finally {
                this.lotDataIsLoading = false;
            }
        },

        async searchLot() {
            if (this.lotDataIsLoading) return;

            try {
                this.resetItems();
                this.resetPage();
                this.lotDataIsLoading = true;
                this.isError = false;

                const response = await fetch(
                    `${this.url}${this.complexId}/search`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ search: this.searchUrl }),
                    }
                );

                const data = await response.json();

                this.items = [...data.items];
            } catch (error) {
                console.error("API Error:", error);
                this.isError = true;
            } finally {
                this.lotDataIsLoading = false;
            }
        },

        async handleScroll() {
            const currentScrollY = window.scrollY;

            // Only proceed if scrolling down
            if (currentScrollY <= this.lastScrollY) {
                this.lastScrollY = currentScrollY;
                return;
            }

            const nearBottom =
                window.innerHeight + currentScrollY >=
                document.body.offsetHeight - 500;

            if (nearBottom && !this.isLoading && this.page < this.totalPages) {
                await this.fetchData();
            }

            this.lastScrollY = currentScrollY;
        },
        resetItems() {
            this.items.length = 0;
        },
        resetPage() {
            this.page = 1;
        },
        updateSearchUrl(newUrl) {
            this.searchUrl = newUrl;
        },
    },
    computed: {
        filteredOptions() {
            return {
                status: this.options.status,
                building: this.options.building,
                rooms: this.options.rooms,
                sort: this.options.sort,
            };
        },
    },
    watch: {
        filteredOptions: {
            handler() {
                this.resetItems();
                this.resetPage();
                this.fetchData();
            },
            deep: true,
        },
    },
    async created() {
        await this.fetchData();
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

<template>
    <div>
        <slot
            :items="items"
            :lotDataIsLoading="lotDataIsLoading"
            :lotLoadingError="isError"
            :updateSearchUrl="updateSearchUrl"
            :searchLot="searchLot"
        ></slot>
    </div>
</template>
