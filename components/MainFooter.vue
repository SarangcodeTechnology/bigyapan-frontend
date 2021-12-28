<template>
  <v-footer
    absolute
    app
    dark
  >
    <v-row no-gutters>
      <v-col  cols="4">
        <h4>Contact Info</h4><br>
        <v-list-item class="ma-0 pa-0" dense>
          <v-icon small left>fas fa-mobile</v-icon>
          <span class="caption">+977 9845580590</span>
        </v-list-item>
        <v-list-item class="ma-0 pa-0" dense>
          <v-icon small left>fas fa-envelope</v-icon>
          <span class="caption">support@bigyapan.com</span>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col align="center" cols="12">
        <v-btn text>
          <span>About Us</span>
        </v-btn>
        <v-btn text>
          <span>Terms & Conditions</span>
        </v-btn>
        <v-btn text>
          <span>FAQ's</span>
        </v-btn>
        <v-btn text>
          <span>Contact Us</span>
        </v-btn>
        <v-btn text>
          <span>How it works</span>
        </v-btn>
        <v-btn text>
          <span>Safety Tips</span>
        </v-btn>
      </v-col>
      <v-col align="start" cols="auto">
        <span class="caption">&copy; {{ new Date().getFullYear() }} — <strong>bigyapan.com</strong> — All rights reserved<v-divider
          class="mx-2" vertical/>Developed by <strong>Sarangcode Technology Pvt. Ltd.</strong></span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn class="mx-1" dark depressed icon small>
          <v-icon class="mx-2" small>fab fa-facebook-f</v-icon>
        </v-btn>
        <v-btn class="mx-1" dark depressed icon small>
          <v-icon class="mx-2" small>fab fa-google</v-icon>
        </v-btn>
        <v-btn class="mx-1" dark depressed icon small>
          <v-icon class="mx-2" small>fab fa-twitter</v-icon>
        </v-btn>
        <v-btn class="mx-1" dark depressed icon small>
          <v-icon class="mx-2" small>fab fa-linkedin</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "MainFooter"
}
</script>

<style lang="scss" scoped>
</style>
