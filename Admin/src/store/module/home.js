import ApiService from "@/core/services/api.service";

export default {
    state: {
        homeSlider: [],
        isTopBrand: false,
    },

    getters: {
        homeSlider: state => state.homeSlider,
        isTopBrand: state => state.isTopBrand,
    },

    actions: {
        HOME_SETUP({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("home-setup")
                    .then(({data}) => {
                        commit('SET_HOME_SLIDER_LIST', data.home_slider);
                        commit('SET_TOP_BRAND_ACTIVE', data.top_brand);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        TOP_BRAND_ACTIVE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("top_brand_active", data)
                    .then(({data}) => {
                        commit('SET_TOP_BRAND_ACTIVE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },

    mutations: {
        SET_HOME_SLIDER_LIST: (state, data) => {
            if (data) {
                data = JSON.parse(data);
                if (data.length > 0) {
                    state.homeSlider = data;
                }
            }
        },
        SET_TOP_BRAND_ACTIVE: (state, data) => {
            data === 1 ? state.isTopBrand = true : state.isTopBrand = false
        },
    }

}
