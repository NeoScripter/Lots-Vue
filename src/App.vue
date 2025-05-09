
<script>
import PriceList from '@/pages/PriceList.vue';
import Welcome from './pages/Welcome.vue';

export default {
    components: {
        PriceList,
        Welcome,
    },
    data() {
        return {
            isAuthorized: false,
            authData: {},
            intervalId: null,
        };
    },

    methods: {
        async checkAuth() {
            try {
                const response = await fetch('https://test3.pulsprodaj.ru/api/tgauth', {credentials:'include'});
                const data = await response.json();

                this.authData = data;
                this.isAuthorized = data.res === true;

                if (this.isAuthorized && this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        },
    },
    mounted() {
        this.checkAuth();
        this.intervalId = setInterval(this.checkAuth, 3000);
    },
    beforeDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
    },
};
</script>

<template>
    <div class="parent">
        <PriceList  />
        </div>
</template>

<style scoped>
.parent {
    max-width: 375px;
    margin-inline: auto;
}
</style>

