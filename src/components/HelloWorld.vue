<template>
  <v-container class="fill-height pa-8">
    <v-responsive class="align-center text-center fill-height">
      <div class="py-15" />
      <v-img height="150" src="@/assets/logo.png" />

      <h1 class="text-h4 font-weight-bold">AWARD</h1>
      <br />
      <h2 class="text-subtitle-1">
        Enter your Email address <br />
        to sign in and continue
      </h2>

      <div class="py-5" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="12">
          <form>
            <v-text-field
              label="Email Address"
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              required
              variant="outlined"
            ></v-text-field>
          </form>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="blue-grey-darken-4"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
            @click="login"
          >
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "@/lib/axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "vue-router";

const router = useRouter();
const initialState = {
  email: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

function login() {
  v$.value.$validate();
  if (!v$.value.$invalid) {
    axios
      .post("auth/login", state)
      .then(({ data }) => {
        localStorage.setItem("token", data.data.token);

        notify(data.message);
        window.location = "/award";
      })
      .catch((err) => {
        notify(err.response.data.message, "error");
      });
  }
}

function notify(msg, type = "success") {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: type,
    title: msg,
  });
}
</script>
