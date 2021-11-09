<template>
  <div class="mb-4 mt-5" v-if="featured.length > 0">
    <div class="container">
      <a-divider orientation="left" class="my-0">
        <h4 class="font-weight-bold">Featured Product</h4>
      </a-divider>
      <a-row :gutter="10">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="product-detail-section mt-4"
               v-for="(products, k) in featured" :key="k">
          <Product :products="products"/>
        </a-col>
      </a-row>
      <div class="w-100 d-flex">
        <a-button v-if="featuredButton" @click="loadMore"
                  class="mt-4 mx-auto text-success font-weight-bold"
                  style="height: 40px;width: 300px;border-color: #4ca846" :loading="busy" :disabled="busy">LOAD MORE
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Product from "@/components/helper/Product";

export default {
  name: "Featured",
  data() {
    return {
      busy: false
    }
  },
  components: {Product},
  methods: {
    loadMore() {
      this.busy = true;
      this.$store.dispatch('FEATURED_PRODUCT').finally(() => {
        this.busy = false;
      })
    }
  },
  created() {
    if (!this.featured.length > 0) this.$store.dispatch('FEATURED_PRODUCT');
  },
  computed: {
    ...mapGetters(["featured", "featuredButton"]),
  }
}
</script>

<style scoped>
>>> .ant-divider-horizontal.ant-divider-with-text-center::before, .ant-divider-horizontal.ant-divider-with-text-left::before, .ant-divider-horizontal.ant-divider-with-text-right::before, .ant-divider-horizontal.ant-divider-with-text-center::after, .ant-divider-horizontal.ant-divider-with-text-left::after, .ant-divider-horizontal.ant-divider-with-text-right::after {
  position: relative;
  top: 50%;
  display: table-cell;
  border-top: 0.07rem solid #8a8383 !important;
  transform: translateY(50%);
  content: '';
}
</style>
