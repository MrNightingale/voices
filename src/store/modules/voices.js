import axios from 'axios'

const state = {
  voices: [],
  favourites: [],
  selected: '',
  categories: []
}

const mutations = {
  SET_VOICES (state, data) {
    state.voices = data
  },

  HANDLE_FAVOURITE (state, favourite) {
    const findFav = state.voices.find(el => el.id === favourite)
    if (state.favourites.find(el => el.id === findFav.id)) {
      state.favourites = state.favourites.filter(el => el.id !== findFav.id)
    } else {
      state.favourites.push(findFav)
    }
  },

  SET_SELECTED (state, selected) {
    state.selected === selected ? state.selected = '' : state.selected = selected
  },

  SET_CATEGORIES (state, categories) {
    state.categories = categories
  }
}

const actions = {
  async setVoices ({ commit }) {
    const voices = (await axios.get('https://api.jsonbin.io/b/60b8a63c2d9ed65a6a7e9182')).data
    const categories = [...new Set(voices.map(el => el.tags).flat())]

    commit('SET_VOICES', voices)
    commit('SET_CATEGORIES', categories)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
