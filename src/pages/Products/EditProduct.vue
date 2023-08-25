<template>
    <q-page padding>
      <div class="q-pa-md">
        <q-inner-loading class="h-screen" :showing="true" v-if="productStore.isLoading">
       <q-spinner-gears size="50px" class=" -translate-y-16"/>
      </q-inner-loading>
        <q-stepper v-else v-model="step" ref="stepper" vertical color="primary" animated bordered>
          <q-step :name="1" title="Mahsulot haqida batafsil" icon="settings" :done="step > 1">
  
            <q-form @submit.prevent="$refs.stepper.next()">
              <div class="row">

                <div class="col-12 q-py-sm">
                <q-item-label class="q-pl-sm">Do'kon tanlang</q-item-label>
                <q-select :options="shopStore.shops" v-model="productStore.product.shop"  emit-value map-options
                  lazy-rules :rules="[v => !!v || 'required']" label="Do'kon belgilang"
                  options-selected-class="text-deep-orange" class="q-pa-xs" outlined dense 
                 >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-img width="28px" height="38px" class="q-mr-sm" :src="scope.opt.image"></q-img>
                      {{ scope.opt.name }}
                    </q-item>
                  </template>
                  <template #selected-item="props">
                    <q-item v-bind="props" class="flex items-center">
                      <q-img width="28px" height="38px" class="q-mr-sm" :src="props.opt.image"></q-img>
                      {{ props.opt.name }}
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12 q-py-sm">
                <q-item-label class="q-pl-sm">Asosiy toifani tanlang</q-item-label>
                <q-select :options="categoryStore.categories" v-model="productStore.product.parentCategory"  emit-value map-options
                  lazy-rules :rules="[v => !!v || 'required']" label="Mahsulotnining katta categoriyasi"
                  options-selected-class="text-deep-orange" class="q-pa-xs" outlined dense
                  @update:modelValue="parentCategorySelected">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-img width="28px" height="38px" class="q-mr-sm" :src="scope.opt.icon"></q-img>
                      {{ scope.opt.name?.uz }}
                      <br>
                      {{ scope.opt.name?.ru }}
                    </q-item>
                  </template>
                  <template #selected-item="props">
                    <q-item v-bind="props">
                      <q-img width="28px" height="38px" class="q-mr-sm" :src="props.opt.icon"></q-img>
                      {{ props.opt.name?.uz }}
                      <br>
                      {{ props.opt.name?.ru }}
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12 q-py-sm">
                <q-item-label class="q-pl-sm">O'rta toifani tanlang</q-item-label>
                <q-select :options="subCategories" v-model="productStore.product.subCategory" emit-value map-options lazy-rules
                  :rules="[v => !!v || 'required']" label="Mahsulotnining katta categoriyasi"
                  options-selected-class="text-deep-orange" class="q-pa-xs" outlined dense
                  @update:modelValue="subCategorySelected">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      {{ scope.opt.name?.uz }}
                      <br>
                      {{ scope.opt.name?.ru }}
                    </q-item>
                  </template>
                  <template #selected-item="props">
                    <q-item v-bind="props">
                      {{ props.opt.name?.uz }}
                      <br>
                      {{ props.opt.name?.ru }}
                    </q-item>
                  </template>
                </q-select>
              </div>


              <div class="col-12 q-py-sm">
                <q-item-label  class="q-pl-sm">Kichik toifani tanlang</q-item-label>
                <q-select :options="childCategories" v-model="productStore.product.childCategory" emit-value map-options lazy-rules
                  :rules="[v => !!v || 'required']" label="Mahsulotnining kichik categoriyasi"
                  options-selected-class="text-deep-orange" class="q-pa-xs" outlined dense>
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      {{ scope.opt.name?.uz }}
                      <br>
                      {{ scope.opt.name?.ru }}
                    </q-item>
                  </template>
                  <template #selected-item="props">
                    <q-item v-bind="props">
                      {{ props.opt.name?.uz }}
                      <br>
                      {{ props.opt.name?.ru }}
                    </q-item>
                  </template>
                </q-select>

              </div>

                <div class="col-md-6 col-12 q-py-sm">
                  <q-item-label  class="q-pl-sm">Mahsulot nomi (uzbek tilida) majburiy* </q-item-label>
                  <q-input v-model="productStore.product.name.uz" ref="name_uz" label="Mahsulot nomi" lazy-rules
                    :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
                </div>
  
                <label ref="label"></label>
  
                <div class="col-md-6 col-12 q-py-sm">
                  <q-item-label  class="q-pl-sm">Mahsulot nomi (rus tilida) majburiy* </q-item-label>
                  <q-input v-model="productStore.product.name.ru" ref="name_ru" label="Mahsulot nomi" outlined lazy-rules
                    :rules="[v => !!v || 'required']" dense class="q-pa-xs" />
                </div>
  
                <div class="col-12 q-py-sm">
                  <q-item-label class="q-px-xs">Mahsulot haqida batafsil (o'zbek tilida) majburiy*</q-item-label>
                  <CreatePost isEmpty="Iltimos maydon to'ldiring" v-model="productStore.product.discription.uz"
                    @uploadImage="(img) => productStore.product.discription.uz += img"
                    placeholder="Mahsulot haqida batafsil (o'zbek tilida)" lazy-rules :rules="[v => !!v || 'required']" />
  
  
                </div>
  
                <div class="col-12 q-py-sm">
                  <q-item-label class="q-px-xs">Mahsulot haqida batafsil (rus tilida) majburiy*</q-item-label>
                  <CreatePost isEmpty="Iltimos maydon to'ldiring" v-model="productStore.product.discription.ru"
                    @uploadImage="(img) => productStore.product.discription.ru += img"
                    placeholder="Mahsulot haqida batafsil (rus tilida)" lazy-rules :rules="[v => !!v || 'required']" />
                </div>
  
  
  
                <div class="col-md-6 col-12 q-py-sm">
                  <q-item-label  class="q-px-sm">Mahsulot miqdori kiriting majburiy*</q-item-label>
                  <q-input v-model.number="productStore.product.quantity" ref="quantity" label="Mahsulot miqdori majburiy*" outlined
                    dense class="q-pa-xs" lazy-rules :rules="[v => !!v || 'required']" mask="#" fill-mask="1"
                    reverse-fill-mask />
                </div>
  
                <div class="col-md-6 col-12 q-py-sm">
                  <q-item-label  class="q-px-sm">Mahsulot narxini kiriting majburiy*</q-item-label>
                  <q-input dense ref="price" outlined v-model="productStore.product.price" label="Mahsulot narxi majburiy*"
                      class="q-pa-xs" lazy-rules :rules="[v => !!v || 'required']" prefix="$" />
                </div>
  
              </div>
  
              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Keyingisi" />
              </q-stepper-navigation>
            </q-form>
          </q-step>
  
          <q-step :name="2" title="Mahsulot brendi haqida" caption="brend sozlamasi" icon="create_new_folder"
            :done="step > 2">
            <q-form @submit.prevent="$refs.stepper.next()">
              <div class="row">
  
                <div class="col-md-12 col-12 q-py-sm">
                  <q-item-label class="q-pa-xs">Mahsulotning Brend nomini kiriting majburiy*</q-item-label>
                  <q-input v-model="productStore.product.brend.name" label="Brend nomi" dense outlined class="q-pa-xs" />
                </div>
  
  
  
                <div class="col-12 q-py-sm">
                  <q-item-label class="q-pa-xs">Mahsulotning Brend haqida ixtiyoriy*</q-item-label>
                  <CreatePost v-model="productStore.product.brend.discription.uz"
                    @uploadImage="(img) => productStore.product.brend.discription.uz += img"
                    placeholder="Brend haqida batafsil malumot bo'lsa kiriting (o'zbek tilida)" />
                </div>
                <div class="col-12 q-py-sm">
                  <q-item-label class="q-pa-xs">Mahsulotning Brend haqida ixtiyoriy*</q-item-label>
                  <CreatePost v-model="productStore.product.brend.discription.ru"
                    @uploadImage="(img) => productStore.product.brend.discription.ru += img"
                    placeholder="Brend haqida batafsil malumot bo'lsa kiriting (rus tilida)" />
                </div>
  
              </div>
  
              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Keyingisi" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-form>
          </q-step>
  
          <q-step :name="3" title="Boshqa malumotlar" icon="add_comment">
  
            <q-form @submit.prevent="$refs.stepper.next()">
              <div class="row">
  
                <div class="col-12 q-py-sm">
                  <q-checkbox v-model="productStore.product.discount" label="Mahsulotingizga chegirma bersangiz belgilang ixtiyoriy*" />
                  <q-item-label v-if="productStore.product.discount" class="q-pa-sm">Mahsulotda chegirma Foizi belgilang</q-item-label>
                  <q-slider v-if="productStore.product.discount" dense v-model="productStore.product.discount_percent" color="deep-orange" markers :marker-labels="fnMarkerLabel"
                    :min="1" :max="6" class="q-pa-xs" />
                </div>
  
                <div class="col-12 q-py-sm">
                <q-checkbox v-model="productStore.product.property" @update:model-value="productStore.product.properteis = []" label="Xususiyat qo'shasizmi? ixtiyoriy*" />
                <q-item-label v-if="productStore.product.property" class="q-pa-sm">Mahsulot Xususiyatlarini kiriting</q-item-label>
                <DiynamicInput v-if="productStore.product.property" v-model="productStore.product.properteis"/>
              </div>
  
              </div>
            </q-form>
  
            <q-stepper-navigation>
              <q-btn type="submit" @click.prevent="() => {
                if (true) {
                  bannerShow = false;
                  productStore.updateProduct(productStore.product);
                  return $refs.stepper.next()
                }
  
                bannerShow = true;
  
              }" color="primary" label="Saqlash" />
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import MazInputPrice from 'maz-ui/components/MazInputPrice'
  import CreatePost from '../../components/CreatePost.vue';
  import FileUploader from '../../components/FileUploader.vue';
  import { ref, reactive, watchEffect } from 'vue';
  import { useCategoryStore } from "../../stores/category.store";
  import { useProductStore } from "../../stores/product.store";
  import { useShopStore } from "../../stores/shop.store";
  import { useRouter, useRoute } from "vue-router";
  
  const formatted = ref();
  const fnMarkerLabel = val => `${10 * val}%`;
  
  const step = ref(1)
  const router = useRouter();
  const route = useRoute();
  const categoryStore = useCategoryStore();
  categoryStore.getCategories();
  const productStore = useProductStore();
  productStore.getProduct(route.params.id);
  const shopStore = useShopStore();
  shopStore.getShops();
  
  const subCategories = ref([]);
  const childCategories = ref([]);
  const bannerShow = ref(false);
  
  
  const parentCategorySelected = async (e) => {
    productStore.product.subCategory = "";
    productStore.product.childCategory = "";
    subCategories.value = e.children;
  }
  
  
  const subCategorySelected = (e) => {
    productStore.product.childCategory = "";
    childCategories.value = e.children;
  }
  
  
  
  
  </script>
  
  <style lang="scss" scoped></style>
  