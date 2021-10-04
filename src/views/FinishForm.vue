<template>
  <div class="page3">
    <ButtonStepBack></ButtonStepBack>
    <b-container class=" mb-5 v-container">
      <h1 class="v-text-purple">Cadastro realizado com Sucesso</h1>
      <b-row>
        <p class="v-title">
          Em breve entraremos em contato para formalizar tudo
        </p>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Button from "../components/Button.vue";
// import ButtonStepBack from "../components/ButtonStepBack.vue";

export default {
  name: "Home",
  data() {
    return {
      payment_type: null,
      selected: "null",
      error: true,
      informativeButton: {
        text: "CADASTRAR PROFISSIONAL",
        to: "/finalizar",
      },
      form: {
        state: null,
        city: null,
      },
      specialitiy: [
        { value: null, text: "Selecione", disabled: true },
        "Cardiologia",
        "Dermatologia",
        "Neurologia",
        "Oftalmologia",
        "Psiquiatria",
        "Urologia",
      ],
      options: [
        { value: "pix", text: "Pix" },
        { value: "money", text: "Em dinheiro" },
        { value: "credit_card", text: "Cartão de crédito" },
      ],

      parcels: ["1x sem juros", "2x sem juros", "3x sem juros"],
      number_of_parcels: "",
      validations: {
        name: {},
      },
    };
  },
  methods: {
    editUser() {
      this.$router.push("/");
    },
    nextStep() {
      this.$router.push("/finalizar");
    },
  },
  //   components: { Button, ButtonStepBack },
  computed: {
    ...mapState(["user"]), // assuming you are using namespaced modules
  },
  created() {
    // console.log(this.user);
  },
};
</script>
<style scoped>
.v-title {
  font-weight: 900;
  margin-top: 20px;
  margin-bottom: 0;
}
.user-data {
  font-weight: 300;
}
.bordered {
  /* border-bottom: 1px solid #ccc; */
  border-radius: 5px;
  padding: 20px 30px;
  text-align: left;
  box-shadow: 0 2px rgb(194, 191, 191);
}
.v-edit-user-btn {
  cursor: pointer;
  font-size: 1.1rem;
  width: 50%;

  display: inline;
}
.checkbox-style {
  margin-left: 25px;
}
.parcels {
  margin-left: 35px;
  padding: 10px;
}

#app .v-container {
  background-image: url("../assets/desktop-pagina-4.png");
  margin-top: 50px;
}

@media screen and (max-width: 767px) {
  .v-edit-user-btn {
    width: 100%;
  }
}
</style>
