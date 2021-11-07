<template>
  <v-app-bar
    app
    class="py-6"
    fixed
    flat
  >
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <NuxtLink to="/">
            <v-img v-if="!$vuetify.theme.dark" alt="bigyapan_logo" contain
                   src="/images/logo_bigyapan_full.svg"
                   width="200px"></v-img>
            <v-img v-else alt="bigyapan_logo" contain src="/images/logo_bigyapan_white.svg"
                   width="200px"></v-img>
          </NuxtLink>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="query.search" append-icon="fas fa-search" background-color="primary lighten-9"
                        color="secondary"
                        filled
                        placeholder="Search for everything..." rounded @click:append="search">
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-autocomplete
            v-model="locale"
            :items="availableLocales"
            color="secondary"
            dense
            filled
            full-width
            item-text="name"
            item-value="code"
            return-object
            rounded
            @input="changeLocale">
          </v-autocomplete>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end align-content-center" cols="4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" @click="themeSwitch=!themeSwitch" v-on="on">
                <v-icon>{{ themeSwitch ? 'fas fa-moon' : 'fas fa-sun' }}</v-icon>
              </v-btn>
            </template>
            <span>Switch Theme</span>
          </v-tooltip>


          <v-btn class="px-6" color="secondary" depressed rounded>
            <v-icon left>fas fa-hand-holding-usd</v-icon>
            <span>Sell</span>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainHeader",
  data() {
    return {
      locale: this.$i18n.locale,
      themeSwitch: false,
    }
  },
  watch: {
    themeSwitch: function (old, newVal) {
      this.$vuetify.theme.dark = old;
    },
  },
  methods: {
    search() {
    },
    changeLocale(item) {
      this.$i18n.setLocale(item.code);
    },
  },
  computed: {
    ...mapGetters("webservice", ["query"]),
    availableLocales() {
      return this.$i18n.locales;
    }
  }
}
</script>

<style scoped>

</style>
