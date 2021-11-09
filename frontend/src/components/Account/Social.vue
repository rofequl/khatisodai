<template>
  <div class="mt-4">
    <div class="form-row justify-content-center">
      <h6 style="color: #aaa">Quick access with</h6>
    </div>
    <div class="w-100 d-flex justify-content-center">
      <a href="" class="facebook-btn"><i class="fab fa-facebook mr-2"></i> Facebook</a>
      <a href="" class="facebook-btn"><i class="fab fa-google mr-2"></i> Google</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Socail"
}
</script>

<style scoped>
.facebook-btn, .google-btn {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  height: 30px;
  border-radius: 4px;
  margin-right: 5px;
  width: 30%;
  background: #0e63b0;
}

i{
  margin-top: -1px;
}
</style>
