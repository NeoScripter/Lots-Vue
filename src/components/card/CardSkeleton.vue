<script>
export default {
    name: 'CardSkeleton',
};
</script>

<template>
    <div>
        <div class="card__container mb-3">
            <div class="skeleton small mb-1"></div>
            <div class="skeleton large mb-1"></div>
            <div class="skeleton-flex">
                <div class="skeleton large mb-1"></div>
                <div class="skeleton small mb-1"></div>
            </div>
        </div>

        <div class="card__container mb-3">
            <div class="skeleton small mb-1"></div>
            <div class="skeleton large mb-1"></div>
            <div class="skeleton-flex">
                <div class="skeleton large mb-1"></div>
                <div class="skeleton small mb-1"></div>
            </div>
        </div>

        <div class="card__container mb-3">
            <div class="skeleton small mb-1"></div>
            <div class="skeleton large mb-1"></div>
            <div class="skeleton-flex">
                <div class="skeleton large mb-1"></div>
                <div class="skeleton small mb-1"></div>
            </div>
        </div>

        <div class="card__container mb-3">
            <div class="skeleton small mb-1"></div>
            <div class="skeleton large mb-1"></div>
            <div class="skeleton-flex">
                <div class="skeleton large mb-1"></div>
                <div class="skeleton small mb-1"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card__container {
    background-color: white;
    border-radius: 5px;
    padding: 14px;
    display: grid;
    gap: 12px;
}

.card__container .skeleton.large {
    font-size: 25px;
}

.card__container .skeleton.small {
    font-size: 20px;
}

.skeleton-flex {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.skeleton-flex .large {
    width: 50%;
}

.skeleton-flex .small {
    width: 25%;
}
</style>
