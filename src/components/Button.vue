<template>
  <div id="btn">
    <b-button
      @click="$emit('nextStepEvent')"
      :class="
        informative.color == 'purple'
          ? 'v-btn v-bg-btn v-btn-color'
          : 'v-btn v-bg-btn v-btn-color-2'
      "
      >{{ informative.text }}</b-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    informative: { type: Object },
    next: { type: String },

    nextStepEvent: {
      type: Function,
      default: () => {},
    },
  },
  methods: {},
  computed: {
    ...mapState(["user"]),
  },
  created() {
    console.log(this.informative);
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: 50px;
  width: 50%;
  border-radius: 15px;
  border: none;
}
.v-btn-color {
  background-color: var(--purple-primary);
}
.v-btn-color-2 {
  background: var(--yellow-cta2);
  color: var(--secondary-7);
}
.v-btn-color:hover {
  background-color: var(--purple-hover);
}
.v-btn-color-2:hover {
  background-color: var(--yellow-cta1);
  color: var(--secondary-7);
}

@media screen and (max-width: 767px) {
  .v-btn {
    margin-top: 20px;
  }
  .v-btn {
    width: 100%;
  }
}
</style>
