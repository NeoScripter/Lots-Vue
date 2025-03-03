<script>
export default {
    props: {
        url: String,
    },
    data() {
        return {
            seachItems: [],
            searchIsLoading: false,
        };
    },
    methods: {
        async searchLot() {
            if (this.searchIsLoading) return;

            try {
                this.searchIsLoading = true;

                const response = await fetch(`${this.url}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.url),
                });

                const data = await response.json();

                this.seachItems = [...data.items];
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                this.searchIsLoading = false;
            }
        }
    },
    async created() {
        await this.searchLot();
    },
};
</script>

<template>
    <div>
        <slot
            :seachItems="seachItems"
            :searchIsLoading="searchIsLoading"
            :searchLot="searchLot"
        ></slot>
    </div>
</template>
