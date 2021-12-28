<template>
  <v-app-bar :color="!$vuetify.theme.dark?'#F5F5F5':'primary'" app extension-height="50px" flat>
    <v-container class="ma-0 pa-0" fill-height fluid>
      <v-row align="center">
        <v-col cols="auto">
          <NuxtLink to="/">
            <v-img v-if="!$vuetify.theme.dark" alt="bigyapan_logo_full" contain
                   src="/images/logo_bigyapan_full.svg"
                   width="9em"></v-img>
            <v-img v-else alt="bigyapan_logo" contain src="/images/logo_only_bigyapan_white.svg"
                   width="2em"></v-img>
          </NuxtLink>
        </v-col>
        <v-col cols="2">
          <v-autocomplete v-model="query.location"
                          append-icon="fas fa-map-marker-alt"
                          background-color="white"
                          color="secondary"
                          dense
                          filled
                          hide-details
                          light
                          outlined
                          placeholder="Select Location..." rounded @click:append="search"
                          @keypress.enter="search">
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="query.search"
                        append-icon="fas fa-search"
                        background-color="white"
                        color="secondary"
                        dense
                        filled
                        hide-details
                        light
                        outlined
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
         <client-only>
           <v-menu v-if="isLogin" :close-on-content-click="true" offset-overflow offset-y
                   transition="slide-x-reverse-transition">
             <template v-slot:activator="{on,attrs}">
               <v-btn fab icon v-bind="attrs" v-on="on">
                 <v-avatar v-if="user.user_details.user_image">
                   <img
                     :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"
                     alt="user-image"
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
                       :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"
                       alt="user-image"
                     >
                   </v-list-item-avatar>
                   <v-list-item-avatar v-else>
                     <img
                       alt="user-image"
                       src="/images/user_image_placeholder.png"
                     >
                   </v-list-item-avatar>

                   <v-list-item-content>
                     <v-list-item-title>{{ user.name }}</v-list-item-title>
                     <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
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
         </client-only>
          <v-btn class="px-6" color="secondary" depressed @click="openSellForm()">
            <v-icon left>fas fa-hand-holding-usd</v-icon>
            <span>Sell</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <template v-slot:extension>
      <v-container fill-height fluid >
        <v-row align="center">
          <v-col class="ma-0 pa-0" cols="auto">
            <v-menu :close-on-content-click="true" min-width="100%" offset-y
                    transition="slide-y-transition" z-index="4">
              <template v-slot:activator="{ on, attrs }">
                <v-btn  text v-bind="attrs" v-on="on">
                  <v-icon left small> fas fa-bars</v-icon>
                  <span>Categories</span>
                </v-btn>
              </template>
              <v-card>
                <v-container fluid>
                  <v-row>
                    <v-col v-for="itemCategory in itemCategories" :key="itemCategory.id"
                           cols="2">
                      <v-list-item dense text @click="filterItems({ itemCategory: itemCategory.id})">
                        <h4>{{ itemCategory.title.toUpperCase() }} </h4>
                      </v-list-item>
                      <v-list-item dense v-for="itemSubCategory in itemCategory.item_sub_categories" :key="itemSubCategory.id"
                                   text @click="filterItems({ itemCategory: itemCategory.id, itemSubCategory: itemSubCategory.id})">
                        <h5>{{ itemSubCategory.title }} </h5>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-menu>

          </v-col>
          <v-spacer></v-spacer>
          <v-col class="ma-0 pa-0" cols="auto">
            <v-btn  text>
              <span>Listings</span>
            </v-btn>
            <v-btn  text>
              <span>Pages</span>
            </v-btn>
            <v-btn  text>
              <span>Blog</span>
            </v-btn>
            <v-btn  text>
              <span>Contact</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </template>

  </v-app-bar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

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
    ...mapActions("item", ["fetchAllFilterItems"]),
    filterItems(query) {
      let temp = this;
      this.fetchAllFilterItems(query).then(function (response) {
        temp.$router.push('/filter-items')
      })
    },
    openSellForm() {
      if (this.isLogin) {
        this.$router.push("/item/create");
      } else {
        this.$router.push("/login");
      }
    },
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
    ...mapGetters("auth", ["isLogin", "user"]),
    availableLocales() {
      return this.$i18n.locales;
    }
  },
  mounted() {
    this.getItemCategories();
  }
}
</script>

<style lang="scss" scoped>

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

.background {
  background-color: $bigyapan-primary-base !important;
}

</style>

