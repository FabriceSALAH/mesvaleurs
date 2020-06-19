<template>
  <div>
    <StepOne v-if="step === 1" />
    <StepTwo v-if="step === 2" />
    <StepThree v-if="step === 3" />
  </div>
</template>

<script>
import StepOne from 'components/StepOne';
import StepTwo from 'components/StepTwo';
import StepThree from 'components/StepThree';

export default {
  name: 'PageIndex',
  components: {
    StepOne,
    StepTwo,
    StepThree
  },
  computed: {
    step() {
      return this.$store.state.step
    }
  }
}
</script>
