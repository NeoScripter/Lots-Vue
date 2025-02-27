<template>
    <div class="data-row">
        <span class="data-label">{{ label }}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'DataInfo',
    props: {
        label: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.data-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.data-label {
    font-weight: 600;
}
</style>
