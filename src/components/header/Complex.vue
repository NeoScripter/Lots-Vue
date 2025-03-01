<script>
import DataInfo from './DataInfo.vue';
import TagList from './TagList.vue';

export default {
    props: {
        complexData: Object,
        complexDataIsLoading: Boolean
    },
    name: 'Complex',
    components: { TagList, DataInfo },
};
</script>

<template>
    <div>
        <div v-if="complexDataIsLoading" class="skeleton mb-1 is-size-2 mb-2 mt-3"></div>
        <h1 v-else class="is-size-3 has-text-weight-bold mb-1">
            {{ complexData.name }}
        </h1>

        <TagList
            :tags="[complexData.region, complexData.ao_go, complexData.project_url]"
            :isLoading="complexDataIsLoading"
        />
    </div>
</template>
