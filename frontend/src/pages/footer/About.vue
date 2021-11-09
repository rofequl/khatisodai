<template>
  <div class="category-menu-section">
    <div class="container">
      <div class="row">
        <b-col class="my-3">
          <div class="deepselectors" v-html="about_us"></div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "About",
  created() {
    if (this.about_us === '') this.$store.dispatch('PAGE_SETUP');
  },
  computed: {
    ...mapGetters(["about_us"])
  },
}
</script>

<style scoped>
.deepselectors >>> img {
  width: 100%;
}
</style>
