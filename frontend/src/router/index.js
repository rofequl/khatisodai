import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const isLoggedIn = (to, from, next) => store.getters.isAuthenticated ? next() : next({name: 'home'})

const isLoggedOut = (to, from, next) => store.getters.isAuthenticated ? next({name: 'home'}) : next()

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: "/",
            component: () => import("@/layout/Frontend"),
            children: [
                {
                    meta: {title: 'Home'},
                    path: "/",
                    name: "home",
                    component: () => import("@/pages/Home")
                },
                {
                    meta: {title: 'All Categories List'},
                    path: "/categories",
                    name: "All Categories",
                    component: () => import("@/pages/Category"),
                },
                {
                    meta: {title: 'Flash Deal'},
                    path: "/deal/:slug",
                    name: "Flash Deal",
                    component: () => import("@/pages/Deal")
                },
                {
                    meta: {title: 'Categories'},
                    path: "/category/:cat?/:sub?/:subcat?",
                    name: "category",
                    component: () => import("@/pages/ProductList")
                },
                {
                    meta: {title: 'Categories'},
                    path: "/category/:cat/:sub",
                    name: "category-sub",
                    component: () => import("@/pages/ProductList")
                },
                {
                    meta: {title: 'Terms and Condition'},
                    path: "/terms-conditions",
                    name: "terms-conditions",
                    component: () => import("@/pages/footer/Terms"),
                },
                {
                    meta: {title: 'Privacy Policy'},
                    path: "/privacy-policy",
                    name: "privacy-policy",
                    component: () => import("@/pages/footer/Privacy"),
                },
                {
                    meta: {title: 'About Us'},
                    path: "/about-us",
                    name: "about-us",
                    component: () => import("@/pages/footer/About"),
                },
                {
                    meta: {title: 'Product'},
                    path: "/product/:slug",
                    name: "Product",
                    component: () => import("@/pages/product/Product")
                },
                {
                    meta: {title: 'Cart Product'},
                    path: "/cart",
                    name: "cart",
                    component: () => import("@/pages/product/Cart")
                },
            ]
        },
        {
            path: "/user",
            redirect: "/user/profile",
            beforeEnter: isLoggedIn,
            component: () => import("@/layout/Admin"),
            children: [
                {
                    meta: {title: 'Manage my account'},
                    path: "/user/profile",
                    name: "user-profile",
                    component: () => import("@/pages/dashboard/Dashboard"),
                },
                {
                    meta: {title: 'Edit Profile'},
                    path: "/user/profile-info",
                    name: "profile-info",
                    component: () => import("@/pages/dashboard/Profile"),
                },
                {
                    meta: {title: 'Address Book Manage'},
                    path: "/user/address-book",
                    name: "address-book",
                    component: () => import("@/pages/dashboard/Address")
                },
                {
                    meta: {title: 'My Order List'},
                    path: "/user/order",
                    name: "order-list",
                    component: () => import("@/pages/dashboard/Order")
                },
                {
                    meta: {title: 'Orders Details'},
                    path: "/user/order/:code",
                    name: "orders-details",
                    component: () => import("@/pages/dashboard/OrderDetails")
                },
            ]
        },
        {
            path: "/error",
            component: () => import("@/layout/Frontend"),
            children: [
                {
                    meta: {title: 'Error 500'},
                    path: "/error",
                    name: "error-500",
                    component: () => import("@/pages/error/Error-500"),
                }
            ]
        },
        {
            path: "*",
            component: () => import("@/layout/Frontend"),
            children: [
                {
                    meta: {title: 'Error 404'},
                    path: "*",
                    name: "error-404",
                    component: () => import("@/pages/error/Error-404"),
                }
            ]
        },
    ]
}
