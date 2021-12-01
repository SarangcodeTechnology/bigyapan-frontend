<template>
  <v-app-bar
    app
    class="py-6"
    extension-height="40px"
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
        <v-col cols="4">
          <v-text-field v-model="query.search"
                        append-icon="fas fa-search"
                        color="secondary"
                        filled
                        placeholder="Search for everything..." rounded @click:append="search"
                        @keypress.enter="search">
          </v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" @click="themeSwitch=!themeSwitch" v-on="on">
                <v-icon>{{ themeSwitch ? 'fas fa-moon' : 'fas fa-sun' }}</v-icon>
              </v-btn>
            </template>
            <span>Switch Theme</span>
          </v-tooltip>
          <v-btn-toggle>
            <v-btn v-for="(locale,i) in availableLocales" :key="i" @click="changeLocale(locale)">
              {{ locale.name }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="auto">
          <v-tooltip v-if="!isLogin" bottom>
            <template v-slot:activator="{on,attrs}">
              <v-btn color="primary" fab icon to="/login" v-bind="attrs" v-on="on">
                <v-icon>fas fa-sign-in-alt</v-icon>
              </v-btn>
            </template>
            <span>Login/Register</span>
          </v-tooltip>
          <v-menu v-else :close-on-content-click="true" offset-overflow offset-y transition="slide-x-reverse-transition">
            <template v-slot:activator="{on,attrs}">
              <v-btn fab icon v-bind="attrs" v-on="on">
                <v-avatar v-if="user.user_details.user_image">
                  <img
                    alt="user-image"
                    :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"
                  >
                </v-avatar>
                <v-icon v-else>fas fa-user</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar v-if="user.user_details.user_image">
                    <img
                      alt="user-image"
                      :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"
                    >
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else>
                    <img
                      alt="user-image"
                      src="/images/user_image_placeholder.png"
                    >
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item link to="/settings">
                  <v-list-item-icon>
                    <v-icon>fas fa-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>fas fa-sign-out-alt</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>

                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

          </v-menu>
          <v-btn class="px-6" color="secondary" depressed>
            <v-icon left>fas fa-hand-holding-usd</v-icon>
            <span>Sell</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <template v-slot:extension>
      <v-container class="ma-0 pa-0" fluid>
        <v-sheet class="appbar-extension-background ma-0 pa-0" dark>
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="auto">
              <v-menu :close-on-content-click="true" min-width="100%" offset-y
                      transition="slide-y-transition" z-index="4">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="categories-button" text tile v-bind="attrs" v-on="on">
                    <span>Categories</span>
                    <v-icon right> fas fa-angle-down</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-container fluid>
                    <v-row>
                      <v-col v-for="itemCategory in itemCategories" :key="itemCategory.id" class="pa-6" cols="3">
                        <h1 class="title">{{ itemCategory.title }}</h1>
                        <template v-for="itemSubCategory in itemCategory.item_sub_categories">
                          <h1 class="subtitle-1">{{ itemSubCategory.title }}</h1>
                        </template>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </template>

  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainHeader",
  data() {
    return {
      backendBaseUrl: process.env.BACKEND_BASE_URL,
      locale: this.$i18n.locale,
      themeSwitch: false,
      itemCategories: [],
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
    logout() {
      let temp = this;
      this.$store
        .dispatch("auth/logout")
        .then(function (response) {
          if (response.status === 200) {
            temp.$router.push("/login");
          }
        }).catch(function (error) {
        console.log(error)
      });
    },
    getItemCategories() {
      let temp = this;
      this.$store.dispatch("webservice/getItemCategories").then(function (response) {
        temp.itemCategories = response.data.data.itemCategories;
      });
    }
  },
  computed: {
    ...mapGetters("webservice", ["query"]),
    ...mapGetters("auth", ["isLogin","user"]),
    availableLocales() {
      return this.$i18n.locales;
    }
  },
  mounted() {
    this.getItemCategories();
  }
}
</script>

<style lang="scss">

.v-toolbar__content, .v-toolbar__extension {
  padding: 0 0 !important;
}

.appbar-extension-background {
  background-color: $bigyapan-primary-darken5 !important;
}

.categories-button:hover {
  background-color: $bigyapan-secondary-base;
}

.categories-button:focus {
  background-color: $bigyapan-secondary-base;
}

</style>
