<template>
  <div class="home">
    <b-container class=" mb-5 v-container">
      <h1 class="v-text-purple">Sobre o Profissional</h1>

      <h4 class="my-4 v-bold">Dados do profissional</h4>

      <b-form class="w-100">
        <b-row>
          <b-col sm="12" md="8" lg="6">
            <b-form-group label="Nome Completo*" label-class="">
              <b-form-input
                placeholder="Digite o nome completo"
                class="mt-3"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.name == undefined
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
                size="sm"
                v-model="form.name"
                trim
              ></b-form-input>
              <small v-if="error && form.name == null" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
              <small v-else-if="error && name_error" class="text-danger"
                >Digite um nome válido*</small
              >
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="12" md="8" lg="5">
            <b-form-group label="CPF*" label-class="mt-3">
              <b-form-input
                placeholder="Digite um CPF"
                v-mask="'###.###.###-##'"
                class="mt-3"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.cpf == ''
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
                size="sm"
                v-model="form.cpf"
                trim
              ></b-form-input>
              <small v-if="error && form.cpf == null" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
              <small
                v-else-if="cpf_error || (error && this.form.cpf.length < 14)"
                class="text-danger"
                >Digite um cpf válido*</small
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="8" lg="5">
            <b-form-group label="Número de celular*" label-class="mt-3">
              <b-form-input
                v-mask="'(##) # ####-####'"
                placeholder="(00) 0 0000-0000"
                class="mt-3"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.phone_number == undefined
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
                size="sm"
                v-model="form.phone_number"
                trim
              ></b-form-input>
              <small
                v-if="error && form.phone_number == null"
                class="text-danger"
                >Esse campo é obrigatorio*</small
              >
              <small v-else-if="error && phone_number_error" class="text-danger"
                >Digite um número válido*</small
              >
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mb-5">
          <b-col sm="12" md="4" lg="3">
            <b-form-group label="Estado" label-class="mt-3">
              <b-form-select
                placeholder="(00) 0 0000-0000"
                v-model="form.state"
                :options="states"
                class="w-100 rounded"
                @change="form.city = null"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.state == null
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
              ></b-form-select>
              <small v-if="error && form.state == null" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>

          <b-col sm="12" md="4" lg="3">
            <b-form-group label="Cidade" label-class="mt-3">
              <b-form-select
                v-model="form.city"
                :options="
                  form.state == null
                    ? (cities = cities_null)
                    : form.state === 'Paraná'
                    ? cities_pr
                    : form.state === 'Rio Grande do Sul'
                    ? cities_rg
                    : cities_sc
                "
                class="w-100 rounded"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.city == undefined
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
              ></b-form-select>
              <small v-if="error && form.city == null" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>
        </b-row>
        <MyProgressBar :step="'1'"></MyProgressBar>
        <b-row>
          <b-col>
            <Button
              :informative="informativeButton"
              @nextStepEvent="formSteps(form)"
            ></Button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import MyProgressBar from "../components/MyProgressBar.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      error: false,
      value: 50,
      max: 100,
      informativeButton: {
        text: "PRÓXIMO",
        to: "/atendimento",
        color: "purple",
      },
      form: {
        state: null,
        city: null,
        name: null,
        phone_number: null,
        cpf: "",
      },
      states: [
        { value: null, text: "Selecione", disabled: true },
        "Paraná",
        "Rio Grande do Sul",
        "Santa Catarina",
      ],
      cities_pr: [
        { value: null, text: "Selecione", disabled: true },
        "Londrina",
        "Maringá",
      ],
      cities_rg: [
        { value: null, text: "Selecione", disabled: true },
        "Pelotas",
        "Porto Alegre",
      ],

      cities_sc: [
        { value: null, text: "Selecione", disabled: true },
        "Florianópolis",
        "Joinville",
      ],
      cities_null: [{ value: null, text: "Selecione", disabled: true }],
      phone_number_error: false,
      name_error: false,
      cpf_error: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    "form.phone_number": function() {
      this.phone_number_error = false;
      if (this.form.phone_number.length < 16) {
        this.phone_number_error = true;
      }
    },
    "form.name": function() {
      this.name_error = false;
      if (this.form.name.length < 3 || this.form.name.length > 48) {
        this.name_error = true;
      }
    },
    "form.cpf": function() {
      this.cpf_error = false;
      if (this.form.cpf.length < 14) {
        this.cpf_error = true;
      }
    },
  },
  created() {
    if (this.user.name !== undefined) {
      this.form = { ...this.user };
    }
  },
  methods: {
    formSteps(form) {
      if (
        !form.name ||
        !form.phone_number ||
        !form.cpf ||
        !form.state ||
        !form.city
      ) {
        this.error = true;
      } else if (
        !this.phone_number_error &&
        !this.name_error &&
        !this.cpf_error
      ) {
        this.error = false;
        this.$store.dispatch("setUser", form);
        this.$router.push(this.informativeButton.to);
      }
    },
  },

  components: { Button, MyProgressBar },
};
</script>
<style scoped>
#app .v-container {
  background-image: url("../assets/desktop-pagina-1.png");
}
</style>
