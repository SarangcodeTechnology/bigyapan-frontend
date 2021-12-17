<template>
  <h1></h1>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
    }
  },
  name: "filter-items",
  methods:{
    ...mapActions("item",["filterItems"])
  },
  mounted() {
    this.filterItems(this.$route.query).then(function(response){
      console.log(response);
    })

  }
}
</script>

<style scoped>

</style>
