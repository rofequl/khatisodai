<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 style="color: #5b5555">Manage My Account</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <a-card style="width: 100%">
          <h6 style="font-size: 18px">Personal Profile |
            <router-link to="/user/profile-info" style="font-size: 12px">EDIT</router-link>
          </h6>
          <p class="mb-1">{{ user.name }}</p>
          <p class="mb-1">{{ user.email }}</p>
          <p class="mb-1">{{ user.mobile }}</p>
        </a-card>
      </div>
      <div class="col-md-8">
        <a-card style="width: 100%">
          <h6 style="font-size: 18px">Address Book |
            <router-link to="/user/address-book" style="font-size: 12px">EDIT</router-link>
          </h6>
          <div class="row">
            <div class="col-md-6 border-right">
              <p class="mb-2" style="color: #28a745;font-size: 12px">DEFAULT SHIPPING ADDRESS</p>
              <p class="mb-1">Nayem</p>
              <p class="mb-1">157 no. khanpur main road Narayanganj.
                Dhaka - Narayanganj - Narayanganj Sadar
                (+880) 1966634890</p>
            </div>
            <div class="col-md-6">
              <p class="mb-2" style="color: #28a745;font-size: 12px">DEFAULT BILLING ADDRESS</p>
              <p class="mb-1">Nayem</p>
              <p class="mb-1">157 no. khanpur main road Narayanganj.
                Dhaka - Narayanganj - Narayanganj Sadar
                (+880) 1966634890</p>
            </div>
          </div>
        </a-card>

      </div>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
  }
}
</script>

<style scoped>

</style>
