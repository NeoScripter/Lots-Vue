<script>
export default {
    name: 'DataItem',
    props: {
        title: {
            type: String,
            required: true,
        },
        value: {
            required: true,
        },
        suffix: {
            type: String,
            default: '',
        }
    },
};
</script>

<template>
    <div>
        <header class="card__data__header">{{ title }}</header>
        <div class="card__data__body">{{ `${value === null ? '' : value}${value === null ? '' : suffix}` }}</div>
    </div>
</template>

<style scoped>
.card__data__header {
    color: #8b8b8b;
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 1px;
}

.card__data__body {
    color: #514f62;
    font-size: 11px;
    font-weight: 400;
    height: 1em;
}
</style>
