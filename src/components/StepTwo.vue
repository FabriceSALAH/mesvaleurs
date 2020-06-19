<template>
  <div>

    <div id="container">
      <div id="next">
        <q-circular-progress
          show-value
          :value="pourcentCounter"
          size="60px"
          :thickness="0.1"
          color="orange-12"
          center-color="grey-12"
          track-color="transparent"
          class="q-ma-md"
        >
        <div id="chooseValueToContinue" v-if="nbClick === 0">Choisir une valeur pour continuer</div>
        <div v-else>VS</div>
        </q-circular-progress>
      </div>
      <div id="left" @click="handleClick(index)">{{inputsData[index]}}</div>
      <div id="right" @click="handleClick(index+1)">{{inputsData[index+1]}}</div>
    </div>
  </div>
</template>

<script>
import { actions } from '../helpers/constantes';

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}
export default {
  name: 'StepTwo',
  data: function () {
    return {
      index: 0,
      inputsData: [],
      valuesAndPoints: [],
      nbGame: 0,
      nbClick: 0,
      memInterval: null,
      countSeconds: 0,
      timeOutInSecond: 5,
    }
  },
  computed:{
    pourcentCounter() {
      return this.countSeconds * 100 / (this.timeOutInSecond);
    }
  },
  methods: {
    recall: function () {
      this.memInterval = setInterval(() => {
        this.countSeconds++;
        if (this.countSeconds > this.timeOutInSecond) {
          this.countSeconds = 1;
          this.handleClick(-1);
        }
      } , 1000);
    },
    handleClick: function(index) {
      this.nbClick++;
      this.countSeconds = 0;
      const gameCycleNb = 1;
      const totalGamesNb = gameCycleNb * (this.inputsData.length / 2);
      const progress = (this.nbClick / totalGamesNb);
      this.$store.commit(actions.SET_PROGRESS, progress);

      this.valuesAndPoints.forEach((element, indexElement) => {
        if (index === -1) {
          // if (element.name === this.inputsData[this.index]) element.points = element.points + 1;
          // if (element.name === this.inputsData[this.index + 1]) element.points = element.points + 1;
        } else if (element.name === this.inputsData[index]) {
          // element.points = element.points + 1;
          this.$store.commit(actions.ADD_POINT, indexElement);
        }
      })
      if (this.nbGame < totalGamesNb - 1) {
        this.nbGame = this.nbGame + 1;
      } else {
        if (this.memInterval !== null ) clearInterval(this.memInterval);
        this.$store.commit(actions.SET_STEPS, 3);
        this.valuesAndPoints.sort((a, b) => { return b.points - a.points });
        this.$store.commit(actions.SET_RESULTS, this.valuesAndPoints);

        return;
      }

      if (this.index !== this.inputsData.length - 2) {
        this.index = this.index + 2;
      } else {
        this.index = 0;
      }

      if (this.memInterval === null ) this.recall();

    }
  },
  created: function () {
    // this.inputsData = shuffle(inputsData);
    this.valuesAndPoints = [...this.$store.state.results];
    this.valuesAndPoints.forEach((element) => {
      this.inputsData = [...this.inputsData, element.name];
    })
  }
}
</script>

<style lang="sass" scoped>

#chooseValueToContinue
  background-color: orange
  padding: 10px
  border-radius: 10%

#container
  overflow: hidden
  position: absolute
  width: 100%
  height: calc(100% - 50px)
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer

  #next
    position: absolute
    display: flex
    z-index: 1
    align-items: center
    justify-content: center
    font-size: x-large

  #left
    position: relative
    width: 50%
    height: 100%
    padding: 50% 10%
    background-color: #bdd9f5
    text-align: center
    font-size: x-large

  #right
    position: relative
    width: 50%
    height: 100%
    padding: 50% 10%
    background-color: #aff7f0
    text-align: center
    font-size: x-large

</style>

