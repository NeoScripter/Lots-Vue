<script>
import { URLS } from '../../const/api-url.js';

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
            lotsAvailable: 0,
            page: 1,
            lotDataIsLoading: false,
            isError: false,
            url: URLS.LOT,
            searchUrl: '',
            abortController: null,
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
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestOptions),
                    signal,
                });

                const data = await response.json();

                this.items = [...this.items, ...data.items];

                this.page++;
                this.totalPages = data.pages;
                this.totalItems = data.total;
                this.lotsAvailable = data.lots_available;
            } catch (error) {
                if (error.name === 'AbortError') return;

                console.error('API Error:', error);
                this.isError = true;
            } finally {
                this.lotDataIsLoading = false;
            }
        },

        async searchLot() {
            if (this.lotDataIsLoading) return;

            try {
                this.resetItems();
                this.lotDataIsLoading = true;
                this.isError = false;

                console.log(this.searchUrl);

                const response = await fetch(
                    `${this.url}${this.complexId}/search`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({search: this.searchUrl}),
                    }
                );

                const data = await response.json();

                this.items = [...data.items];
            } catch (error) {
                console.error('API Error:', error);
                this.isError = true;
            } finally {
                this.lotDataIsLoading = false;
            }
        },

        async handleScroll() {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 500;

            if (nearBottom && !this.isLoading && this.page < this.totalPages) {
                await this.fetchData();
            }
        },
        resetItems() {
            this.items.length = 0;
        },
        updateSearchUrl(newUrl) {
            this.searchUrl = newUrl;
        }
    },
    watch: {
        options: {
            handler() {
                this.resetItems();
                this.fetchData();
            },
            deep: true,
        },
    },
    async created() {
        await this.fetchData();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<template>
    <div>
        <slot
            :items="items"
            :lotDataIsLoading="lotDataIsLoading"
            :lotLoadingError="isError"
            :totalItems="totalItems"
            :lotsAvailable = "lotsAvailable"
            :fetchData="fetchData"
            :resetItems="resetItems"
            :updateSearchUrl="updateSearchUrl"
            :searchLot="searchLot"
        ></slot>
    </div>
</template>
