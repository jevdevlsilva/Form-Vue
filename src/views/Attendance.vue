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
                  @keyup="maskAndVuelidatePrice(form.price)"
                  v-model="form.price"
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
              <small v-if="priceErrorMsg" class="text-danger"
                >Digite um valor entre 30 e 400*</small
              >
              <small v-if="error && form.price == undefined" class="text-danger"
                >Esse campo é obrigatorio*</small
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="8" lg="5">
            <!-- <b-form-group
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
            </b-form-group> -->

            <b-form-group
              label="Formas de pagamento de consulta*"
              label-class="mt-3"
            >
              <b-form-checkbox-group
                v-model="form.payment_type"
                :options="options"
                class="payment_options p-3"
              >
                <br
              /></b-form-checkbox-group>
              <small
                v-if="error && form.payment_type == undefined"
                class="text-danger mt-3"
                >Esse campo é obrigatorio*</small
              >

              <small
                v-if="error && form.payment_type.length == 0"
                class="text-danger mt-3"
                >Esse campo é obrigatorio*</small
              >
              <b-row v-for="option in parcels" :key="option" class="parcels">
                <b-form-checkbox
                  v-if="showParcels"
                  v-model="form.number_of_parcels"
                  :value="option"
                  :class="
                    !error
                      ? 'bordered'
                      : form.payment_type == undefined
                      ? 'bordered '
                      : 'bordered'
                  "
                >
                  <b-col class="checkbox-style">{{ option }}</b-col>
                </b-form-checkbox>
              </b-row>
              <small
                v-if="showParcels && !form.number_of_parcels"
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
      payment_type: [],
      // selected: [],
      informativeButton: {
        text: "PRÓXIMO",
        to: "/revisao",
        color: "purple",
      },
      priceErrorMsg: false,
      form: {
        specialitiy: null,
        payment_type: [],
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
      showParcels: false,
    };
  },
  methods: {
    formSteps(form) {
      if (!form.specialitiy | !form.price || form.payment_type.length == 0) {
        this.error = true;
      } else {
        if (this.form.payment_type.includes("Cartão de crédito")) {
          if (form.number_of_parcels) {
            this.$store.dispatch("setUser", form);
            this.$router.push(this.informativeButton.to);
            return;
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
    maskMoney(v) {
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

    maskAndVuelidatePrice(value) {
      let timeout = null;
      this.priceErrorMsg = true;

      if (value >= 30 && value <= 400) {
        this.priceErrorMsg = false;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.maskMoney(value);
        }, 1000);
      } else {
        console.log("errado");
      }
    },
    // vuelidatePriceBetween(value) {
    //   console.log(value);
    //   if (value >= 30 && value <= 400) {
    //     console.log("certo");
    //     this.form.price = this.maskMoney(value);
    //   } else {
    //     console.log("errado");
    //   }
    // },
  },
  watch: {
    "form.payment_type": function() {
      let payment_types = this.form.payment_type;

      if (payment_types.includes("Cartão de crédito")) {
        this.showParcels = true;
        console.log("SIM");
      } else {
        this.showParcels = false;
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
.payment_options {
  cursor: pointer;
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
