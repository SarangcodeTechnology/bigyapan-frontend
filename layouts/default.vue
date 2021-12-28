<template>
  <v-app class="ma-0 pa-0">
    <MainSystemBar/>
    <MainHeader/>
    <v-main>
      <v-container class="ma-0 pa-0" fluid>
        <Nuxt/>
      </v-container>
    </v-main>
    <MainFooter/>
  </v-app>
</template>

<script>
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import MainSystemBar from "../components/MainSystemBar";

export default {
  components: {MainSystemBar, MainFooter, MainHeader},
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

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
}

::-webkit-scrollbar-thumb:hover {
  background-color: $bigyapan-primary-base;
}
</style>
