<script>
export default {
    props: {
        complexId: String,
        options: {
            type: Object,
            default: () => ({
                building: '',
                rooms: '',
                sort_field: 'price',
                sort: 'asc',
                page: 1,
                per_page: 20,
            }),
        },
    },
    data() {
        return {
            items: [],
            totalPages: 1,
            totalItems: 0,
            page: 1,
            lotDataIsLoading: false,
            url: '/api/lots/',
        };
    },
    methods: {
        async fetchData() {
            if (this.lotDataIsLoading) return;

            try {
                this.lotDataIsLoading = true;
                this.options.page = this.page;

                const response = await fetch(`${this.url}${this.complexId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.options),
                });

                const data = await response.json();

                if (Array.isArray(data.items) && data.items.length > 0) {
                    this.items = [...this.items, ...data.items];
                }

                this.page++;
                this.totalPages = data.pages;
                this.totalItems = data.total;

            } catch (error) {
                console.error('API Error:', error);
            } finally {
                this.lotDataIsLoading = false;
            }
        },
        async handleScroll() {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 1200;

            if (nearBottom && !this.isLoading && this.page < this.totalPages) {
                await this.fetchData();
            }
        },
    },
    watch: {
        options: {
            handler() {
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
        <slot :items="items" :lotDataIsLoading="lotDataIsLoading" :totalPages="totalPages" :totalItems="totalItems"></slot>
    </div>
</template>
