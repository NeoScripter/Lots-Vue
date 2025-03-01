<template>
    <div>
        <slot :items="items" :isLoading="isLoading"></slot>
    </div>
</template>

<script>
export default {
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            items: [],
            isLoading: false,
            page: 1,
        };
    },
    methods: {
        async fetchData() {
            if (this.isLoading) return;

            try {
                this.isLoading = true;
                const response = await fetch(
                    `${this.apiUrl}?page=${this.page}&limit=20`
                );
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    this.items = [...this.items, ...data]; 
                    this.page++; 
                }
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async handleScroll() {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (nearBottom && !this.isLoading) {
                await this.fetchData();
            }
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
