<template>
  <q-page padding>

    <q-form @submit.prevent="categoryStore.updateCategory(categoryStore.category)" enctype="multipart/form-data">
      <q-inner-loading class="h-screen" :showing="true" v-if="categoryStore.isLoading">
       <q-spinner-gears size="50px" class=" -translate-y-16"/>
      </q-inner-loading> 
        <q-card v-else class="row">
            <q-toolbar>
              <q-btn flat round dense icon="category" />
              <q-toolbar-title>
                Category Tahrirlash
              </q-toolbar-title>
            </q-toolbar>
            <div class="col-12 q-py-sm">
          <q-item-label class="q-pl-sm">Category nomi o'zbek tilida</q-item-label>
          <q-input lazy-rules :rules="[v => !!v || 'required']" v-model="categoryStore.category.name.uz" outlined dense
            class="q-pa-sm" label="Title (o'zbek tilida)" required></q-input>
        </div>

        <div class="col-12 q-py-sm">
          <q-item-label class="q-pl-sm">Category nomi rus tilida</q-item-label>
          <q-input lazy-rules :rules="[v => !!v || 'required']" v-model="categoryStore.category.name.ru" outlined dense
            class="q-pa-sm" label="Title (rus tilida)" required></q-input>
        </div>

        <div class="col-12 q-py-sm">
          <q-item-label class="q-pl-sm">Category ikonkasi</q-item-label>
          <q-select behavior="dialog" lazy-rules :rules="[v => !!v || 'required']" outlined dense
            v-model="categoryStore.category.icon" :options="categoryStore.icons" color="teal" clearable
            label="Category ga ikonka" options-selected-class="text-deep-orange" class="q-pa-sm">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img width="38px" :src="scope.opt"></q-img>
                </q-item-section>
              </q-item>
            </template>
            <template #selected-item="props">
              <q-img width="28px" :src="props.opt"></q-img>
            </template>
          </q-select>
            
        </div>

        <div class="col-12 q-py-sm">
          <q-item-label class="q-pl-sm">Categoryga xos rasm qo'ying</q-item-label>
          <file-uploader v-model="categoryStore.category.image.url" required :placeholder="'Category rasmini yuklang'" />
        </div>


            <div class="col-12">
              <q-btn type="submit" color="primary col-6 q-ma-sm" icon="update" label="Yangilash"/>
              <q-btn type="reset" color="primary col-6 q-ma-sm" icon="delete_forever" label="Tozalash"  @click="categoryStore.category = {name:{}}"/>
              <q-btn type="button" color="primary col-6 q-ma-sm" icon="arrow_back" label="Orqaga" @click="backButton"/>

            </div>

          </q-card>

        </q-form>

  </q-page>
</template>

<script setup>
import FileUploader from '../../components/FileUploader.vue';
import {useCategoryStore} from "../../stores/category.store";
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
const categoryStore = useCategoryStore();
categoryStore.getCategory(route.params.id);
categoryStore.getCategories();


const backButton = () => {
  router.back()
  categoryStore.category = {name:{}, image:{}};
}
 

</script>



<style lang="scss" scoped>


</style>
