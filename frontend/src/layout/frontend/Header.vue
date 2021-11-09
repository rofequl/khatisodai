<template>
  <div class="header-wrapper">
    <div class="header-top border-bottom">
      <div class="container-fluid">
        <ul class="nav justify-content-end">
          <li class="nav-item active">
            <a class="nav-link" href="#">{{ $t('header.help') }} <i class="fas fa-sm fa-question"
                                                                    style="color: #444;"></i> </a>
          </li>
          <li class="nav-item" v-if="isBangla">
            <a @click.prevent="$store.dispatch('setLang','bn-BD')" v-if="lang === 'en-US'" class="nav-link">বাংলা</a>
            <a @click.prevent="$store.dispatch('setLang','en-US')" v-else class="nav-link">English</a>
          </li>
          <a-dropdown class="nav-item">
            <a class="ant-dropdown-link mt-2" @click="e => e.preventDefault()">
              <i class="fas fa-sm fa-user" style="color: #444;"></i> {{ $t('header.account') }}
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <div class="welcome-part overflow-hidden" v-if="isAuthenticated"
                     @click="$router.push({name: 'user-profile'})">
                  <div class="media">
                    <img width="50" height="50" :src="user.photo_type === 0? showImage(user.photo):user.photo"
                         class="mr-3 rounded-circle" alt="...">
                    <div class="media-body">
                      <h5 class="mt-0" style="font-size: 16px">
                        <p class="text-ellipsis mb-0" style="max-width: 120px">{{ user.name }}</p></h5>
                    </div>
                  </div>
                </div>
                <div class="welcome-part overflow-hidden" v-else>
                  <router-link class="d-block pb-3 font-weight-bold" to="/">
                    {{
                      $t('header.welcome', {msg: isLangBn ? $store.getters.generalSettings.app_name_bd : $store.getters.generalSettings.app_name})
                    }}
                  </router-link>
                  <a id="sign-up" @click.prevent="$refs.child.modal('tab1')"
                     class="btn active btn-outline-success btn-sm mr-1"
                     style="background: #f05931;border-color: #f05931;">{{ $t('header.join') }}</a>
                  <a id="sign-in" @click.prevent="$refs.child.modal('tab2')"
                     class="btn active btn-outline-success btn-sm"
                     style="background: #f05931;border-color: #f05931;">{{ $t('header.signIn') }}</a>
                </div>
              </a-menu-item>
              <a-menu-item v-if="isAuthenticated">
                <router-link to="/user/order">My Orders</router-link>
              </a-menu-item>
              <a-menu-item v-if="isAuthenticated">
                My Wishlist
              </a-menu-item>
              <a-menu-divider v-if="isAuthenticated"/>
              <a-menu-item v-if="isAuthenticated">
                <a href="logout" @click.prevent="onLogout">{{ $t('header.signOut') }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </ul>
      </div>
    </div>

    <div class="logo-search-section">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-3 col-xl-3 col-sm-3 col-6">
            <router-link to="/"><img v-if="$store.getters.generalSettings.logo_black"
                                     :src="showImage($store.getters.generalSettings.logo_black)" class="w-25 logo"
                                     alt="Logo" style="height: 50px"></router-link>
          </div>
          <Search/>
          <div class="col-6 col-md-3 col-sm-2 col-lg-2 col-xl-2 mt-2 card-wrapper">
            <router-link to="/cart">
              <a-badge class="pointer" :count="cartProductCount"
                       :number-style="{ backgroundColor: '#52c41a' }">
                <a-avatar :size="34" class="shopping-cart" shape="square" icon="shopping-cart"/>
              </a-badge>
            </router-link>
            <a-badge :count="0" :number-style="{ backgroundColor: '#52c41a' }">
              <a-avatar :size="34" class="shopping-cart ml-4" shape="square" icon="heart"/>
            </a-badge>
          </div>
        </div>
      </div>
    </div>
    <LoginModal ref="child"/>
  </div>
</template>

<script>
import LoginModal from "@/components/Account/LoginModal";
import {mapGetters} from "vuex";
import Search from "@/components/layout/Search";

export default {
  name: "Header",
  components: {LoginModal, Search},
  methods: {
    onLogout() {
      this.$store.dispatch('LOGOUT')
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "lang", "isBangla", "isLangBn", "cartProductCount"]),
    user() {
      return this.$store.getters.currentUser;
    },
  }
}
</script>

<style scoped>

.shopping-cart {
  background: white;
  color: black;
}

.shopping-cart >>> i {
  font-size: 32px;
}

.header-top .dropdown-menu {
  left: -75px !important;
}

.header-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  margin: 0;
  padding: 0;
  z-index: 101;
  box-shadow: 0 0 10px 0 #ac555142;
}
</style>
