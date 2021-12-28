<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Select Category and Sub-Category
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Fill Item Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Review the details
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col class="pa-6" cols="6">
                <v-list>
                  <v-subheader>Categories</v-subheader>
                  <v-list-item-group
                    v-model="item.selectedItemCategory"
                    color="primary"
                  >
                    <v-list-item
                      :value="itemCategory"
                      v-for="itemCategory in itemCategories"
                      :key="itemCategory.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="itemCategory.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col class="pa-6" cols="6">
                <v-list>
                  <v-subheader>Sub-Categories</v-subheader>
                  <v-list-item-group

                    v-model="item.selectedItemSubCategory"
                    color="primary"
                  >
                    <v-list-item
                      :value="itemSubCategory"
                      v-for="itemSubCategory in itemSubCategories"
                      :key="itemSubCategory.id"
                    >
                      <v-list-item-content @click="e1=2">
                        <v-list-item-title v-text="itemSubCategory.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

              </v-col>
            </v-row>
          </v-container>

        </v-card>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          <v-row>
            <v-col cols="auto">
              <h1 class="display-1">Item Form</h1>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn :disabled="!valid" color="primary" @click="e1=3">
                <v-icon left>fas fa-save</v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
          <v-form v-model="valid">

            <v-row>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="item.item_name"
                          :error-messages="nameErrors"
                          :counter="10"
                          label="Item Name"
                          required
                          @input="$v.item.item_name.$touch()"
                          @blur="$v.item.item_name.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.price"
                          label="Price"
                          placeholder="Enter the price of the product"
                          :error-messages="priceErrors"
                          type="number"
                          required
                          @input="$v.item.price.$touch()"
                          @blur="$v.item.price.$touch()"
                        ></v-text-field>

                        <v-text-field
                          v-model="item.item_description"
                          name="item_description"
                          :error-messages="descriptionErrors"
                          :counter="40"
                          label="Item Description"
                          placeholder="Give a short description about the product"
                          required
                          @input="$v.item.item_description.$touch()"
                          @blur="$v.item.item_description.$touch()"
                        ></v-text-field>
                        <v-col cols="6">
                          <v-file-input v-model="item_images" filled
                                        label="Item Images"
                                        multiple name="item_images"
                                        placeholder="Please upload the item images..."
                                        prepend-icon=""
                                        prepend-inner-icon="fas fa-camera" @change="previewImage"
                          ></v-file-input>
                          <v-container fill-height>
                            <v-row align="center" justify="center">
                              <template v-for="previewImage in previewImageUrl">
                                <v-img :aspect-ratio="1/1"
                                       :src="previewImage?previewImage :'/images/item_image_placeholder.png'"></v-img>
                              </template>

                            </v-row>
                          </v-container>
                        </v-col>


                        <v-checkbox
                          v-model="item.price_negotiable"
                          label="Price Negotiable?"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkbox"
                          :error-messages="checkboxErrors"
                          label="Do you agree?"
                          required
                          @change="$v.checkbox.$touch()"
                          @blur="$v.checkbox.$touch()"
                        ></v-checkbox>

                        <v-btn @click="clear">
                          clear
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card>
          <h1 align="center">Review and Confirm the details</h1>
          <v-form readonly>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <ol>
                          <li>Sold by: {{}}</li>
                          <li>Seller Phone no: {{}}</li>
                          <li> Seller e-mail address: {{}}</li>
                        </ol>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6"

                      >
                        <v-text-field
                          v-model="item.item_name"
                          :error-messages="nameErrors"
                          :counter="10"
                          label="Item Name"
                          required
                          @input="$v.item.item_name.$touch()"
                          @blur="$v.item.item_name.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.price"
                          label="Price"
                          placeholder="Enter the price of the product"
                          :error-messages="priceErrors"
                          type="number"
                          required
                          @input="$v.item.price.$touch()"
                          @blur="$v.item.price.$touch()"
                        ></v-text-field>

                        <v-text-field
                          v-model="item.item_description"
                          name="item_description"
                          :error-messages="descriptionErrors"
                          :counter="40"
                          label="Item Description"
                          placeholder="Give a short description about the product"
                          required
                          @input="$v.item.item_description.$touch()"
                          @blur="$v.item.item_description.$touch()"
                        ></v-text-field>
                        <v-col cols="6">
                          <v-file-input v-model="item_images" filled
                                        label="Item Images"
                                        multiple name="item_images"
                                        placeholder="Please upload the item images..."
                                        prepend-icon=""
                                        prepend-inner-icon="fas fa-camera" @change="previewImage"
                          ></v-file-input>
                          <v-container fill-height>
                            <v-row align="center" justify="center">
                              <template v-for="previewImage in previewImageUrl">
                                <v-img :aspect-ratio="1/1"
                                       :src="previewImage?previewImage :'/images/item_image_placeholder.png'"></v-img>
                              </template>

                            </v-row>
                          </v-container>
                        </v-col>


                        <v-checkbox
                          v-model="item.price_negotiable"
                          label="Price Negotiable?"
                          required
                        ></v-checkbox>

                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

          </v-form>
        </v-card>
        <v-btn
          color="primary"
          @click="OnSave()"
        >
          Confirm
        </v-btn>
        <v-btn text @click="e1=2">
          Edit
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, numeric} from 'vuelidate/lib/validators'
import item from "../../store/item";
import {mapGetters, mapActions} from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    item: {
      item_name: {required, maxLength: maxLength(10)},
      price: {required, numeric},
      item_description: {required, maxLength: maxLength(40)},
    },
    select: {required},
    checkbox: {
      checked(val) {
        return val
      },
    },
  },
  data() {
    return {
      valid: false,
      e1: 1,
      item: {
        item_name: '',
        item_description: '',
        price: '',
        price_negotiable: false,
        selectedItemCategory: '',
        selectedItemSubCategory: '',
      },
      itemCategories: [],
      backendBaseUrl: process.env.BACKEND_BASE_URL,

      checkbox: false,
      item_images: [],

      previewImageUrl: [],

    }
  },
  methods: {
    ...mapActions("item", ["storeItem"]),
    OnSave() {
      var temp = this;
      const {
        selectedItemCategory,
        selectedItemSubCategory,
        item_name,
        price,
        item_description,
        price_negotiable
      } = this.item;
      let formData = new FormData();
      formData.append("item", JSON.stringify({
        user_id: temp.user.id,
        item_name: item_name,
        item_price: price,
        item_description: item_description,
        item_price_negotiable: price_negotiable,
        item_category_id: selectedItemCategory.id,
        item_sub_category_id: selectedItemSubCategory.id,
      }));
      for (var i = 0; i < temp.item_images.length; i++) {
        let file = temp.item_images[i];
        formData.append('item_images[' + i + ']', file);
      }
      this.storeItem(formData);
    },
    previewImage(files) {
      let temp = this;
      if (!files) {
        temp.previewImageUrl = null;
        return;
      }
      temp.createImage(files);
    },
    createImage(files) {
      this.files = [];
      var tempPreviewImageUrl = [];
      const test = files.forEach((file, idx) => {
        const fileReader = new FileReader();
        const getResult = new Promise(resolve => {
          fileReader.onload = e => {
            tempPreviewImageUrl.push(
              e.target.result
            );
          };
        });
        fileReader.readAsDataURL(file);
        return getResult.then(file => {
          return file;
        });
      });
      this.previewImageUrl = tempPreviewImageUrl;
    },


    getItemCategories() {
      let temp = this;
      this.$store.dispatch("webservice/getItemCategories").then(function (response) {
        temp.itemCategories = response.data.data.itemCategories;
      });
    },
    submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.item_name = ''
      this.item_description = ''
      this.price = ''
      this.price_negotiable = null
      this.checkbox = false
      this.item_images = []
    },
  },
  mounted() {
    this.getItemCategories();
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    itemSubCategories: function () {
      const temp = this;
      let data = [];
      this.itemCategories.forEach(function (itemCategory) {
        if (itemCategory.id === temp.item.selectedItemCategory.id) {
          data = itemCategory.item_sub_categories;
        }
      });
      return data;
    },

    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('This detail is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.item.item_name.$dirty) return errors
      !this.$v.item.item_name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.item.item_name.required && errors.push('Item name is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.item.item_description.$dirty) return errors
      !this.$v.item.item_description.maxLength && errors.push('Name must be at most 40 characters long')
      !this.$v.item.item_description.required && errors.push('Item description is required.')
      return errors
    },

    priceErrors() {
      const errors = []
      if (!this.$v.item.price.$dirty) return errors
      !this.$v.item.price.numeric && errors.push('Must be valid Price')
      !this.$v.item.price.required && errors.push('Price is required')
      return errors
    },

  },
}
</script>

<style scoped>

</style>
