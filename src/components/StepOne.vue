<template>
<div id="container">
  <h2>Prêt à identifier ses valeurs ?</h2>
  <q-btn @click="nextStep" color="primary" label="Let's go !" />
</div>
</template>

<script>
export default {
  name: 'StepOne',
  methods: {
    nextStep() {
      this.$store.commit('setStep', 2);
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  text-align: center
</style>
