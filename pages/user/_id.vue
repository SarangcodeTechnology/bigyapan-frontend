<template>
<v-container fill-height fluid>
  <v-card width="100%">
    <v-img height="200" :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"></v-img>
    <v-col>
      <v-avatar size="100" style="position:absolute; top: 130px">
        <v-img :src="backendBaseUrl+'storage/images/user-images/'+user.user_details.user_image"></v-img>
      </v-avatar>
    </v-col>
    <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
        <v-list-item-title class="title">{{user.name}}</v-list-item-title>
        <v-list-item-title class="title">{{user.email}}</v-list-item-title>
        <v-btn :href="'tel:+'+user.user_details.phone_number" color="success" depressed>
          <v-icon left>fas fa-mobile</v-icon>
          <span>{{ user.user_details.phone_number }}</span>
        </v-btn>
        <v-list-item-title class="title">{{user.user_details.user_description}}</v-list-item-title>


        <v-list-item-subtitle>Rating:</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>

</v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "_id",
  data(){

    return{
      backendBaseUrl: process.env.BACKEND_BASE_URL,
      id:null,
    }
  },
  methods: {
    ...mapActions("user", ["fetchDetailUser"]),
    fetchUser(){
      let temp=this;
      this.fetchDetailUser(temp.id);
    }
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchUser();
  }
}
</script>

<style scoped>

</style>
