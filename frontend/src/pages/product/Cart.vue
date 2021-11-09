<template>
  <div class="category-menu-section">
    <b-container>
      <b-row>
        <b-col v-if="checkout" md="8">
          <Shipping/>
          <Payment @onPayment="onPayment"/>
          <OrderList :order_list="order_list"/>
        </b-col>
        <SelectProduct v-else @order="selectProduct"/>
        <b-col md="4">
          <a-card style="width: 100%;border-radius: 20px" class="mt-4 p-0">
            <h5 class="font-weight-bold">Order Summary</h5>
            <div class="row">
              <div class="col-6 my-3">
                Subtotal
              </div>
              <div class="col-6 text-right my-3">
                ৳ {{ sub_total.toFixed(2) }}
              </div>
              <div class="col-6">
                Shipping
              </div>
              <div class="col-6 text-right">
                ৳ {{ shipping.toFixed(2) }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-6 mb-3">
                <h5 class="font-weight-bold">Total</h5>
              </div>
              <div class="col-6 text-right">
                <h5 class="font-weight-bold">৳ {{ total.toFixed(2) }}</h5>
              </div>
            </div>
            <a-button @click="order" v-if="checkout" class="text-white bg-success w-100"
                      style="border-color:rgb(54 132 72)"> Place
              Order
            </a-button>
            <a-popover v-else v-model="button_error" trigger="change" placement="bottom">
              <template slot="content" class="border">
                You haven't selected any items yet
              </template>
              <a-button class="text-white bg-success w-100" style="border-color:rgb(54 132 72)"
                        @mouseleave="button_error = false" @click="checkoutProceed"> PROCEED TO CHECKOUT
                ({{ order_list.length }})
              </a-button>
            </a-popover>
          </a-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SelectProduct from "@/components/cart/SelectProduct";
import Shipping from "@/components/cart/Shipping";
import Payment from "@/components/cart/Payment";
import OrderList from "@/components/cart/OrderList";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "Cart",
  components: {OrderList, Payment, Shipping, SelectProduct},
  data() {
    return {
      button_error: false,
      checkout: false,
      order_list: [],
      payment_type: '',
      sub_total: 0,
      shipping: 0,
      total: 0,
    }
  },
  methods: {
    loadQuery() {
      let e = this.$route.query.type;
      if (e) {
        if (e === 'checkout') {
          this.order_list.length > 0 ? this.checkout = true : this.$router.push('/cart');
        } else this.$router.push({name: "error-404"});
      } else this.checkout = false
    },
    selectProduct(e) {
      this.order_list = e
    },
    calculationPrice() {
      let e = this.order_list;
      this.sub_total = e.reduce((a, b) => a + (b['total_price'] || 0), 0);
      this.total = this.sub_total + this.shipping;
    },
    checkoutProceed() {
      if (this.order_list.length === 0) {
        this.button_error = true;
      } else {
        if (!this.isAuthenticated) {
          this.$root.$refs.login.modal('tab2');
        } else {
          this.$router.push({path: "/cart", query: {type: 'checkout'}})
        }
      }

    },
    onPayment(e) {
      this.payment_type = e
    },
    order() {
      if (this.payment_type === '') {
        this.$warning({
          title: 'Warning',
          content: 'Please select an available payment method',
        });
        return false;
      }

      if (this.addressList.length === 0) {
        this.$warning({
          title: 'Warning',
          content: 'Please fill in your shipping information',
        });
        return false;
      }
      let that = this;
      ApiService.post("order", {order_list: this.order_list, payment_type: this.payment_type})
          .then(({data}) => {
            this.$success({
              title: 'Thank you for your order',
              onOk() {
                that.order_list.filter(cart => {
                  if (cart.check_list) {
                    that.$store.commit('CART_REMOVE_SINGLE', cart);
                    that.$store.commit('STORE_CART_PRODUCT', cart);
                  }
                });
                that.$router.push('/user/order')
              },
            });
          })
          .catch(error => {
            this.$notification['error']({
              message: 'Warning',
              description: ((error.response || {}).data || {}).message || 'Something Wrong',
              style: {marginTop: '41px'},
              duration: 4
            })
          })
    }
  },
  created() {
    this.loadQuery()
  },
  watch: {
    order_list: function () {
      this.calculationPrice()
    },
    '$route.query.type'(e) {
      this.loadQuery()
    }
  },
  computed: {
    ...mapGetters(["addressList", "isAuthenticated"])
  },
}
</script>

<style scoped>

</style>
