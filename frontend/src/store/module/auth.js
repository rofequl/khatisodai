import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import router from "../../router";

const auth = {
    state: {
        user: {},
        isLoad: false,
        isAuthenticated: !!JwtService.getToken()
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        currentUser: state => state.user,
        isLoadProfile: state => state.isLoad,
    },
    actions: {
        REGISTER({commit}, credentials) {
            return new Promise((resolve, reject) => {
                ApiService.post("user/register", credentials)
                    .then(({data}) => {
                        commit('SET_AUTH', data);
                        resolve();
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        LOGIN({commit}, credentials) {
            return new Promise((resolve, reject) => {
                ApiService.post("user/login", credentials)
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
                ApiService.post("user/logout")
                commit('PURGE_AUTH');
                router.push({name: 'home'});
            }
        },
        VERIFY_AUTH({commit, state}) {
            return new Promise((resolve, reject) => {
                if (JwtService.getToken()) {
                    ApiService.setHeader();
                    ApiService.get("user/profile")
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
        }
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
        }
    }
};

export default auth
