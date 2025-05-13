<template>
    <portal :to="target">
        <slot />
    </portal>
</template>

<script>
export default {
    name: "ResponsivePortal",
    props: {
        isWide: { type: Boolean, required: true },
        mobile: { type: String, required: true },
        desktop: { type: String, required: true },
    },
    computed: {
        target() {
            return this.isWide ? this.desktop : this.mobile;
        },
    },
};
</script>
