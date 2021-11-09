<template>
  <div class="main-app">
    <Header/>
    <section class="category-menu-section user-profile">
      <div class="container">
        <div class="section-wrapper">
          <div class="row">
            <div class="col-lg-3 col-12">
              <Sidebar/>
            </div>
            <div class="col-lg-9 col-12 mt-4 mt-lg-0">
              <router-view :key="$route.path"></router-view>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/layout/frontend/Header";
import Footer from "@/layout/frontend/Footer";
import Sidebar from "@/layout/admin/Sidebar";

export default {
  name: "Admin",
  components: {
    Sidebar,
    Header,
    Footer
  }
}
</script>

<style scoped>
.main-app {
  background-color: #f2f3f8;
}
</style>
