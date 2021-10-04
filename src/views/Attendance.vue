<template>
  <div class="page2">
    <ButtonStepBack @stepBack="StepBack()"></ButtonStepBack>
    <b-container class=" mb-5 v-container">
      <h1 class="v-text-purple">Sobre o atendimento</h1>

      <h4 class="my-4 v-bold">Detalhe do atendimento</h4>

      <b-form class="w-100" @submit.prevent="">
        <b-row>
          <b-col sm="12" md="8" lg="6">
            <b-form-group label="Especialidade principal*" label-class="">
              <b-form-select
                placeholder="Selecione a especialidade"
                v-model="form.specialitiy"
                :options="specialitiy"
                class="w-100 rounded"
                :class="
                  !error
                    ? 'v-form-control'
                    : form.specialitiy == undefined
                    ? 'v-form-control-error'
                    : 'v-form-control'
                "
              ></b-form-select>
              <small
                v-if="error && form.specialitiy == undefined"
                class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="">
          <b-col sm="12" md="8" lg="5">
            <b-form-group
              label="Informe o preço da consulta*"
              label-class="mt-3"
            >
              <b-input-group class="">
                <b-input-group-prepend is-text class="mt-3">
                  <b-icon-credit-card />
                </b-input-group-prepend>

                <b-form-input
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Valor"
                  size="sm"
                  v-model="form.price"
                  @blur="moeda(form.price)"
                  trim
                  class="mt-3"
                  :class="
                    !error
                      ? 'v-form-control'
                      : form.price == undefined
                      ? 'v-form-control-error'
                      : 'v-form-control'
                  "
                >
                </b-form-input>
              </b-input-group>
              <small v-if="error && form.price == undefined" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="8" lg="5">
            <b-form-group
              label="Formas de pagamento de consulta*"
              label-class="mt-3"
            >
              <b-row v-for="option in options" :key="option">
                <b-form-checkbox
                  v-model="form.payment_type"
                  :value="option"
                  class="bordered mb-3"
                  :class="
                    !error
                      ? 'bordered'
                      : form.payment_type == undefined
                      ? 'bordered '
                      : 'bordered'
                  "
                >
                  <span class="checkbox-style">{{ option }}</span>
                </b-form-checkbox>
              </b-row>
              <small
                v-if="error && form.payment_type == undefined"
                class="text-danger mt-3"
                >Esse campo é obrigatorio*</small
              >
              <b-row v-for="option in parcels" :key="option" class="parcels">
                <b-form-checkbox
                  v-if="form.payment_type == 'Cartão de crédito'"
                  v-model="form.number_of_parcels"
                  :value="option"
                >
                  <span class="checkbox-style">{{ option }}</span>
                </b-form-checkbox>
              </b-row>
              <small
                v-if="
                  form.payment_type == 'Cartão de crédito' &&
                    !form.number_of_parcels
                "
                class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>
        </b-row>

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
import { mapState } from "vuex";
import Button from "../components/Button.vue";
import ButtonStepBack from "../components/ButtonStepBack.vue";

export default {
  name: "Home",
  data() {
    return {
      error: false,
      payment_type: null,
      selected: null,
      informativeButton: {
        text: "PRÓXIMO",
        to: "/revisao",
        color: "purple",
      },
      form: {
        specialitiy: null,
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
      options: ["Pix", "Dinheiro", "Cartão de crédito"],
      parcels: ["1x sem juros", "2x sem juros", "3x sem juros"],
    };
  },
  methods: {
    formSteps(form) {
      if (!form.specialitiy | !form.price | !form.payment_type) {
        this.error = true;
      } else {
        if (this.form.payment_type == "Cartão de crédito") {
          if (form.number_of_parcels) {
            this.$store.dispatch("setUser", form);
            this.$router.push(this.informativeButton.to);
          }
        } else {
          this.$store.dispatch("setUser", form);
          this.$router.push(this.informativeButton.to);
        }
      }
    },
    StepBack() {
      this.$router.push("/");
    },
    moeda(v) {
      // v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      // this.form.price = v;
      // return v;
      if ((v != "") | (v != undefined)) {
        if (!isNaN(v)) {
          let newNumber = new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(parseInt(v));
          this.form.price = newNumber;
        } else {
          this.form.price = 0;
        }
      }
    },
  },
  components: { Button, ButtonStepBack },
  computed: {
    ...mapState(["user"]),
  },

  created() {
    if (this.user.specialitiy !== undefined) {
      this.form = { ...this.user };
    }
  },
};
</script>
<style scoped>
.bordered {
  border-radius: 5px;
  padding: 20px 30px;
  text-align: left;
  box-shadow: 0 2px rgb(194, 191, 191);
}
.checkbox-style {
  margin-left: 25px;
}
.parcels {
  margin-left: 35px;
  padding: 10px;
}

#app .v-container {
  background-image: url("../assets/desktop-pagina-2.png");
  margin-top: 50px;
}
.page2 {
  flex-direction: column;
}

.input-group-text {
  width: 100%;
  padding-top: 10px;
  border: 2px solid #483698;
  background: #483698 !important;
  color: #fff;
  border-radius: 5px 0 0 5px;
}
</style>
