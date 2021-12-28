<template>
  <v-container class="pa-0 ma-0" fill-height fluid>
    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0 background" cols="5">
        <v-container fill-height fluid>
          <v-row class="white--text">
            <v-col align="center" cols="12">
              <h1>Welcome to bigyapan.com !</h1>
              <span class="body-2">Create your account at bigyapan and start selling right away. Sign in to your account if you are already a member. </span>
            </v-col>
            <v-col align="center" cols="12">
              <v-btn dark depressed outlined rounded to="/login"
                     x-large>
                <span>Sign In</span>
              </v-btn>

            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="my-10" cols="7">
        <div class="d-flex align-content-center align-center justify-center">
          <h1 class="primary--text"><strong>Create account at bigyapan<span class="secondary--text">.com</span></strong>
          </h1>
        </div>
        <v-form ref="loginForm" class="mx-4 mt-4 px-16">
          <v-text-field v-if="registerWithEmail" v-model="register.email" :error-messages="registerEmailErrors"
                        autocomplete="on" autofocus
                        filled
                        label="E-mail.*"
                        placeholder="Enter your email here..."
                        prepend-inner-icon="fas fa-envelope"
                        rounded
                        v-on:keyup.enter="signup"
          ></v-text-field>
          <v-text-field v-else v-model="register.phoneNo" :error-messages="phoneNoErrors" autocomplete="on"
                        autofocus
                        filled
                        label="Phone No.*"
                        placeholder="Enter your phone number here..."
                        prepend-inner-icon="fas fa-mobile"
                        rounded
                        v-on:keyup.enter="signup"
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="register.name" :error-messages="registerNameErrors" autocomplete="on" autofocus
                            filled
                            label="Full Name*"
                            placeholder="Enter your full name here..."
                            prepend-inner-icon="fas fa-signature"
                            rounded
                            v-on:keyup.enter="signup"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="dobMenu"
                v-model="dobMenu"
                :close-on-content-click="false"
                :return-value.sync="register.dob"
                min-width="auto"
                offset-overflow
                offset-y
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="register.dob"
                    filled
                    label="Date of birth*"
                    prepend-inner-icon="fas fa-calendar"
                    readonly
                    rounded
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="register.dob"
                  scrollable
                  @input="dobMenu = false,$refs.dobMenu.save(register.dob)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="register.password"
                            :append-icon="register.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            :error-messages="registerPasswordErrors"
                            :type="register.showPassword ? 'text' : 'password'"
                            autocomplete="on"
                            filled
                            label="Password*"
                            placeholder="Enter your password here..."
                            prepend-inner-icon="fas fa-key"
                            rounded
                            @click:append="register.showPassword = !register.showPassword"
                            v-on:keyup.enter="signup"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="register.password_confirmation"
                            :append-icon="register.showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            :error-messages="registerConfirmPasswordErrors"
                            :type="register.showConfirmPassword ? 'text' : 'password'"
                            autocomplete="on"
                            filled
                            label="Confirm Password*"
                            placeholder="Enter your confirm password here..."
                            prepend-inner-icon="fas fa-key"
                            rounded
                            @click:append="register.showConfirmPassword = !register.showConfirmPassword"
                            v-on:keyup.enter="signup"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <h1 class="caption my-2">By signing up, I agree to Bigyapan's Terms of Use and Privacy Policy.</h1>
          <div class="d-flex justify-center align-center">
            <v-btn color="primary" depressed rounded x-large
                   @click="signup">
              <span>Sign Up</span>
            </v-btn>

          </div>
          <div class="my-2 d-flex justify-center align-center">
            <v-divider></v-divider>
            <span class="body-2 mx-2 caption">OR</span>
            <v-divider></v-divider>
          </div>
        </v-form>
        <div class="my-2 d-flex justify-center align-content-center">
          <v-btn color="secondary" dark depressed fab
                 small @click="registerWithEmail=!registerWithEmail">
            <v-icon>{{ registerWithEmail ? 'fas fa-mobile' : 'fas fa-envelope' }}</v-icon>
          </v-btn>
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
    </v-row>
  </v-container>
</template>

<script>
import {required, sameAs} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";

export default {
  mixins: [validationMixin],
  name: "register",
  data() {
    return {
      register: {
        phoneNo: "",
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        dob: "",
        showPassword: false,
        showConfirmPassword: false,
      },
      dobMenu: false,
      registerWithEmail: false,
    }
  },
  validations: {
    register: {
      phoneNo: {required},
      email: {required},
      password: {required},
      password_confirmation: {required, sameAsPassword: sameAs('register.password')},
      name: {required},
    },
  },
  computed: {
    registerEmailErrors() {
      const errors = [];
      if (!this.$v.register.email.$dirty) return errors;
      !this.$v.register.email.required && errors.push('');
      return errors;
    },
    registerNameErrors() {
      const errors = [];
      if (!this.$v.register.name.$dirty) return errors;
      !this.$v.register.email.required && errors.push('');
      return errors;
    },
    phoneNoErrors() {
      const errors = [];
      if (!this.$v.register.phoneNo.$dirty) return errors;
      !this.$v.register.phoneNo.required && errors.push('');
      return errors;
    }, registerPasswordErrors() {
      const errors = [];
      if (!this.$v.register.password.$dirty) return errors;
      !this.$v.register.password.required && errors.push('');
      return errors;
    },
    registerConfirmPasswordErrors() {
      const errors = [];
      if (!this.$v.register.password_confirmation.$dirty) return errors;
      !this.$v.register.password_confirmation.required && errors.push('');
      !this.$v.register.password_confirmation.sameAs && errors.push('');
      return errors;
    },
  },
  methods: {
    signup() {
      if (this.registerWithEmail) {
        this.$v.register.email.$touch();
      } else {
        this.$v.register.phoneNo.$touch();
      }
      this.$v.register.password.$touch();
      this.$v.register.name.$touch();
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  background-color: $bigyapan-primary-base !important;
}
</style>
