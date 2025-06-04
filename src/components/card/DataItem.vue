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
    <div class="card__data-wrapper">
        <header class="card__data__header">{{ title }}</header>
        <div class="card__data__body">{{ `${value === null ? '' : value}${value === null ? '' : suffix}` }}</div>
    </div>
</template>

<style>
.card__data-wrapper {
    flex-shrink: 0;
    min-width: 2rem;
}
.card__data__header {
    color: #8b8b8b;
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 1px;
}

.card__data__body {
    flex-shrink: 0;
    color: #514f62;
    font-size: 11px;
    font-weight: 400;
    height: 1em;
}

@media screen and (min-width: 1024px) {
    .card__data__header {
        display: none;
    }
    .card__data__body {
        display: block;
        height: auto;
        font-size: 0.75rem;
        text-align: center;
    }
    .card__data-wrapper:nth-of-type(2) {
        flex-basis: 45px;
    }
    .card__data-wrapper:nth-of-type(4) {
        flex-basis: 46px;
    }
    .card__data-wrapper:nth-last-of-type(2) {
        flex-basis: 37px;
    }
    .card__data-wrapper:nth-last-of-type(3) {
        flex-basis: 51px;
    }
    .card__data-wrapper:nth-last-of-type(4) {
        flex-basis: 51px;
    }
    .card__data-wrapper:nth-last-of-type(5) {
        flex-basis: 51px;
    }
    .card__data-wrapper:nth-last-of-type(6) {
        flex-basis: 43px;
    }
    .card__data-wrapper:nth-last-of-type(7) {
        flex-basis: 57px;
    }
}
</style>
