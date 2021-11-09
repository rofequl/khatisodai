<template>
  <div class="category-menu-section">
    <div class="container">
      <div class="row">
        <b-col class="my-3">
          <div class="deepselectors" v-html="terms_condition"></div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "Terms",
  created() {
    if (this.terms_condition === '') this.$store.dispatch('PAGE_SETUP');
  },
  computed: {
    ...mapGetters(["terms_condition"])
  },
}
</script>

<style scoped>
.deepselectors >>> img {
  width: 100%;
}
</style>
