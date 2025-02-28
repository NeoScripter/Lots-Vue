<template>
    <div class="parent">
        <PriceList />
    </div>
</template>

<script>
import PriceList from '@/pages/PriceList.vue';

export default {
    components: {
        PriceList
    },
};
</script>

<style scoped>

.parent {
    max-width: 375px;
    margin-inline: auto;
}
</style>
