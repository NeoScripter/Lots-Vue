export default {
  data() {
    return {
      isWide: window.innerWidth > 768,
    };
  },
  methods: {
    checkWidth() {
      this.isWide = window.innerWidth > 768;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkWidth);
  },
};
