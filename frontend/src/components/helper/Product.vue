<template>
  <div class="product product-new">
    <figure class="product-media bg-white">
      <router-link :to="{name: 'Product', params: { slug: products.slug}}">
        <img :src="showImage(products.thumbnail_img)" alt="Product image"
             class="product-image p-1">
      </router-link>
      <div class="product-action-vertical">
        <a href="#" class="btn-product-icon btn-wishlist btn-expandable">
          <span>add to wishlist</span></a>
        <a href="#" class="btn-product-icon btn-quickview"
           title="Quick view"><span>Quick view</span></a>
      </div>
    </figure>
    <div class="product-body">
      <h1 class="product-title"><router-link :to="{name: 'Product', params: { slug: products.slug}}">{{ products.name }}</router-link></h1>
      <div class="product-price">
        <span class="currency mr-1">৳</span> {{ products.discount }}
      </div>
      <div class="text-left text-muted font-weight-bold" style="font-size: 12px"
           v-if="products.discount_value > 0">
        <del class="fw-600 opacity-50 mr-1"><span class="currency mr-1">৳</span>{{ products.price }}</del>
        <span class="text-danger mb-1"
              style="padding: 1px">-
                        {{ products.discount_type == 'Percent' ? '' : '৳' }}
                        {{ products.discount_value }}
                        {{ products.discount_type == 'Percent' ? '%' : '' }}
                      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: [Object],
      required: true
    },
  },
  name: "Product"
}
</script>

<style scoped>
.product-new {
  height: 287px !important;
}

@media only screen and (min-width: 575px) and (max-width: 1200px) {
  .product-new {
    height: 335px !important;
  }
}

@media only screen and (min-width: 575px) and (max-width: 768px) {
  .product-new {
    height: 365px !important;
  }
}

@media only screen and (min-width: 0px) and (max-width: 575px) {
  .product-new {
    height: auto !important;
  }
}
</style>
