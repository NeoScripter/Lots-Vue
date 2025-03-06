<script>
export default {
    props: {
        updateSearchUrl: Function,          
        searchLot: Function, 
        closePopup: Function 
    },
    data() {
        return {
            searchUrl: ""
        };
    },
    watch: {
        searchUrl(newUrl) {
            this.updateSearchUrl(newUrl); 
        }
    },
    methods: {
        handleSearchClick() {
            if (!this.searchUrl) return; 
            this.searchLot();  
            this.resetUrls(); 
            this.closePopup();
        },
        resetUrls() {
            this.searchUrl = '';
            this.updateSearchUrl(''); 
        }
    }
};
</script>

<template>
    <div class="search__container">
        <div class="search__input-wrapper">
            <input
                v-model="searchUrl"
                type="search"
                placeholder="Введите url"
            />
            <button @click="resetUrls">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g id="Group 381">
                        <rect x="11.7573" y="3.53552" width="1" height="11" transform="rotate(45 11.7573 3.53552)" fill="black" />
                        <rect x="12.4644" y="11.3137" width="1" height="11" transform="rotate(135 12.4644 11.3137)" fill="black" />
                    </g>
                </svg>
            </button>
        </div>

        <button @click="handleSearchClick" class="button is-light is-medium">
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
    background-color: #f5f8fa;
    display: flex;
    align-items: center;
}

.search__input-wrapper input {
    border: none;
    background-color: #f5f8fa;
    padding: 0.75em;
    width: 100%;
}

.search__input-wrapper button {
    aspect-ratio: 1/1;
    height: 100%;
}
</style>
