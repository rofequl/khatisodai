import ApiService from "@/core/services/api.service";

export default {
    state: {
        product: [],
    },

    getters: {
        productList: state => state.product,
        productIndex: state => id => state.product.findIndex(value => value.id === id) + 1,
    },

    actions: {
        PRODUCT_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("product")
                    .then(({data}) => {
                        commit('SET_PRODUCT_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        FEATURES_PRODUCT_ACTIVE({commit}, data) {

            return new Promise((resolve, reject) => {
                commit('SET_FEATURES_PRODUCT_ACTIVE', data);
                ApiService.post("featured_product_active", data)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },
    mutations: {
        SET_PRODUCT_LIST: (state, data) => {
            state.product = data;
        },
        PRODUCT_MODIFY: (state, data) => {
            Object.assign(state.product.find(element => element.id === data.id), data);
        },
        PRODUCT_ADD: (state, data) => {
            state.product.unshift(data);
        },
        PRODUCT_REMOVE: (state, data) => {
            let index = state.product.findIndex(value => value.id === data);
            state.product.splice(index, 1);
        },
        SET_FEATURES_PRODUCT_ACTIVE: (state, data) => {
            state.product.find(element => element.id === data.id).featured = data.active;
        },
    }

}
