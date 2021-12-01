<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col class="py-8 px-16" cols="7">
        <h1 class="display-1"><strong>Create a new account !</strong></h1>
        <h1 class="body-2">Create an account right now with us and start selling anything you want right away.</h1>
        <v-form ref="registerForm" class="mt-4">
          <v-row>
            <v-col v-if="registerWithEmail" cols="6">
              <v-text-field v-model="register.email" :error-messages="registerEmailErrors" autocomplete="on" autofocus
                            filled
                            label="E-mail.*"
                            placeholder="Enter your email here..."
                            prepend-inner-icon="fas fa-envelope"
                            rounded
                            v-on:keyup.enter="signup"
              ></v-text-field>
            </v-col>
            <v-col v-else cols="6">
              <v-text-field v-model="register.phoneNo" :error-messages="phoneNoErrors" autocomplete="on" autofocus
                            filled
                            label="Phone No.*"
                            placeholder="Enter your phone number here..."
                            prepend-inner-icon="fas fa-mobile"
                            rounded
                            v-on:keyup.enter="signup"
              ></v-text-field>
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

          </v-row>
        </v-form>
        <v-col>
          <h1 class="body-2">By signing up, I agree to Bigyapan's Terms of Use and Privacy Policy.</h1>
        </v-col>
        <v-divider></v-divider>


        <v-row align="center" class="pt-4" justify="center">
          <v-col cols="6">
            <v-btn block class="no-uppercase mt-4" color="secondary" depressed rounded x-large
                   @click="signup">
              <img alt="bigyapan_logo_only_white" height="25px" src="/images/logo_only_bigyapan_white.svg"
                   width="30px">
              <span>Sign up</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block class="no-uppercase mt-4" color="secondary" dark depressed
                   outlined rounded x-large @click="registerWithEmail=!registerWithEmail">
              <v-icon left>{{ registerWithEmail ? 'fas fa-mobile' : 'fas fa-envelope' }}</v-icon>
              <span>{{ registerWithEmail ? 'Sign up with Phone' : 'Sign up with Email' }}</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block class="no-uppercase mt-4" color="#D63C28" dark depressed rounded x-large>
              <v-icon left>fab fa-google</v-icon>
              <span>Sign up with Google</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block class="no-uppercase mt-4" color="#3B5998" dark depressed rounded x-large>
              <v-icon left>fab fa-facebook-f</v-icon>
              <span>Sign up with Facebook</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-card class="py-8 px-16" dark>
          <h1 class="display-1"><strong>Login to your account !</strong></h1>

          <h1 class="body-2">Welcome back! Please enter your login credentials below to continue.</h1>
          <v-form ref="loginForm" class="pt-4">
            <v-text-field v-model="email" :error-messages="usernameErrors" autocomplete="on" autofocus
                          background-color="white"
                          filled
                          label="Email or Phone No.*"
                          light
                          placeholder="Enter your email or phone number here..."
                          prepend-inner-icon="fas fa-user"
                          rounded
                          v-on:keyup.enter="login"
            ></v-text-field>
            <v-text-field v-model="password" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                          :error-messages="passwordErrors"
                          :type="showPassword ? 'text' : 'password'"
                          autocomplete="on"
                          background-color="white"
                          filled
                          label="Password*"
                          light
                          placeholder="Enter your password here..."
                          prepend-inner-icon="fas fa-key"
                          rounded
                          @click:append="showPassword = !showPassword"
                          v-on:keyup.enter="login"
            ></v-text-field>
            <v-row align="center" justify="center">
              <v-col class="py-0 my-0" cols="6">
                <v-checkbox label="Remember Me"></v-checkbox>
              </v-col>
              <v-col align="right" class="py-0 my-0" cols="6"><span>Forgot Password?</span></v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-btn block class="no-uppercase mt-4" color="secondary" depressed rounded x-large
                       @click="login">
                  <img alt="bigyapan_logo_only_white" height="25px" src="/images/logo_only_bigyapan_white.svg"
                       width="30px">
                  <span>Login</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block class="no-uppercase mt-4" color="#D63C28" depressed rounded x-large>
                  <v-icon left>fab fa-google</v-icon>
                  <span>Sign in with Google</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block class="no-uppercase mt-4" color="#3B5998" depressed rounded x-large>
                  <v-icon left>fab fa-facebook-f</v-icon>
                  <span>Sign in with Facebook</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
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
      register: {
        phoneNo: "",
        email: "",
        password: "",
        name: "",
        dob: "",
        showPassword: false,
      },
      email: "",
      password: "",
      showPassword: false,
      dobMenu: false,
      registerWithEmail: false,
    }
  },
  validations: {
    register: {
      phoneNo: {required},
      email: {required},
      password: {required},
      name: {required},
    },
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
    signup() {
      if (this.registerWithEmail) {
        this.$v.register.email.$touch();
      } else {
        this.$v.register.phoneNo.$touch();
      }
      this.$v.register.password.$touch();
      this.$v.register.name.$touch();
    }
  },
}
</script>

<style scoped>

</style>
