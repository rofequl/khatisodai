<template>
  <div class="category-menu-section">
    <div class="container pt-0">
      <div class="row">
        <div class="col-md-12 col-lg-3 col-xl-3 col-sm-12 col-12 pt-0" id="category">
          <div class="categorie-menu-wrapper">
            <ul>
              <li>
                <div class="menu-title">
                  <h6 class="mb-0">Categories</h6>
                  <router-link to="/categories">View All</router-link>
                </div>
              </li>
              <li v-for="categories in categoryList.slice(0,13)" :key="categories.id">
                <router-link :to="'category/'+categories.slug">
                  <img :src="showImage(categories.icon)" v-if="categories.icon" class="cat-image"
                       :class="subcategoryById(categories.id).length > 0? 'dropdown-toggle':''">
                  {{ isLangBn ? categories.name_bd : categories.name }}
                </router-link>
                <ul v-if="subcategoryById(categories.id).length > 0" class="cat-overflow" style="font-size: 15px">
                  <li>
                    <div class="card-columns">
                      <div class="card shadow-none border-0"
                           v-for="subcategories in subcategoryById(categories.id).slice(0,6)"
                           :key="subcategories.id">
                        <h6 class="submenu-title cus-mt p-0 pb-2 ml-3"
                            style="border-bottom: 1px solid #efe9e9;font-size: 14px">
                          {{ isLangBn ? subcategories.name_bd : subcategories.name }}</h6>
                        <router-link :to="'category/'+categories.slug+'/'+subcategories.slug+'/'+subsubcategories.slug"
                                     v-for="subsubcategories in subsubcategoryById(subcategories.id)"
                                     :key="subsubcategories.id" class="py-0 my-0">
                          {{ isLangBn ? subsubcategories.name_bd : subsubcategories.name }}
                        </router-link>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div><!-- .col-3 end -->

        <div class="col-md-12 col-lg-9 col-xl-9 col-sm-12 col-12">
          <div class="main-menu">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Offers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Discounts</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">New Recepies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Product Request</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">For Investor</a>
              </li>
            </ul>
          </div>
          <div class="deal-of-the-day">
            <div class="banner-image">
              <div class="rounded">
                <b-carousel
                    id="carousel-fade"
                    fade
                    img-width="100%">
                  <b-carousel-slide v-for="(photo, k) in homeSlider" :key="k">
                    <template #img>
                      <img
                          class="d-block img-fluid w-100"
                          width="100%"
                          :style="{height: '325px!important'}"
                          :src="showImage(photo)"
                          alt="image slot"
                      >
                    </template>
                  </b-carousel-slide>
                </b-carousel>
              </div>
            </div>
            <div class="featured mt-4">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4">
                  <div class="card p-2">
                    <div class="row">
                      <div class="col-3">
                        <img src="image/support.png" alt="" class="w-200 m-auto mt-5">
                      </div>
                      <div class="col-9">
                        <h2 class="featured-title h6">24/7 Friendly Support</h2>
                        <p class="featured-content">Our support team always ready for you.</p>
                      </div>
                    </div>
                  </div>
                </div><!-- .col-12 end -->
                <div class="col-12 col-sm-12 col-md-4">
                  <div class="card p-2">
                    <div class="row">
                      <div class="col-3">
                        <img src="image/delivery.png" alt="" class="w-200 m-auto mt-5">
                      </div>
                      <div class="col-9">
                        <h2 class="featured-title h6">Free Home Delivery</h2>
                        <p class="featured-content">Free shipping on all area order above ৳1000</p>
                      </div>
                    </div>
                  </div>
                </div><!-- .col-12 end -->
                <div class="col-12 col-sm-12 col-md-4">
                  <div class="card p-2">
                    <div class="row">
                      <div class="col-3">
                        <img src="image/quality.png" alt="" class="w-200 m-auto mt-5">
                      </div>
                      <div class="col-9">
                        <h2 class="featured-title h6">Quality Guaranteed</h2>
                        <p class="featured-content">If your product aren't perfect, return.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CategoryMenu",
  computed: {
    ...mapGetters(["categoryList", "subcategoryById", "subsubcategoryById", "homeSlider", "isLangBn"])
  },
}
</script>

<style scoped>
.cat-image {
  width: 16px;
  opacity: .6;
  margin-right: 10px;
}

.cat-overflow {
  overflow: auto;
}

.cat-overflow::-webkit-scrollbar {
  width: 4px;
  background-color: #F5F5F5;
}

.cat-overflow::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(234, 217, 217, 0.3);
  background-color: #555;
}
</style>
