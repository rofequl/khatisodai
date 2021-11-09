<template>
  <div class="category-menu-section">
    <div class="container-fluid">
      <div class="row" v-if="flash_details.banner">
        <img :src="showImage(flash_details.banner)" width="100%" height="100px">
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="col-12">
            <h2 class="text-center my-3 font-weight-bold">{{ flash_details.title }}</h2>
            <div class="text-center" v-if="flash_details.expired === 1">
              <h4>
                <Timer :endtime="flash_details.expired_date"></Timer>
              </h4>
            </div>
            <a-row :gutter="10">
              <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="product-detail-section mt-4"
                     v-for="(products, k) in flash_details.product" :key="k">
                <Product :products="products"/>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/helper/Timer";
import Product from "@/components/helper/Product";
import {mapGetters} from "vuex";

export default {
  name: "Deal",
  data() {
    return {
      flash_details: [],
    }
  },
  methods: {
    loadDeal() {
      if (this.deal.length > 0) {
        let deal = this.dealListBySlug(this.$route.params.slug);
        if (deal) {
          this.flash_details = deal;
        } else this.$router.push({name: "error"});
      }
    }
  },
  created() {
    if (!this.deal.length > 0) this.$store.dispatch('HOME_SETUP');
    this.loadDeal();
  },
  computed: {
    ...mapGetters(["homeSlider", "deal", "dealListBySlug"]),
  },
  watch: {
    deal() {
      this.loadDeal();
    }
  },
  components: {Product, Timer}
}
</script>

<style scoped>

</style>
