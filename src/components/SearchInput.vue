<template>
    <div class="search__container">
        <form @submit.prevent="handleSearchClick" class="search__input-wrapper">
            <input
                ref="searchInput"
                v-model="searchUrl"
                type="search"
                placeholder="Введите url"
                @focus="onFocus"
                @blur="onBlur"
            />

            <button class="button is-light is-small search-btn__desktop">
                <img :src="searchIcon" alt="Filter" />
            </button>

            <button
                type="button"
                @click="resetUrls"
                class="button is-light is-small"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g id="Group 381">
                        <rect
                            x="11.7573"
                            y="3.53552"
                            width="1"
                            height="11"
                            transform="rotate(45 11.7573 3.53552)"
                            fill="black"
                        />
                        <rect
                            x="12.4644"
                            y="11.3137"
                            width="1"
                            height="11"
                            transform="rotate(135 12.4644 11.3137)"
                            fill="black"
                        />
                    </g>
                </svg>
            </button>
        </form>

        <button
            @click="handleSearchClick"
            class="button is-light is-medium search-btn__mobile"
        >
            Поиск
        </button>
    </div>
</template>

<style scoped>
.search__container {
    display: grid;
    gap: 1rem;
    margin-inline: 20px;
    margin-top: -20px;
}

.search__input-wrapper {
    border-radius: 0.25rem;
    background-color: #f5f8fa;
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.search__input-wrapper input {
    border-radius: 0.25rem;
    border: none;
    background-color: #f5f8fa;
    padding: 0.75em;
    width: 100%;
}

.search__input-wrapper button {
    aspect-ratio: 1/1;
    height: 100%;
}

.search-btn__desktop {
    display: none;
}

@media screen and (min-width: 768px) {
    .search__container {
        margin-inline: 0.75rem;
        margin-top: 0.75rem;
        padding: 1rem;
        background-color: white;
    }

    .search-btn__mobile {
        display: none;
    }

    .search-btn__desktop {
        display: flex;
    }
}
</style>

<script>
import searchIcon from '/svgs/search.svg';

export default {
    props: {
        updateSearchUrl: Function,
        searchLot: Function,
        closePopup: Function,
        resetLotOptions: Function,
        show: {
            type: Boolean,
            default: false,
        },
        lotOptions: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            searchIcon,
            searchUrl: '',
        };
    },
    watch: {
        searchUrl(newUrl) {
            this.updateSearchUrl(newUrl);
        },
        show(newVal) {
            if (newVal && screen.width <= 768) {
                setTimeout(() => {
                    this.$refs.searchInput?.focus();
                }, 100);
            }
        },
        filteredLotOptions: {
            handler() {
                this.searchUrl = '';
                this.updateSearchUrl('');
            },
            deep: true,
        },
    },
    computed: {
        filteredLotOptions() {
            const { searchUrl, ...rest } = this.lotOptions;
            return rest;
        },
    },
    methods: {
        handleSearchClick() {
            if (!this.searchUrl) return;
            this.searchLot();
            this.closePopup();
        },
        resetUrls() {
            this.searchUrl = '';
            this.updateSearchUrl('');
            this.resetLotOptions();
        },
        onFocus() {
            document.documentElement.classList.add('no-scroll');
        },
        onBlur() {
            document.documentElement.classList.remove('no-scroll');
        },
    },
    updated() {
        this.$nextTick(() => {
            this.$refs.searchInput?.focus();
        });
    },
};
</script>
