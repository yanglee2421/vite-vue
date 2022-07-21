import { createStore, Store } from "vuex"
export const store = createStore({
    strict: true,
    state() {
        return {
            a: "123"
        }
    },
    modules: {
        mod1: {
            namespaced: true,
            state() {
                return {
                    a: "vuex中的值（默认）",
                }
            },
            mutations: {
                a(state, value: string) {
                    state.a = value
                },
            },
            getters: {
                c(state, getters, rootState, rootGetters) {
                    return 123
                }
            },
            actions: {
                b(content, value) {
                    console.log(content)
                    content.commit("a", value)
                },
                a: {
                    root: true,
                    handler({ commit }, value) {
                        commit("a", value)
                    }
                },
            },
            modules: {},
        }
    }
})