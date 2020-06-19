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
      values: []
    }
  },
  methods: {
    handleClick: function(index) {
      console.log('index: ', index);
      console.log('coucou');
        console.log('this.values.length: ', this.values.length);
      if (this.index === this.values.length-1) {
        console.log('cest la fin');
      }
      this.index = this.index + 2;
    }
  },
  created: function () {
    const values = ['liberté', 'sécurité', 'autonomie', 'succès', 'responsabilité', 'curieux'];
    const shuffleValues = shuffle(values);
    this.values = shuffleValues;
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

