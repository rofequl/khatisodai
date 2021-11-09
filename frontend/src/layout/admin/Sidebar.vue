<template>
  <div class="user-menu">
    <div class="user-item">
      <Info/>
      <div class="menu-header">
        <span>User navigation</span>
      </div>
      <div class="user-menulist">
        <ul class="list-item">
          <li>
            <router-link to="/user/profile">
            <button type="button" class="user-btn" :class="{active : $route.path === '/user/profile'}"><span><i class="fa fa-user"></i></span><span>Manage My Account</span>
            </button>
            </router-link>
          </li>
          <li>
            <button type="button" class="user-btn"><span><i class="fa fa-first-order"></i></span><span>Vouchers</span>
            </button>
          </li>
          <li>
            <router-link to="/user/order">
            <button type="button" class="user-btn" :class="{active : $route.path === '/user/order'}"><span><i class="fas fa-first-order"></i></span><span>My orders</span>
            </button></router-link>
          </li>
          <li>
            <button type="button" class="user-btn"><span><i class="fa fa-first-order"></i></span><span>My Wishlist</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Info from "@/components/sidebar/Info";

export default {
  name: "Sidebar",
  components: {Info}
}
</script>

<style scoped>

</style>
