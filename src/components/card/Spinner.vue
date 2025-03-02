<script>
export default {
    name: 'Spiner',
};
</script>

<template>
    <div class="loader-wrapper">
        <div id="chart-loader"></div>
    </div>
</template>

<style scoped>
.loader-wrapper {
    height: 100%;
    position: relative;
}

#chart-loader {
    animation: animate 1.5s linear infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 100px);
}
@keyframes animate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(220deg);
    }
}
#chart-loader:after {
    animation: animate2 1.5s ease-in-out infinite;
    clip: rect(0, 80px, 80px, 40px);
    content: '';
    border-radius: 50%;
    height: 80px;
    width: 80px;
    position: absolute;
}
@keyframes animate2 {
    0% {
        box-shadow: inset #4398b7 0 0 0 4px;
        transform: rotate(-140deg);
    }
    50% {
        box-shadow: inset #4398b7 0 0 0 4px;
    }
    100% {
        box-shadow: inset #4398b7 0 0 0 4px;
        transform: rotate(140deg);
    }
}
</style>
