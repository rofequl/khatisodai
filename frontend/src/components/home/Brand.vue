<template>
  <div class="mb-4" v-if="topBrand.length > 0">
    <div class="container">
      <a-card style="width: 100%">
        <template slot="title" class="my-0">
          <div class="float-left d-md-flex">
            <div class="">
              <h4 class="font-weight-bold mb-0" style="color: #474545">Top Brands</h4>
            </div>
          </div>
        </template>
        <a-tooltip :title="brand.name" v-for="(brand, k) in topBrand" :key="k">
          <a-avatar :size="74" class="m-2 border top-brand" :src="showImage(brand.logo)"/>
        </a-tooltip>
      </a-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Brand",
  computed: {
    ...mapGetters(["topBrand"]),
  }
}
</script>

<style scoped>
.top-brand {
  cursor: pointer;
}

.top-brand:hover {
  box-shadow: 0 0 17px 1px #00000024;
}
</style>
