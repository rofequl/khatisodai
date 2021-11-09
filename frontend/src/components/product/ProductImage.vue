<template>
  <div>
    <div style="width:100%">
      <image-magnifier :src="thumb"
                       :zoom-src="thumb"
                       width="100%"
                       height="370px"
                       zoom-width="500"
                       class="w-100"
                       zoom-height="400"></image-magnifier>
    </div>
    <swiper class="swiper product-detail-section mt-1" :options="{slidesPerView: carousel.length,
        loopFillGroupWithBlank: false,spaceBetween: 1,slidesPerGroup: 5,}">
      <swiper-slide v-for="(image, k) in carousel" :key="k">
        <img @mouseover="$emit('imageChange',image)" :src="showImage(image)"
             class="product_caro_image rounded"
             width="60px"
             height="60px">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {ImageMagnifier} from 'vue-image-magnifier'

export default {
  name: "ProductImage",
  props: {
    thumb: {
      type: [String],
      required: true
    },
    carousel: {
      type: [Array],
      required: true
    },
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      }
    }
  },
  components: {ImageMagnifier}
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
    background-color: #ffffff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 1px solid #d2caca;
    z-index: 99999;
    margin-top: 0;
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

.product_caro_image {
  border: 1px solid #80808057;
  cursor: pointer;
  padding: 2px;
}

.product_caro_image:hover {
  box-shadow: 0 0 0 1px #f90000d1;
}
</style>
