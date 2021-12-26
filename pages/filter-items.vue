<template>
  <v-container fluid>
    <v-row>
      <v-progress-linear :active="isLoading" background-color="primary lighten-9" color="secondary"
                         indeterminate></v-progress-linear>
      <v-col v-for="(item,id) in itemsPaginatedData.data" :key="item.id" cols="3">
        <v-skeleton-loader v-if="isLoading"
                           type="card"
        ></v-skeleton-loader>
        <v-card v-else rounded="lg" @click="getItemDetail(item.id)">
          <v-img
            :src="item.item_images != null ? backendBaseUrl+'storage/images/item-images/'+JSON.parse(item.item_images.item_image_large)[0] : '/images/user_image_placeholder.png'"
            height="250"
          ></v-img>
          <!--          <template v-for="subItem in JSON.parse(item.item_images) " >-->
          <!--          <p>{{ item.item_images != null ? item.item_images.id : '' }}</p>-->
          <!--          </template>-->

          <v-card-title>
            <v-row>
              <v-col cols="7">
                <span><strong>{{ item.item_name }}</strong></span>
              </v-col>
              <v-col class="d-inline-flex align-content-end justify-end" cols="5">
                <span><strong> रू. {{ item.item_price }} </strong></span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <span>{{ item.item_category.title }} - {{ item.item_sub_category.title }}</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="item.item_price_negotiable?'success':'error'" right v-bind="attrs" x-small v-on="on">fas
                  fa-comment-dollar
                </v-icon>
              </template>
              <span v-if="item.item_price_negotiable">Price Negotiable</span>
              <span v-else>Price Non Negotiable</span>
            </v-tooltip>
          </v-card-subtitle>

          <v-card-text>
            <span>{{ item.item_description ? item.item_description.substring(0, 30) + ".." : "" }}</span>
          </v-card-text>
          <v-card-text class="py-0 d-inline-flex justify-end" cols="12">
            <span> {{ $moment.utc(item.created_at).local().fromNow() }}</span>
            <v-spacer></v-spacer>
            <span class="overline"> {{ item.user.name }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      backendBaseUrl: process.env.BACKEND_BASE_URL,
    }
  },
  name: "filter-items",
  methods: {
    getItemDetail(id) {
      this.$router.push(`/item/${id}`);
    }
  },
  mounted() {


  },
  computed: {
    ...mapGetters("item", ["itemsPaginatedData", "isLoading"]),
  },
}
</script>

<style scoped>

</style>
