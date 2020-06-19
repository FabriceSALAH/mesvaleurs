<template>
  <div>

    <div id="container">
      <div id="next" @click="handleClick(-1)">VS</div>
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
      nbClick: 0,
      memInterval: null,
      countSeconds: 0
    }
  },
  methods: {
    recall: function () {
      this.memInterval = setInterval(() => {
        //
        this.countSeconds++;
        if (this.countSeconds > 5) {
          this.countSeconds = 1;
          this.handleClick(-1);
        }
        console.log('this.countSeconds: ', this.countSeconds);
      } , 1000);
    },
    handleClick: function(index) {
      this.nbClick++;
      // if (this.memInterval !== null ) clearInterval(this.memInterval);
      this.countSeconds = 0;

      this.valuesAndPoints.forEach((element) => {
        if (index === -1) {
          if (element.name === this.inputsData[this.index]) element.points = element.points + 1;
          if (element.name === this.inputsData[this.index + 1]) element.points = element.points + 1;
        } else if (element.name === this.inputsData[index]) {
          element.points = element.points + 1;
        }
      })
      console.log(this.nbClick,'/',3 * this.inputsData.length / 2);
      if (this.nbGame < 3 * this.inputsData.length / 2) {
        this.nbGame = this.nbGame + 1;
      } else {
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
    this.recall();
  }
}
</script>

<style lang="sass" scoped>

#container
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  #next
    position: absolute;
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: orange;
    border-radius: 50%;
    font-size: x-large;

  #left
    position: relative
    width: 50%
    padding: 50% 0%
    background-color: #bdd9f5
    text-align: center
    font-size: x-large

  #right
    position: relative
    width: 50%
    padding: 50% 0%
    background-color: #aff7f0
    text-align: center
    font-size: x-large

</style>

