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
    watch: {
        show(newVal) {
            if (newVal) {
                document.documentElement.classList.add('no-scroll');
            } else {
                document.documentElement.classList.remove('no-scroll');
            }
        },
        deep: true,
    },
    data() {
        return {
            close,
        };
    },
    beforeDestroy() {
        document.documentElement.classList.remove('no-scroll');
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
    overflow-y: auto;
    flex-direction: column;
    inset: 0;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 50;
}

.popup__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    text-wrap: balance;
    padding-inline: 20px;
    margin-bottom: 40px;
    gap: 5px;
}

.popup__header button {
    flex-shrink: 0;
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
@media screen and (min-width: 768px) {
    .popup {
        max-width: 20rem;
        margin: auto;
        border-radius: 1rem;
        position: relative;
    }
    .popup__header button {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }
}
</style>
