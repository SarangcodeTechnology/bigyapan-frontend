<template>
  <v-app  class="ma-0 pa-0">
    <MainHeader/>
    <v-main>
      <v-container class="mt-6" fluid>
        <Nuxt/>
      </v-container>
    </v-main>
    <MainFooter/>
  </v-app>
</template>

<script>
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

export default {
  components: {MainFooter, MainHeader},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss">
.no-uppercase {
  text-transform: none;
}
</style>
