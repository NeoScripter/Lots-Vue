<script>
export default {
    name: 'DataItem',
    props: {
        header: String,
        body: String
    }
};
</script>

<template>
    <div>
        <header class="card__data__header" v-text="header"></header>
        <div class="card__data__body" v-text="body"></div>
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
    font-size: 13px;
    font-weight: 400;
}
</style>
