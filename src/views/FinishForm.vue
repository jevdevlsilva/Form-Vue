<template>
  <div class="page3">
    <b-container class=" mb-5 v-container">
      <h1 class="v-text-purple mb-5">Cadastro realizado com Sucesso</h1>
      <b-row>
        <h4 class="my-3">{{ user.name }}</h4>
        <!-- <h6 class="p-3">Obrigado pelo seu contato</h6> -->
        <p class="v-title p-3">
          Em breve entraremos em contato para formalizar tudo.
        </p>
        <h4 class="v-text-purple my-5">Acompanhe nossas redes sociais</h4>
      </b-row>
      <b-icon-instagram
        class="iconSocialMedia p-5"
        scale="2"
      ></b-icon-instagram>
      <b-icon-facebook class="iconSocialMedia p-5" scale="2"></b-icon-facebook>
      <b-icon-linkedin class="iconSocialMedia p-5" scale="2"></b-icon-linkedin>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
      form: {},
    };
  },
  methods: {},
  computed: {
    ...mapState(["user"]), // assuming you are using namespaced modules
  },
  created() {
    console.log(this.user);
    this.form = this.user;
  },
};
</script>
<style scoped>
.v-title {
  font-weight: 900;
  margin-top: 40px;
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
.iconSocialMedia {
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .v-edit-user-btn {
    width: 100%;
  }
}
</style>
