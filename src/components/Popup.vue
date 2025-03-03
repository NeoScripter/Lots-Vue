<script>
import close from '/svgs/close-popup.svg';

export default {
    name: 'Popup',
    props: {
        show: Boolean,
        title: String,
    },
    methods: {
        closePopup() {
            this.$emit('update:show', false);
        },
    },
    data() {
        return {
            close,
        };
    },
};
</script>

<template>
    <transition name="fade">
        <div @click="closePopup" v-show="show" class="overlay">
            <div class="popup" @click.stop>
                <header class="popup__header">
                    <div class="popup__title" v-text="title"></div>
                    <button @click="closePopup">
                        <img :src="close" alt="close btn" />
                    </button>
                </header>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.overlay {
    position: fixed;
    display: flex;
    flex-direction: column;
    inset: 0;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 10;
}

.popup__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 20px;
    margin-bottom: 40px;
}

.popup__title {
    color: #1a1345;
    font-size: 24px;
    font-weight: 700;
}

.popup {
    background-color: white;
    padding-block: 20px;
    border-radius: 25px 25px 0 0;
    height: auto;
    margin-top: auto;
    width: 100%;
}
</style>
