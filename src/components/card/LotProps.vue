<script>

export default {
    name: "LotProps",
}
</script>

<template>
    <div class="lot-props">
        <div class="attr">1 корп</div>
        <div class="attr">2 эт.</div>
        <div class="attr">83,90 м2</div>
        <div class="attr">3к</div>
    </div>
</template>

<style scoped>
.lot-props {
    display: flex;
    align-items: center;
}

.attr {
    color: #514f62;
    font-size: 12px;
    font-weight: 400;
    padding-inline: 8px; 
    position: relative;
}

.attr:not(:first-of-type)::after {
    content: '';
    position: absolute;
    background-color: #514f62;
    left: 0;
    width: 1px;
    height: 10px;
    transform: translateY(50%);
    top: 0;
}
</style>