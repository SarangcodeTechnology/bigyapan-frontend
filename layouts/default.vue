<template>
  <v-app>
    <MainHeader/>
    <v-main>
      <v-container fluid>
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

</style>
