<template>
    <div class="parent">
        <List />
    </div>
</template>

<script>
import List from '@/pages/Pricelist.vue';

export default {
    components: {
        List
    },
};
</script>

<style scoped>
.parent {
    max-width: 375px;
    margin-inline: auto;
}
</style>
