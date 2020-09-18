export const state = () => {
  return {
    user: {},
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {},
}
