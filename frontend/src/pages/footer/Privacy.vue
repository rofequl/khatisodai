<template>
  <div class="category-menu-section">
    <div class="container">
      <div class="row">
        <b-col class="my-3">
          <div class="deepselectors" v-html="privacy"></div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Privacy",
  created() {
    if (this.privacy === '') this.$store.dispatch('PAGE_SETUP');
  },
  computed: {
    ...mapGetters(["privacy"])
  },
}
</script>

<style scoped>
.deepselectors >>> img {
  width: 100%;
}
</style>
