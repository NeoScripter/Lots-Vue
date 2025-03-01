<script>
export default {
    name: 'TagList',
    props: {
        tags: {
            type: Array,
            required: true,
        },
        isLoading: {
            type: Boolean
        }
    },
};
</script>

<template>
    <div class="tag-list mb-2 scrollbar-hidden">
        <div v-for="(tag, index) in tags" :key="index" class="tag" :class="{ skeleton: isLoading }">
            {{ tag }}
        </div>
    </div>
</template>

<style scoped>
.skeleton {
    font-size: 1.2rem !important;
}
.tag-list {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
}

.tag {
    background-color: #e7e7e7;
    padding: 0.4rem 0.75rem;
    border-radius: 5px;
    transition: background 0.2s;
    font-size: 10px;
}
</style>
