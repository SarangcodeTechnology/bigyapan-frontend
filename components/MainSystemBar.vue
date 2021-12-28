<template>
  <v-system-bar app color="#424242" dark window>
    <v-btn depressed small text>
      <v-icon left small>fas fa-mobile</v-icon>
      <span>+977 9845580590</span>
    </v-btn>
    <v-btn class="no-uppercase" depressed small text>
      <v-icon left small>fas fa-envelope</v-icon>
      <span>support@bigyapan.com</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn class="no-uppercase" depressed small text to="/login">
      <v-icon left small>fas fa-sign-in-alt</v-icon>
      <span>Login</span>
    </v-btn>
    <v-btn class="no-uppercase" depressed small text to="/register">
      <v-icon left small>fas fa-user-plus</v-icon>
      <span>Register</span>
    </v-btn>
    <v-btn color="#3B5998" dark depressed icon small>
      <v-icon class="mx-2" small>fab fa-facebook-f</v-icon>
    </v-btn>
    <v-btn color="#D63C28" dark depressed icon small>
      <v-icon class="mx-2" small>fab fa-google</v-icon>
    </v-btn>
    <v-btn color="#00acee" dark depressed icon small>
      <v-icon class="mx-2" small>fab fa-twitter</v-icon>
    </v-btn>
    <v-btn color="#0077b5" dark depressed icon small>
      <v-icon class="mx-2" small>fab fa-linkedin</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
export default {
  name: "MainSystemBar"
}
</script>

<style scoped>

</style>
