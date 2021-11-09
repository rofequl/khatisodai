<template>
  <div class="category-menu-section product-detail-section">
    <a-spin size="large" style="min-height: 400px" :spinning="product === ''" tip="Loading...">
      <div class="container">
        <div class="row">
          <b-col class="my-3" v-if="product !== ''">
            <a-breadcrumb>
              <template slot="separator">
                <i class="fas fa-angle-double-right"></i>
              </template>
              <a-breadcrumb-item>
                <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                <router-link :to="{name: 'category', params: { cat: product.category.slug }}">
                  {{ product.category.name }}
                </router-link>
                <a-menu slot="overlay">
                  <a-menu-item v-for="category in categoryList" :key="category.id">
                    <router-link :to="{name: 'category', params: { cat: category.slug }}">
                      {{ category.name }}
                    </router-link>
                  </a-menu-item>
                </a-menu>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-if="product.position >= 2">
                <router-link
                    :to="{name: 'category', params: { cat: product.category.slug, sub: product.subcategory.slug }}">
                  {{ product.subcategory.name }}
                </router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-if="product.position >= 3">
                <router-link
                    :to="{name: 'category', params: { cat: product.category.slug, sub: product.subcategory.slug, subcat: product.subsubcategory.slug }}">
                  {{ product.subsubcategory.name }}
                </router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item>{{ product.name }}</a-breadcrumb-item>
            </a-breadcrumb>

            <a-card style="width: 100%" class="my-4">
              <b-row>
                <b-col sm="4">
                  <ProductImage @imageChange="data =>{main_image = showImage(data)}" :thumb="main_image"
                                :carousel="product.caro_image"/>
                </b-col>
                <b-col sm="8">
                  <div class="product-details">
                    <DealProduct v-if="product.discount.type === 3" :deal="deal_product"/>
                    <h5 class="mb-0">{{ product.name }}</h5>
                    <a-rate :value="5"/>
                    <span class="ant-rate-text">(5 Reviews)</span>
                    <div class="mb-3">
                      <label class="mb-0 mr-3">Condition: <span
                          style="color: #999999">{{ product.condition === 1 ? 'New' : 'Used' }}</span></label>
                      <label class="mb-0 mr-3" v-if="product.weight">Weight:
                        <span style="color: #999999">{{ product.weight * 1000 + ' Gram' }}</span></label>
                      <label class="mb-0 mr-3" v-if="product.dimension">Dimension :
                        <span style="color: #999999">{{ product.dimension }}</span></label>
                    </div>
                    <a-divider class="my-2"/>
                    <div class="product-price">
                      {{ discount_price }}
                      <small v-if="discount" class="old-price ml-2">( {{ price }} )</small>
                      <small v-if="discount" class="text-danger bg-light p-1 ml-2" style="font-size: 12px">
                        {{ discount_value }}
                      </small>
                    </div>

                    <div class="mb-1 mt-1 font-weight-bold" v-if="product.brand">Brand:
                      <span style="color: #999999">{{ product.brand.name }}</span></div>

                    <div class="mb-1 font-weight-bold" v-if="product.color.condition === 1">Color:
                      <span style="color: #999999">{{ color_value }}</span></div>

                    <div class="product-nav product-nav-thumbs"
                         v-if="product.color.condition === 1 && product.color.type === 2">
                      <p v-for="(value, index) in product.color.option"
                         ref="'colorImage'+index"
                         class="attribute_option color_image_link" :key="index">{{ value.name }}</p>
                    </div>
                    <div class="details-filter-row details-row-size"
                         v-if="product.color.condition === 1 && product.color.type === 1">
                      <div class="product-nav product-nav-thumbs">
                        <a :ref="'colorImage'" class="color_image_link" @click="clickColorImage(color,index)"
                           v-for="(color, index) in product.color.option" :key="index">
                          <img :src="showImage(color.image)" alt="product desc" class="color_image" width="50px"
                               height="50px">
                        </a>
                      </div>
                    </div>
                    <div v-if="product.attribute.condition === 1">
                      <div v-for="(attribute, index) in product.attribute.option" :key="index">
                        <label class="font-weight-bold mb-0">{{ attribute.name }}: <span
                            style="color: #999999">{{ attribute.result }}</span></label>
                        <div class="product-nav product-nav-thumbs">
                          <p :ref="'attribute_option'+index"
                             @click="clickAttributeButton(attribute.name, value,index,index2)"
                             v-for="(value, index2) in attribute.value"
                             class="attribute_option" :key="index2">{{ value }}</p>
                        </div>
                      </div>
                    </div>

                    <b-row class="mt-4">
                      <b-col md="3">
                        <Quantity v-model="quantity" :min="product.quantity.min_qty" :max="max_quantity"
                                  @input="calculationPrice"/>
                      </b-col>
                      <b-col md="8">
                        <span v-if="product.quantity.stock === 2">{{ product.quantity.total }} {{ product.unit.name }} available. </span>
                      </b-col>
                    </b-row>
                    <div class="product-details-action my-4">
                      <a-popover v-model="buy_popover" trigger="change">
                        <template slot="content">
                          {{ cart_popover_message }}
                        </template>
                        <a-button type="danger" class="mr-3 px-5" size="large" @mouseover="checkToCart('buy')"
                                  @mouseleave="buy_popover = false" @click="buyNow">
                          BUY NOW
                        </a-button>
                      </a-popover>
                      <a-popover v-model="cart_popover" trigger="change" placement="topRight">
                        <template slot="content">
                          {{ cart_popover_message }}
                        </template>
                        <a-button class="bg-success text-white mr-3 px-5" size="large" @mouseover="checkToCart('cart')"
                                  @mouseleave="cart_popover = false" @click="addToCart">
                          <i class="fas fa-shopping-cart mr-1"></i>
                          ADD TO CART
                        </a-button>
                      </a-popover>
                      <a-button size="large">
                        <i class="far fa-heart mr-1"></i>
                        0
                      </a-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </a-card>
            <b-row>
              <b-col sm="2">

              </b-col>
              <b-col sm="10">
                <Detail :product="product"/>
              </b-col>
            </b-row>
          </b-col>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductImage from "@/components/product/ProductImage";
import Quantity from "@/components/helper/Quantity";
import Detail from "@/components/product/extra/Detail";
import DealProduct from "@/components/product/DealProduct";

export default {
  name: "Product",
  components: {DealProduct, ProductImage, Quantity, Detail},
  data() {
    return {
      product: '',
      main_image: '',
      value: 1,
      discount: false,
      discount_price: '',
      price: '',
      discount_value: '',
      deal_product: [],
      product_variant: '',
      variation_sku: '',
      color_value: '',
      quantity: 0,
      max_quantity: 0,
      cart_popover: false,
      buy_popover: false,
      cart_popover_message: '',
    }

  },
  methods: {
    getProduct() {
      let product = this.getProductBySlug(this.$route.params.slug);
      if (product) {
        setTimeout(() => {
          this.product = product
        }, 500);
      } else this.$store.dispatch('SINGLE_PRODUCT', this.$route.params.slug);
    },
    clickColorImage(image, index) {
      this.$refs.colorImage.map(e => e.classList.remove('active'))
      this.$refs.colorImage[index].classList.add('active');
      this.color_value = image.name;
      this.main_image = this.showImage(image.image);
      this.makeVariant();
    },
    clickAttributeButton(name, value, index, index2) {
      let id = 'attribute_option' + index;
      this.$refs[id].map(e => e.classList.remove('attribute_option_active'))
      this.$refs[id][index2].classList.add('attribute_option_active');
      this.product.attribute.option.find(x => x.name === name).result = value;
      this.makeVariant();
    },
    calculationPrice() {
      if (this.product) {
        let quantity = this.quantity;
        let discount = this.product.discount;
        let price = this.product.price;
        let total_price = 0;
        let total_discount = 0;
        let discount_value = 0;
        let discount_type = 'Percent';

        if (discount.type !== 0) {
          this.discount = true;
          if (discount.type === 1) {
            discount_value = discount.details.discount_value;
            discount_type = discount.details.discount_type;
          } else if (discount.type === 2) {
            let data = discount.details.filter((item, key) => {
              if (item.min_qty <= quantity && discount.details.length == (key + 1)) {
                return item;
              } else if (item.min_qty <= quantity && quantity < discount.details[(key + 1)].min_qty) {
                return item;
              }
            });
            if (data.length > 0) {
              discount_value = data[0].percent_off;
              discount_type = 'Percent';
            } else this.discount = false;
          } else if (discount.type === 3) {
            discount_value = discount.details.discount_value;
            discount_type = discount.details.discount_type;
            this.deal_product = discount.details;
          }
        }

        if (this.discount) {
          switch (discount_type) {
            case 'Flat':
              this.discount_value = '- ৳' + discount_value;
              break;
            default:
              this.discount_value = '- ' + discount_value + '%';
              break;
          }
        }


        if (price.method === 1) {
          total_price = price.value;
          if (this.discount) {
            switch (discount_type) {
              case 'Flat':
                total_discount = price.value - discount_value;
                break;
              default:
                total_discount = price.value - Math.round((price.value / 100) * discount_value);
                break;
            }
          } else {
            total_discount = price.value;
          }
        } else if (price.method === 2) {
          let e = price.stock;
          if (this.product_variant !== '') {
            let result = e.find(x => x.variant === JSON.stringify(this.product_variant));
            this.variation_sku = result.sku;
            if (this.product.quantity.stock === 2) {
              this.max_quantity = this.product.quantity.max_qty > result.qty ? result.qty : this.product.quantity.max_qty;
              this.quantity = this.quantity > result.qty ? result.qty : this.quantity;
            }
            this.product.quantity.total = result.qty;
            total_price = result.price;
            if (this.discount) {
              switch (discount_type) {
                case 'Flat':
                  total_discount = result.price - discount_value;
                  break;
                default:
                  total_discount = result.price - Math.round((result.price / 100) * discount_value);
                  break;
              }
            } else {
              total_discount = result.price;
            }
          } else {
            let max = e.reduce((a, b) => Number(a.price) > Number(b.price) ? a : b)
            let min = e.reduce((a, b) => Number(a.price) < Number(b.price) && 0 !== Number(a.price) ? a : b)
            total_price = max.price === min.price ? max.price : min.price + ' - ' + max.price;
            let maxprice, minprice;
            if (this.discount) {
              switch (discount_type) {
                case 'Flat':
                  maxprice = max.price - discount_value;
                  minprice = min.price - discount_value;
                  total_discount = maxprice === minprice ? maxprice : minprice + ' - ' + maxprice;
                  break;
                default:
                  maxprice = max.price - Math.round((max.price / 100) * discount_value);
                  minprice = min.price - Math.round((min.price / 100) * discount_value);
                  total_discount = maxprice === minprice ? maxprice : minprice + ' - ' + maxprice;
                  break;
              }
            } else {
              total_discount = max.price === min.price ? max.price : min.price + ' - ' + max.price;
            }
          }
        }

        this.discount_price = '৳' + total_discount;
        this.price = '৳' + total_price;
      }
    },
    makeVariant() {
      let variant = [];
      let color = false;
      let attribute = false;
      if (this.product.color.condition === 1) {
        if (this.color_value !== '') {
          variant.push(this.color_value);
          color = true;
        } else color = false
      } else color = false
      let attributes = this.product.attribute.option;
      if (this.product.attribute.condition === 1) {
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i].result !== "") {
            variant.push(attributes[i].result);
            attribute = true;
          } else {
            attribute = false;
            break;
          }
        }
      } else attribute = false
      color !== false && attribute !== false ? this.product_variant = variant : this.product_variant = '';
    },
    addToCart() {
      if (this.checkToCart('cart')) {
        let data = {};
        data['id'] = this.product.id;
        data['slug'] = this.product.slug;
        data['qty'] = this.quantity;
        if (this.product_variant !== '') {
          let variation = {};
          if (this.product.color.condition === 1) {
            if (this.color_value !== '') {
              variation['color'] = this.color_value;
            }
          }
          let attributes = this.product.attribute.option;
          if (this.product.attribute.condition === 1) {
            for (let i = 0; i < attributes.length; i++) {
              if (attributes[i].result !== "") {
                variation[attributes[i].name] = attributes[i].result;
              }
            }
          }
          data['variation'] = 1;
          data['variation_value'] = variation;
          data['variation_sku'] = this.variation_sku;
        } else data['variation'] = 0;
        this.$store.dispatch('STORE_CART', data)
        this.$message.success('A new item has been added to your Shopping Cart.', 2);
      }
    },
    checkToCart(e) {
      if (this.product.color.condition === 1) {
        if (this.color_value === '') {
          e === 'cart' ? this.cart_popover = true : this.buy_popover = true;
          this.cart_popover_message = 'Please provide the missing information first';
          return false;
        }
      }
      if (this.product.attribute.condition === 1) {
        let attributes = this.product.attribute.option;
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i].result === "") {
            e === 'cart' ? this.cart_popover = true : this.buy_popover = true;
            this.cart_popover_message = 'Please provide the missing information first';
            return false;
          }
        }
      }
      if (this.quantity < this.product.quantity.min_qty) {
        this.cart_popover = true;
        this.cart_popover_message = 'Product order minimum quantity was ' + this.product.quantity.min_qty;
        return false;
      } else if (this.quantity > this.product.quantity.max_qty) {
        e === 'cart' ? this.cart_popover = true : this.buy_popover = true;
        this.cart_popover_message = 'Product order maximum quantity was ' + this.product.quantity.max_qty;
        return false;
      }
      return true;
    },
    buyNow() {
      if (this.checkToCart('buy')) {
        if (!this.isAuthenticated) {
          this.$root.$refs.login.modal('tab2');
        }
      }
    }
  },
  created() {
    this.getProduct();
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
  },
  watch: {
    singleProductIsLoaded(data) {
      if (data) {
        this.getProduct();
      }
    },
    product: function (data) {
      this.main_image = this.showImage(data.main_image);
      this.quantity = Number(this.product.quantity.min_qty);
      this.max_quantity = Number(this.product.quantity.max_qty);
      this.calculationPrice();
    },
    product_variant: function () {
      this.calculationPrice();
    }
  },
  computed: {
    ...mapGetters(["getProductBySlug", "categoryList", "singleProductIsLoaded", "isAuthenticated"])
  },
}
</script>

<style scoped>
.color_image {
  border: 1px solid #80808057;
  cursor: pointer;
}

.attribute_option {
  border: 1px solid #80808057;
  padding: 2px 8px;
  margin: 2px 6px 2px 4px;
  cursor: pointer;
  color: black;
  border-radius: 4px;
}

.attribute_option_active {
  box-shadow: 0 0 0 1px #f90000d1;
}

.attribute_option:hover, .product_caro_image:hover {
  box-shadow: 0 0 0 1px #f90000d1;
}
</style>
