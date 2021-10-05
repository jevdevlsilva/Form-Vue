<template>
  <div class="page3">
    <ButtonStepBack @stepBack="stepBack()"></ButtonStepBack>
    <b-container class=" mb-5 v-container">
      <h1 class="v-text-purple">Revisão de cadastro</h1>
      <b-row>
        <p class="v-title">Nome Completo</p>
        <p class="user-data">{{ user.name }}</p>
      </b-row>
      <b-row>
        <p class="v-title">CPF</p>
        <p class="user-data">{{ user.cpf }}</p>
      </b-row>
      <b-row>
        <p class="v-title">Número de celular ou telefone</p>
        <p class="user-data">{{ user.phone_number }}</p>
      </b-row>
      <b-row>
        <p class="v-title">Estado/Cidade</p>
        <p class="user-data">{{ user.state }} / {{ user.city }}</p>
      </b-row>
      <b-row>
        <p class="v-title">Especialidade principal</p>
        <p class="user-data">{{ user.specialitiy }}</p>
      </b-row>
      <b-row>
        <p class="v-title">Preço da consulta</p>
        <p class="user-data">{{ user.price }}</p>
      </b-row>
      <!-- 
      <b-row >
        <p class="v-title">Formas de pagamento da consulta</p>
        <p class="user-data">
          {{ user.payment_type }}
        </p>
      </b-row> -->

      <b-row>
        <p class="v-title">Formas de pagamento da consulta</p>
        <b-row v-for="payment_type in user.payment_type" :key="payment_type">
          <p class="user-data mt-1">
            {{ payment_type }}
            <span v-if="payment_type == 'Cartão de crédito'">
              / {{ user.number_of_parcels }}</span
            >
          </p>
        </b-row>
      </b-row>

      <b-row>
        <b-col>
          <Button
            :informative="informativeButton"
            @nextStepEvent="nextStep()"
            class="mb-3"
          ></Button>
        </b-col>
      </b-row>
      <b-row>
        <h5 class="mt-3 text-center v-edit-user-btn" @click="editUser">
          Editar Cadastro
        </h5>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "../components/Button.vue";
import ButtonStepBack from "../components/ButtonStepBack.vue";

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
    };
  },
  methods: {
    editUser() {
      this.$router.push("/");
    },
    nextStep() {
      this.$router.push("/finalizar");
    },
    stepBack() {
      this.$router.push("/atendimento");
    },
  },
  components: { Button, ButtonStepBack },
  computed: {
    ...mapState(["user"]), // assuming you are using namespaced modules
  },
  created() {
    console.log(this.user);
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
  background-image: url("../assets/desktop-pagina-3.png");
  margin-top: 50px;
}

@media screen and (max-width: 767px) {
  .v-edit-user-btn {
    width: 100%;
  }
}
</style>
