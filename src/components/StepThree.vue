<template>
  <div>
    <h3>Voici vos résultats</h3>
    <ul>
      <li v-for="item in results" :key="item.name">
        {{ item.points }}_ {{ item.name }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'StepThree',
  computed: {
    results() {
      return this.$store.state.results;
    }
  }
}
</script>
