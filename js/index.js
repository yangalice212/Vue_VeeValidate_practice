import productInfoModal from "./productInfoModal.js";

const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "yangalice212";

const app = Vue.createApp({
  data() {
    return {
      products: [],
      product: {},
      cart: {},
      loadingStatus: {
        loadingItem: "",
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products`;
      axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/products/${id}`;
      this.loadingStatus.loadingItem = id;
      axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.product = res.data.product;
            this.$refs.productInfoModal.openModal();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(id, qty) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
      };
      axios.post(url, { data: cart }).then((res) => {
        console.log(res);
      });
    },
    clearCart() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getCart();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
});

app.component("productInfoModal", productInfoModal);

app.mount("#app");
