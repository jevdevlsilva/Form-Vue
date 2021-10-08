<template>
  <div id="progress-bar">
    <b-row class="mt-3 px-3 row-progress-bar">
      <b-col cols="3" md="3" lg="2" class="progressBar "></b-col>
      <b-col
        v-if="step == 2"
        cols="3"
        md="3"
        lg="2"
        class="progressBar "
      ></b-col>
      <b-col>
        <span cols="6" md="3" lg="2" class="text-progress">1 de 2</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    step: { type: String },
  },
};
</script>

<style></style>
