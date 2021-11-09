<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Marketing
        </span>
        <h3 class="page-title">New Coupon Entry</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="$router.push('/marketing/coupon')" block size="sm" color="info">Back to coupon list
          </CButton>
        </div>
      </div>
    </div>
    <!-- End Page Header -->


  </div>
</template>

<script>
export default {
  name: "CouponCreate"
}
</script>

<style scoped>

</style>
