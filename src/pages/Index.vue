<template>
  <div>
    <div id="container">
      <div id="left" @click="handleClick(index)">{{values[index]}}</div>
      <div id="right" @click="handleClick(index+1)">{{values[index+1]}}</div>
    </div>
  </div>
</template>

<script>
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}
export default {
  name: 'PageIndex',
  data: function () {
    return {
      index: 0,
      values: [],
      valuesAndPoints: [],
      nbCycle: 0,
      nbGame: 0
    }
  },
  methods: {
    handleClick: function(index) {



      if (this.nbGame < 3 * this.values.length / 2) {
        this.nbGame = this.nbGame + 1;
      } else {
        this.index = this.index + 2;
        console.log('cest la fin');
        this.valuesAndPoints.forEach((element) => {
          console.log(element.value,'_',element.point);
        })
        return;
      }

      this.valuesAndPoints.forEach((element) => {
        if (element.value === this.values[index]) {
          element.point = element.point + 1;
        }
      })

      if (this.index !== this.values.length - 2) {
        this.index = this.index + 2;
      } else {
        this.index = 0;
      }

      if (this.nbCycle === 2) {
        this.nbCycle = 0;
        this.values = shuffle(this.values);
      }
      this.nbCycle++;
    }
  },
  created: function () {
    const values = ['liberté', 'sécurité', 'autonomie', 'succès', 'responsabilité', 'curieux'];
    const shuffleValues = shuffle(values);
    this.values = shuffleValues;
    this.valuesAndPoints = shuffleValues.map((element) => ({
      value: element,
      point: 0
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

