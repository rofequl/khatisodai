import Vue from 'vue'
import Vuex from 'vuex'

const APP_LANGUAGE = 'app_language'
import storage from "@/core/services/storage.service";
import {loadLanguageAsync} from '@/locales'

import category from "@/store/module/category";
import subcategory from "@/store/module/subcategory";
import subsubcategory from "@/store/module/subsubcategory";
import home from "@/store/module/home";
import product from "@/store/module/product";
import general from "@/store/module/general";
import page from "@/store/module/page";
import attribute from "@/store/module/attribute";
import auth from "@/store/module/auth";
import address from "@/store/module/address";
import region from "@/store/module/region";
import city from "@/store/module/city";
import area from "@/store/module/area";
import cart from "@/store/module/cart";
import order from "@/store/module/order";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        category,
        subcategory,
        subsubcategory,
        home,
        product,
        general,
        page,
        attribute,
        auth,
        address,
        region,
        city,
        area,
        cart,
        order
    },
    state: {
        lang: 'en-US',
    },
    getters: {
        lang: state => state.lang,
        isLangBn: state => state.lang === 'bn-BD',
    },
    mutations: {
        [APP_LANGUAGE]: (state, lang) => {
            state.lang = lang
            storage.set(APP_LANGUAGE, lang)
        },
    },
    actions: {
        setLang({commit}, lang) {
            return new Promise((resolve, reject) => {
                commit(APP_LANGUAGE, lang)
                loadLanguageAsync(lang).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                })
            })
        }
    }
})
