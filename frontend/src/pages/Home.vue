<template>
  <div>
    <CategoryMenu/>
    <Advertisement/>
    <Deal/>
    <Featured/>
    <Brand/>
    <Newsletter/>
  </div>
</template>

<script>
import CategoryMenu from "@/components/home/CategoryMenu";
import Newsletter from "@/components/home/Newsletter";
import Deal from "@/components/home/Deal";
import Advertisement from "@/components/home/Advertisement";
import Featured from "@/components/home/Featured";
import Brand from "@/components/home/Brand";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {Featured, Brand, Advertisement, Newsletter, CategoryMenu, Deal},
  created() {
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
    if (!this.subcategoryList.length > 0) this.$store.dispatch('SUBCATEGORY_LIST');
    if (!this.subsubcategoryList.length > 0) this.$store.dispatch('SUBSUBCATEGORY_LIST');
    if (!this.homeSlider.length > 0) this.$store.dispatch('HOME_SETUP');
  },
  computed: {
    ...mapGetters(["categoryList", "subcategoryList", "subsubcategoryList", "homeSlider"]),
  }
}
</script>

<style scoped>

</style>
