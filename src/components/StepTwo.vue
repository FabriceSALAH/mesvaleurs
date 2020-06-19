<template>
  <div>
    <div id="container">
      <div id="left" @click="handleClick(index)">{{inputsData[index]}}</div>
      <div id="right" @click="handleClick(index+1)">{{inputsData[index+1]}}</div>
    </div>
  </div>
</template>

<script>
import { inputsData, actions } from '../helpers/constantes';

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
      nbCycle: 0,
      nbGame: 0,
    }
  },
  methods: {
    handleClick: function(index) {
      if (this.nbGame < 3 * this.inputsData.length / 2) {
        this.nbGame = this.nbGame + 1;
      } else {
        this.index = this.index + 2;
        this.$store.commit(actions.SET_STEPS, 3);
        this.valuesAndPoints.sort((a, b) => { return b.points - a.points });
        this.$store.commit(actions.SET_RESULTS, this.valuesAndPoints);
        return;
      }

      this.valuesAndPoints.forEach((element) => {
        if (element.name === this.inputsData[index]) {
          element.points = element.points + 1;
        }
      })

      if (this.index !== this.inputsData.length - 2) {
        this.index = this.index + 2;
      } else {
        this.index = 0;
      }

      if (this.nbCycle === 2) {
        this.nbCycle = 0;
        this.inputsData = shuffle(this.inputsData);
      }
      this.nbCycle++;
    }
  },
  created: function () {
    this.inputsData = shuffle(inputsData);
    this.valuesAndPoints = this.inputsData.map((element) => ({
      name: element,
      points: 0
    }))
  }
}
</script>

<style lang="sass" scoped>

#container
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

#left
  width: 50%
  height: 100%
  padding-top: 40%
  background-color: #bdd9f5
  text-align: center
  font-size: x-large

#right
  width: 50%
  height: 100%
  padding-top: 40%
  background-color: #aff7f0
  text-align: center
  font-size: x-large

</style>

