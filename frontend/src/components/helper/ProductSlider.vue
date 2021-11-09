<template>
  <swiper class="swiper product-detail-section mt-0" :options="swiperOption">
    <swiper-slide v-for="(products, k) in product" :key="k">
      <div class="product">
        <figure class="product-media">
          <router-link :to="{name: 'Product', params: { slug: products.slug}}">
            <img :src="showImage(products.thumbnail_img)" alt="Product image"
                 class="product-image">
          </router-link>
          <div class="product-action-vertical">
            <a href="#" class="btn-product-icon btn-wishlist btn-expandable">
              <span>add to wishlist</span></a>
            <a href="#" class="btn-product-icon btn-quickview"
               title="Quick view"><span>Quick view</span></a>
          </div>
        </figure>
        <div class="product-body">
          <h1 class="product-title"><router-link :to="{name: 'Product', params: { slug: products.slug}}">{{products.name}}</router-link></h1>
          <div class="product-price">
            <span class="currency mr-1">৳</span> {{products.discount}}
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
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    product: {
      type: [Array],
      required: true
    },
  },
  name: "ProductSlider",
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 5,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          100: {
            slidesPerView: 1,
          },
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;

  .swiper-slide {
    justify-content: center;
    text-align: center;
    position: relative;
    min-height: 1px;
    float: left;
    display: flex;
    align-items: stretch;
    touch-action: pan-y;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 262.5px;
    margin-right: 20px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid #d2caca;
    z-index: 99999;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 15%);
  }

  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: 14px !important;
    font-weight: bold;
    color: black;
  }
}


</style>
