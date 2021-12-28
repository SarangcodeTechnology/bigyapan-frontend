<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <client-only>
          <v-card>
            <v-carousel>
              <v-carousel-item
                v-for="(image,i) in item.item_images!=null ? JSON.parse(item.item_images.item_image_large):[]"
                :key="i"
                :src="backendBaseUrl+'storage/images/item-images/'+image"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </client-only>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <v-col cols="7">
              <span><strong>{{ item.item_name }}</strong></span>
            </v-col>
            <v-col class="d-inline-flex align-content-end justify-end" cols="5">
              <span><strong> रू. {{ item.item_price }} </strong></span>
            </v-col>
          </v-card-title>
          <v-card-subtitle><span>{{ item.item_category.title }} - {{ item.item_sub_category.title }}</span>
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
            <span>{{ item.item_description }}</span>
          </v-card-text>
          <v-card-text class="py-0 d-inline-flex justify-end" cols="12">
            <span> {{ $moment.utc(item.created_at).local().fromNow() }}</span>
            <v-spacer></v-spacer>
            <span class="overline"> {{ item.user.name }}</span>
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>
            <h4>Seller Information</h4>


          </v-card-title>
          <v-card-subtitle>
            <v-row>
              <v-col cols="6">
                <v-btn elevation="0"  :to="`/user/${item.user.id}`">{{ item.user.name }}</v-btn>
              </v-col>
              <v-col align="right" cols="6" justify="right">
                <v-btn :href="'tel:+'+item.user.user_details.phone_number" color="success" depressed>
                  <v-icon left>fas fa-mobile</v-icon>
                  <span>{{ item.user.user_details.phone_number }}</span>
                </v-btn>

              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "id",
  data() {
    return {
      id: null,
      backendBaseUrl: process.env.BACKEND_BASE_URL,
    }
  },
  methods: {
    ...mapActions("item", ["fetchDetailItem"]),
    fetchItem() {
      let temp = this;
      this.fetchDetailItem(temp.id);
    }
  },
  computed: {
    ...mapGetters("item", ["item"])
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchItem();
  }
}
</script>

<style scoped>

</style>
