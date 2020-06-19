import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import { actions, inputsData } from '../helpers/constantes';


export default function (/* { ssrContext } */) {
  const results = inputsData.map((element) => ({
    name: element,
    points: 0
  }));
  const Store = new Vuex.Store({
    state: {
      step: 1,
      results,
      progress: 0.0
    },
    mutations: {
      [actions.SET_STEPS] (state, index) {
        state.step = index;
      },
      [actions.SET_RESULTS] (state, results) {
        state.results = results;
      },
      [actions.SET_PROGRESS] (state, progress) {
        state.progress = progress;
      },
      [actions.ADD_POINT] (state, index) {
        state.results[index].points = state.results[index].points + 1;
      }
    },
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
