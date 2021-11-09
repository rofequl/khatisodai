import ApiService from "@/core/services/api.service";
import {i18n} from "@/core/plugins/i18n";

export default {
    state: {
        generals: [],
        footer: [],
        isMaintenance: false,
        maintenanceDate: '',
        isBangla: false,
        defaultLanguage: 1,
    },

    getters: {
        generalSettings: state => state.generals,
        footerList: state => state.footer,
        isBangla: state => state.isBangla,
        isMaintenance: state => state.isMaintenance,
        defaultLanguage: state => state.defaultLanguage,
    },

    actions: {
        GENERAL_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("general-settings")
                    .then(({data}) => {
                        commit('SET_GENERAL_LIST', data.general);
                        commit('SET_FOOTER_LIST', data.footer);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        BANGLA_ACTIVE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("language_active", data)
                    .then(({data}) => {
                        commit('SET_LANGUAGE_ACTIVE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        DEFAULT_LANGUAGE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("default_language", data)
                    .then(({data}) => {
                        commit('SET_DEFAULT_LANGUAGE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        MAAINTENANCE_ACTIVE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("maintenance_active", data)
                    .then(({data}) => {
                        commit('SET_MAINTENANCE_ACTIVE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        }
    },
    mutations: {
        SET_GENERAL_LIST: (state, data) => {
            state.generals = data;
            switch (data.maintenance_mode) {
                case 1:
                    state.isMaintenance = true;
                    state.maintenanceDate = data.maintenance_date;
                    break;
                case 0:
                    state.isMaintenance = false;
                    state.maintenanceDate = '';
                    break;
            }
            switch (data.default_language) {
                case 1:
                    state.defaultLanguage = 1;
                    i18n.locale = 'en-US'
                    break;
                case 2:
                    state.defaultLanguage = 2;
                    i18n.locale = 'bn-BD'
                    break;
            }
            data.bangla_language === 1 ? state.isBangla = true : state.isBangla = false
        },
        SET_LANGUAGE_ACTIVE: (state, data) => {
            data === 1 ? state.isBangla = true : state.isBangla = false
        },
        SET_DEFAULT_LANGUAGE: (state, data) => {
            switch (data) {
                case 1:
                    state.defaultLanguage = 1;
                    i18n.locale = 'en-US'
                    break;
                case 2:
                    state.defaultLanguage = 2;
                    i18n.locale = 'bn-BD'
                    break;
            }
        },
        SET_MAINTENANCE_ACTIVE: (state, data) => {
            data === 1 ? state.isMaintenance = true : state.isMaintenance = false
        },
        SET_FOOTER_LIST: (state, data) => {
            state.footer = data;
        },
        SET_SHIPPING_METHOD: (state, data) => {
            state.generals.shipping_method = data;
        }
    }
}
