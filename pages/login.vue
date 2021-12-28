<template>
  <v-container class="pa-0 ma-0" fill-height fluid>
    <v-row class="pa-0 ma-0">
      <v-col class="my-10" cols="5">
        <div class="d-flex align-content-center justify-center">
          <h1 class="primary--text"><strong>Sign in to bigyapan<span class="secondary--text">.com</span></strong></h1>
        </div>
        <v-form ref="loginForm" class="mx-4 mt-4 px-16">
          <v-text-field v-model="email" :error-messages="usernameErrors" autocomplete="on" autofocus
                        filled
                        label="Email or Phone No.*"
                        placeholder="Enter your email or phone number here..."
                        prepend-inner-icon="fas fa-user"
                        rounded
                        v-on:keyup.enter="login"
          ></v-text-field>
          <v-text-field v-model="password" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        :error-messages="passwordErrors"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="on"
                        filled
                        label="Password*"
                        placeholder="Enter your password here..."
                        prepend-inner-icon="fas fa-key"
                        rounded
                        @click:append="showPassword = !showPassword"
                        v-on:keyup.enter="login"
          ></v-text-field>
          <v-divider class="mb-4"></v-divider>
          <v-checkbox color="secondary"  class="pa-0 ma-0 caption" label="Remember Me"></v-checkbox>
          <div class="d-flex justify-center">
            <v-btn color="primary" depressed rounded x-large
                   @click="login">
              <span>Sign In</span>
            </v-btn>
          </div>
          <div class="mt-2 d-flex justify-center">
            <span class="caption">Forgot Password?</span>
          </div>
        </v-form>
        <div class="d-flex justify-center align-content-center">
          <span class="body-2">OR</span>
        </div>
        <div class="my-6 d-flex justify-center align-content-center">
          <v-btn class="mx-1" color="#3B5998" dark depressed fab small>
            <v-icon>fab fa-facebook-f</v-icon>
          </v-btn>
          <v-btn class="mx-1" color="#D63C28" dark depressed fab small>
            <v-icon>fab fa-google</v-icon>
          </v-btn>
          <v-btn class="mx-1" color="#00acee" dark depressed fab small>
            <v-icon>fab fa-twitter</v-icon>
          </v-btn>
          <v-btn class="mx-1" color="#0077b5" dark depressed fab small>
            <v-icon>fab fa-linkedin</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col class="pa-0 ma-0 background" cols="7">
        <v-container fill-height fluid>
          <v-row class="white--text" >
            <v-col  align="center" cols="12">
              <h1 >Hello, Namaste !</h1>
            </v-col>
            <v-col   align="center"  cols="12">
              <span class="body-2">Create your account at bigyapan and start selling right away. </span>
            </v-col>
            <v-col align="center" cols="12">
              <v-btn dark outlined depressed rounded x-large
                     to="/register">
                <span>Sign Up</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "login.vue",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    }
  },
  validations: {
    email: {required},
    password: {required}
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('');
      return errors;
    }
  },
  methods: {
    login() {
      this.$v.email.$touch();
      this.$v.password.$touch();
      const temp = this;
      this.$store.dispatch('auth/loginOrRegister', {
        route: "login",
        data: {
          email: temp.email,
          password: temp.password,
        }
      }).then(function (response) {
        temp.$store.commit('auth/SET_USER', response.data.data);
        temp.$router.push("/");
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-color: $bigyapan-primary-base !important;
}
</style>
