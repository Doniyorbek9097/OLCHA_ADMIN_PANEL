<template>
    <q-page padding>
      <q-form @submit.prevent="carouselStore.addCarousel(carouselStore.carousel)" enctype="multipart/form-data">
        <q-card class="row">
          <q-toolbar>
            <q-btn flat round dense icon="category" />
            <q-toolbar-title>
              Carousel qo'shish
            </q-toolbar-title>
          </q-toolbar>
          <div class="col-12 q-px-sm">
            <q-item-label  class="q-pl-sm">Carousel (o'zbek tilida) majburiy* </q-item-label>
            <file-uploader 
            v-model="carouselStore.carousel.image.uz" 
            required 
            :placeholder="'Category rasmini yuklang'"
            :width="1106"
            :height="382"
            />
          </div>

          <div class="col-12 q-px-sm">
            <q-item-label  class="q-pl-sm">Carousel (rus tilida) majburiy* </q-item-label>
            <file-uploader 
            v-model="carouselStore.carousel.image.ru" 
            required 
            :placeholder="'Category rasmini yuklang'" 
            :width="1106"
            :height="382"
            />
          </div>

  
          <div class="col-12 q-px-sm">
            <q-item-label  class="q-pl-sm">Carousel Manzili URL majburiy* </q-item-label>
            <q-input required v-model="carouselStore.carousel.slug" outlined dense></q-input>
          </div>
  
          <div class="col-12 q-pa-md">
            <q-btn type="submit" color="primary col-6 q-ma-sm" icon="save" label="Saqlash"
              :loading="carouselStore.isLoading" />
            <q-btn type="reset" color="primary col-6 q-ma-sm" icon="delete_forever" label="Tozalash"
              @click="carouselStore.category = { name: {} }" />
            <q-btn type="button" color="primary col-6 q-ma-sm" icon="arrow_back" label="Orqaga" @click="router.back()" />
          </div>
  
        </q-card>
  
      </q-form>
  
    </q-page>
  </template>
  
  <script setup>
  import FileUploader from '../../components/FileUploader.vue';
  import { ref } from 'vue';
import { useCarouselStore } from "../../stores/carousel.store"
  import { useRouter } from "vue-router";
  const router = useRouter()
  const carouselStore = useCarouselStore();
  
  </script>
  
  <style lang="scss" scoped></style>
  