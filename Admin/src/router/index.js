import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const isAdminLoggedIn = (to, from, next) => store.getters.isAuthenticated ? next() : next({name: 'login'})

const isAdminLoggedOut = (to, from, next) => store.getters.isAuthenticated ? next({name: 'login'}) : next()

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
            redirect: "/dashboard",
            component: () => import("@/layout/Layout"),
            beforeEnter: isAdminLoggedIn,
            children: [
                {
                    meta: {title: 'Dashboard'},
                    path: "/dashboard",
                    name: "dashboard",
                    component: () => import("@/pages/Dashboard.vue")
                },
                // Product
                {
                    meta: {title: 'Product List'},
                    path: "/product/product-list",
                    name: "product-list",
                    component: () => import("@/pages/product/Product")
                },
                {
                    meta: {title: 'Product create'},
                    path: "/product/product-create",
                    name: "product-create",
                    component: () => import("@/pages/product/add/ProductCreate")
                },
                {
                    meta: {title: 'Category Manage'},
                    path: "/product/category",
                    name: "category",
                    component: () => import("@/pages/product/Category")
                },
                {
                    meta: {title: 'Brand Manage'},
                    path: "/product/brand",
                    name: "brand",
                    component: () => import("@/pages/product/Brand")
                },
                {
                    meta: {title: 'Sub-Category Manage'},
                    path: "/product/sub-category",
                    name: "subcategory",
                    component: () => import("@/pages/product/SubCategory")
                },
                {
                    meta: {title: 'Sub-Subcategory Manage'},
                    path: "/product/sub-subcategory",
                    name: "subsubcategory",
                    component: () => import("@/pages/product/SubSubCategory")
                },
                {
                    meta: {title: 'Product Attribute'},
                    path: "/product/attribute",
                    name: "attribute",
                    component: () => import("@/pages/product/Attribute")
                },
                // Marketing
                {
                    meta: {title: 'Customers List'},
                    path: "/customer/customer-list",
                    name: "customer-list",
                    component: () => import("@/pages/customer/Customer")
                },
                // Marketing
                {
                    meta: {title: 'Flash Deals'},
                    path: "/marketing/flash-deals",
                    name: "Flash Deals",
                    component: () => import("@/pages/marketing/FlashDeal")
                },
                {
                    meta: {title: 'Create New Flash Deals'},
                    path: "/marketing/flash-deals-create",
                    name: "Flash Deals Create",
                    component: () => import("@/pages/marketing/add/FlashCreate")
                },
                {
                    meta: {title: 'Coupon List'},
                    path: "/marketing/coupon",
                    name: "coupon",
                    component: () => import("@/pages/marketing/Coupon")
                },
                {
                    meta: {title: 'New Coupon Add'},
                    path: "/marketing/new-coupon",
                    name: "CouponCreate",
                    component: () => import("@/pages/marketing/add/CouponCreate")
                },
                // Setup & Configurations
                {
                    meta: {title: 'General Settings'},
                    path: "/setup/general-setting",
                    name: "general-setting",
                    component: () => import("@/pages/setup/General")
                },
                {
                    meta: {title: 'Website Pages'},
                    path: "/setup/pages",
                    name: "website-pages",
                    component: () => import("@/pages/setup/Pages")
                },
                {
                    meta: {title: 'Home Page Settings'},
                    path: "/admin/setup/home-edit",
                    name: "home-edit",
                    component: () => import("@/pages/setup/pages/Home")
                },
                {
                    meta: {title: 'Privacy Page Settings'},
                    path: "/admin/setup/privacy-edit",
                    name: "privacy-edit",
                    component: () => import("@/pages/setup/pages/Privacy")
                },
                {
                    meta: {title: 'Terms & Condition Page Settings'},
                    path: "/admin/setup/terms-edit",
                    name: "terms-edit",
                    component: () => import("@/pages/setup/pages/Terms")
                },
                {
                    meta: {title: 'About Page Settings'},
                    path: "/admin/setup/about-edit",
                    name: "about-edit",
                    component: () => import("@/pages/setup/pages/About")
                },
                {
                    meta: {title: 'Product Settings'},
                    path: "/setup/setup-attributes",
                    name: "setup-attributes",
                    component: () => import("@/pages/setup/Product")
                },
                // Shipping
                {
                    meta: {title: 'Shipping Configuration'},
                    path: "/shipping/configuration",
                    name: "shipping-configuration",
                    component: () => import("@/pages/shipping/Shipping")
                },
                {
                    meta: {title: 'Region Manage'},
                    path: "/shipping/region",
                    name: "shipping-region",
                    component: () => import("@/pages/shipping/Region")
                },
                {
                    meta: {title: 'City Manage'},
                    path: "/shipping/city",
                    name: "shipping-city",
                    component: () => import("@/pages/shipping/City")
                },
                {
                    meta: {title: 'Area Manage'},
                    path: "/shipping/area",
                    name: "shipping-area",
                    component: () => import("@/pages/shipping/Area")
                },
                // Sales
                {
                    meta: {title: 'All Orders'},
                    path: "/sales/all-orders",
                    name: "all-orders",
                    component: () => import("@/pages/sales/AllOrder")
                },
                {
                    meta: {title: 'Orders Details'},
                    path: "/sales/all-orders/:code",
                    name: "orders-details",
                    component: () => import("@/pages/sales/OrderDetails")
                },
            ]
        },
        {
            meta: {title: 'Admin - Login'},
            path: "/login",
            name: "login",
            beforeEnter: isAdminLoggedOut,
            component: () => import("@/pages/Login"),
        },
        {
            path: "/error",
            component: () => import("@/layout/Layout"),
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
            component: () => import("@/layout/Layout"),
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
