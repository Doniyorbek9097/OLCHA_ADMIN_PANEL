<template>
  <q-page padding>
    <q-inner-loading class="h-screen" :showing="true" v-if="categoryStore.isLoading">
      <q-spinner-gears size="50px" class=" -translate-y-16" />
    </q-inner-loading>
    <q-form v-else @submit.prevent="categoryStore.updateCategory(categoryStore.category)" enctype="multipart/form-data">
      <q-card class="row">
        <q-toolbar>
          <q-btn flat round dense icon="category" />
          <q-toolbar-title>
            SubCategory Taxrirlash
          </q-toolbar-title>
        </q-toolbar>
        <div class="col-12">
          <q-input v-model="categoryStore.category.name.uz" outlined dense class="q-pa-sm" label="Title (o'zbek tilida)"
            required></q-input>
          <q-input v-model="categoryStore.category.name.ru" outlined dense class="q-pa-sm" label="Title (rus tilida)"
            required></q-input>
        </div>

        

        <div class="col-12 q-pa-md">
          <q-btn type="submit" color="primary col-6 q-ma-sm" icon="save" label="Saqlash"
            :loading="categoryStore.isLoading" />
          <q-btn type="reset" color="primary col-6 q-ma-sm" icon="delete_forever" label="Tozalash"
            @click="categoryStore.category = { name: {}, image: {} }" />
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
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();

categoryStore.getCategories();
categoryStore.getCategory(route.params.id);

</script>

<style lang="scss" scoped></style>
