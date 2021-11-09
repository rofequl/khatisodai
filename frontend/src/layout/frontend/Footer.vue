<template>
  <div>
    <div class="footer-top bg-white pt-5 pb-5 border-top">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="footer-description">
              <div class="logo">
                <img v-if="$store.getters.generalSettings.logo_black" :src="showImage($store.getters.generalSettings.logo_black)" alt="">
              </div>
              <div class="pt-4 pb-4" v-html="$store.getters.footerList.description"></div>
              <div v-if="$store.getters.footerList.social">
                <a :href="$store.getters.footerList.facebook"><i class="fab fa-facebook"></i></a>
                <a :href="$store.getters.footerList.twitter"><i class="fab fa-twitter"></i></a>
                <a :href="$store.getters.footerList.youtube"><i class="fab fa-youtube"></i></a>
                <a :href="$store.getters.footerList.insta"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-7">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="quick-link">
                  <h3 class="font-weight-bold h6 mb-5">Quick Link</h3>
                  <router-link to="/about-us" class="text-dark">About {{$store.getters.generalSettings.app_name}}</router-link>
                  <router-link to="/terms-conditions" class="text-dark">Term & Conditions</router-link>
                  <router-link to="/privacy-policy" class="text-dark">Privacy Policy</router-link>
                  <a href="" class="text-dark">Quotation</a>
                  <a href="" class="text-dark">FAQS</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md-4">
                <div class="shopping-online">
                  <h3 class="font-weight-bold h6 mb-5">Shopping Online</h3>
                  <a href="" class="text-dark">Help Center</a>
                  <a href="" class="text-dark">Customer Service</a>
                  <a href="" class="text-dark">Return & Refunds</a>
                  <a href="" class="text-dark">Sell on {{$store.getters.generalSettings.app_name}}</a>
                  <a href="" class="text-dark">Affiliate program</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md-4">
                <div class="contact-us">
                  <h3 class="font-weight-bold h6 mb-5">Contact Us</h3>
                  <a href="" class="text-dark"><i class="fas fa-map-marker-alt"></i> {{$store.getters.footerList.address}}</a>
                  <a href="" class="text-dark"><i class="fas fa-mobile-alt"></i> {{$store.getters.footerList.phone}}</a>
                  <a href="" class="text-dark">{{$store.getters.footerList.working}}</a>
                  <a href="" class="text-dark"><i class="fas fa-envelope"></i> {{$store.getters.footerList.email}}</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
            </div><!-- .row end -->
          </div>
        </div><!-- .row end -->
      </div><!-- .container end -->
    </div><!-- .footer-top end -->

    <div class="footer-bottom bg-white border-top overflow-hidden">
      <div class="container">
        <div class="text-center mt-2" v-html="$store.getters.footerList.copyright"></div>
      </div>
    </div><!-- .footer-bottom end -->
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
