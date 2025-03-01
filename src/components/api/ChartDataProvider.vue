<template>
    <div><slot :prices="prices" :isLoading="isLoading"></slot></div>
</template>

<script>
export default {
    name: "ChartDataProvider",
    props: {
        complexId: String,
        lotId: String,
    },
    data() {
        return {
            isLoading: false,
            url: '/api/lot/',
            prices: [],
        };
    },
    methods: {
        async fetchData() {
            if (this.isLoading) return;

            try {
                this.isLoading = true;
                const response = await fetch(
                    `${this.url}${this.complexId}/${this.lotId}/info`
                );
                const data = await response.json();

                if (data.prices && Array.isArray(data.prices)) {
                    this.prices = data.prices;
                }
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
