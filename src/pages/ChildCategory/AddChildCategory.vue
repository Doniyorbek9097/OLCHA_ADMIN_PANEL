<template>
    <q-inner-loading :showing="categoryStore.isLoading">
        <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    
    <q-page padding v-if="!categoryStore.isLoading">
      <q-form @submit.prevent="categoryStore.addCategory(categoryStore.category)" enctype="multipart/form-data">
        <q-card class="row">
          <q-toolbar>
            <q-btn flat round dense icon="category" />
            <q-toolbar-title>
              Child Category qo'shish
            </q-toolbar-title>
          </q-toolbar>
          <div class="col-12">
            <q-input v-model="categoryStore.category.name.uz" outlined dense class="q-pa-sm" label="Title (o'zbek tilida)"
              required></q-input>
            <q-input v-model="categoryStore.category.name.ru" outlined dense class="q-pa-sm" label="Title (rus tilida)"
              required></q-input>
          </div>
  
          <div class="col-12">
            <q-select outlined dense v-model="categoryStore.category.parentId" :options="categoryStore.subCategories"
                  emit-value map-options clearable label="Categoryni otasi" options-selected-class="text-deep-orange" class="q-pa-sm">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      {{ scope.opt.name.uz }}
                      <br>
                      {{ scope.opt.name.ru }}
                    </q-item>
                  </template>
                  <template #selected-item="props">
                    <q-item v-bind="props">
                        {{ props.opt.name.uz}}
                        <br>
                        {{ props.opt.name.ru}}
                    </q-item>
                  </template>
                </q-select>
          </div>
          <div class="col-12 q-pa-md">
            <q-btn type="submit" color="primary col-6 q-ma-sm" icon="save" label="Saqlash"
              :loading="categoryStore.isLoading" />
            <q-btn type="reset" color="primary col-6 q-ma-sm" icon="delete_forever" label="Tozalash"
              @click="categoryStore.category = { name: {}, image:{}}" />
            <q-btn type="button" color="primary col-6 q-ma-sm" icon="arrow_back" label="Orqaga" @click="router.back()" />
          </div>
  
        </q-card>
  
      </q-form>
  
    </q-page>
  </template>
  
  <script setup>
  import FileUploader from '../../components/FileUploader.vue';
  import { ref } from 'vue';
  import { useCategoryStore } from "../../stores/category.store";
  import { useRouter } from "vue-router";
  const router = useRouter()
  const categoryStore = useCategoryStore();
  categoryStore.getCategories();
  
  
  </script>
  
  <style lang="scss" scoped></style>
  