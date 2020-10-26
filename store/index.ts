import { GetterTree, ActionTree, MutationTree, Store } from 'vuex'
import Nuxt from '@nuxt/types'
import { AppTheme } from '~/assets/ts/app-theme'

export const state = () => ({
  theme: null,
})

export interface RootState {
  theme?: AppTheme
}

export const getters: GetterTree<RootState, RootState> = {
  getCurrentTheme: (state) => state.theme,
}

export const mutations: MutationTree<RootState> = {
  setTheme(this: Store<RootState>, rootState, theme: AppTheme) {
    if (theme) {
      this.$cookies.set('theme', theme)
    } else {
      this.$cookies.remove('theme')
    }
    rootState.theme = theme
  },
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit(root, ctx: Nuxt.Context) {
    const theme = this.$cookies.get('theme') || null
    root.commit('setTheme', theme)
  },
  // nuxtClientInit(root, ctx: Nuxt.Context) {
  //   const theme = this.$cookies.get('theme') || null
  //   root.commit('setTheme', theme)
  // },
}
