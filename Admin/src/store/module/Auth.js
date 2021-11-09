import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import router from "../../router";

const auth = {
    state: {
        user: {},
        isLoad: false,
        isAuthenticated: !!JwtService.getToken(),
        customerList: []
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        currentUser: state => state.user,
        isLoadProfile: state => state.isLoad,
        customerList: state => state.customerList,
        customerListIndex: state => id => state.customerList.findIndex(value => value.id === id) + 1,
    },
    actions: {
        LOGIN({commit}, credentials) {
            return new Promise((resolve, reject) => {
                ApiService.post("admin/login", credentials)
                    .then(({data}) => {
                        commit('SET_AUTH', data);
                        resolve();
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        LOGOUT({commit, state}) {
            if (state.isAuthenticated) {
                ApiService.post("admin/logout")
                commit('PURGE_AUTH');
                router.push({name: 'login'});
            }
        },
        VERIFY_AUTH({commit, state}) {
            return new Promise((resolve, reject) => {
                if (JwtService.getToken()) {
                    ApiService.setHeader();
                    ApiService.get("admin/profile")
                        .then(({data}) => {
                            commit('SET_AUTH_USERS', data.user);
                            resolve();
                        })
                        .catch(error => {
                            reject(error)
                        })
                        .finally(state.isLoad = true)
                } else {
                    resolve();
                }
            });
        },
        USER_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("user-list")
                    .then(({data}) => {
                        commit('SET_CUSTOMER_LIST', data.customer);
                        resolve();
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        CUSTOMER_BLOCK({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_CUSTOMER_BLOCK', data);
                ApiService.post("customer-block", data)
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
        SET_AUTH: (state, user) => {
            state.isAuthenticated = true;
            JwtService.saveToken(user.token);
        },
        PURGE_AUTH: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            JwtService.destroyToken();
        },
        SET_AUTH_USERS: (state, user) => {
            state.user = user;
        },
        SET_CUSTOMER_LIST: (state, user) => {
            state.customerList = user;
        },
        CUSTOMER_ADD: (state, data) => {
            state.customerList.unshift(data);
        },
        SET_CUSTOMER_BLOCK: (state, data) => {
            state.customerList.find(element => element.id === data.id).status = data.active;
        },
    }
};

export default auth
