export default {
  template: "#productInfoModal",
  props: ["product"],
  data() {
    return {
      modal: "",
      status: {},
      tempProduct: {},
      qty: 1,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};
