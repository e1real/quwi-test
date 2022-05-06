import Cookies from 'js-cookie'

export const state = () => ({
    user: null,
    token: null,
})

export const getters = {
    token: state => state.token,
    isAuthenticated: state => !!state.token
}

export const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_TOKEN(state, token) {
        state.token = token
    }
}

export const actions = {
    async fetchUser({ commit }) {
        try {
            const { data } = await this.$axios.get('auth/init')
            commit('SET_USER', data.user)
        } catch (err) {
            Cookies.remove('token')
            commit('SET_USER', null)
            commit('SET_TOKEN', null)
        }
    },
}