<template>
  <div class="container">
    <a-card class="mb-4" style="width: 100%" v-for="(deals, k) in deal" :key="k">
      <template slot="title" class="my-0">
        <div class="float-left d-md-flex">
          <div class="">
            <h4 class="font-weight-bold mb-0" style="color: #474545">{{ deals.title }}</h4>
          </div>
          <Timer class="ml-md-3" v-if="deals.expired === 1" :endtime="deals.expired_date"/>
        </div>
        <div class="all-product-btn text-center float-right">
          <router-link :to="'deal/'+deals.slug" class="btn btn-success">View More</router-link>
        </div>
      </template>
      <ProductSlider :product="deals.product"/>
    </a-card>
  </div>
</template>

<script>
import ProductSlider from "@/components/helper/ProductSlider";
import Timer from "@/components/helper/Timer";
import {mapGetters} from "vuex";

export default {
  name: "Deal",
  components: {Timer, ProductSlider},
  computed: {
    ...mapGetters(["deal"]),
  }
}
</script>

<style scoped>
.btn-success{
  background-color: #28a745!important;
  border-color: #28a745!important;
}
</style>
