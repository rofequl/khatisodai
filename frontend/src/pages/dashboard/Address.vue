<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h3 style="color: #5b5555">{{ NewAddress ? 'Add New Address' : 'Address Book' }}</h3>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <a-card style="width: 100%">
          <UserAddress @change="address"/>
        </a-card>
      </div>
    </div>

  </div>
</template>

<script>
import UserAddress from "@/components/profile/UserAddress";

export default {
  components: {UserAddress},
  name: "Address",
  data() {
    return {
      NewAddress: false
    }
  },
  methods: {
    address(e) {
      this.NewAddress = e
    }
  }

}
</script>

<style scoped>

</style>
