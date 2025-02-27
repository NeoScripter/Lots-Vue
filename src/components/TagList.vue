<template>
    <div class="tag-list">
        <div v-for="(tag, index) in tags" :key="index" class="tag">
            {{ tag }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'TagList',
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.tag-list {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.tag {
    background-color: #e7e7e7;
    padding: 0.4rem 0.75rem;
    border-radius: 5px;
    transition: background 0.2s;
}

.tag:hover {
    background-color: #a9a6a6;
}
</style>
