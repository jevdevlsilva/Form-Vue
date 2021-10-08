<template>
  <div id="btn">
    <b-container>
      <b-row class="backStep">
        <b-icon-arrow-left
          scale="2"
          class="stepBackIcon"
          @click="$emit('stepBack')"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    stepBack: {
      type: Function,
      default: () => {},
    },
  },
  methods: {},
};
</script>

<style scoped>
#btn {
  display: inline-block;
  width: 60%;
  /* border: 1px solid red; */
}
.backStep {
  margin-top: 50px;
  text-align: left;
  /* border: 1px solid red; */
  width: 40px;
}
.stepBackIcon {
  cursor: pointer;
  color: var(--purple-primary);
  font-weight: bolder;
}

@media screen and (max-width: 767px) {
  #btn {
    display: inline-block;
    width: 90%;
    /* border: 1px solid red; */
  }
  .backStep {
    margin-top: 30px;
  }
}
</style>
