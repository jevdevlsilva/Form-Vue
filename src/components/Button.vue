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
    step: { type: Object },
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
  background: #483698;
}
.v-btn-color-2 {
  background: #fbde40;
  color: #282828;
}
.v-btn-color:hover {
  background-color: rgb(54, 43, 112);
}
.v-btn-color-2:hover {
  background: #ffe766;
  color: #282828;
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
