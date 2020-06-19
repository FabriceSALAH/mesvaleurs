<template>
  <div id="container">
    <h3>Voici vos résultats</h3>
    <q-btn @click="continuee" color="green-5" label="Continuer pour affiner vos résultats" />
    <ul id="list">
      <li v-for="item in results" :key="item.name">
        {{ item.points }}_ {{ item.name }}
      </li>
    </ul>
    <q-btn @click="continuee" color="green-5" label="Continuer pour affiner vos résultats" />
  </div>
</template>

<script>
import { actions } from '../helpers/constantes';
export default {
  name: 'StepThree',
  computed: {
    results() {
      return this.$store.state.results;
    }
  },
  methods: {
    continuee() {
      this.$store.commit(actions.SET_STEPS, 2);
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  text-align: center

#list
  text-align: left
</style>
