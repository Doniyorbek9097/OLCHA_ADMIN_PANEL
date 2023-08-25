<template>
   <q-inner-loading class="h-screen" :showing="true" v-if="categoryStore.isLoading">
      <q-spinner-gears size="50px" class=" -translate-y-16" />
    </q-inner-loading>
  <q-page v-else padding v-if="!categoryStore.isLoading">
    <q-form @submit.prevent="categoryStore.addCategory(categoryStore.category)" enctype="multipart/form-data">
      <q-card class="row">
        <q-toolbar>
          <q-btn flat round dense icon="category" />
          <q-toolbar-title>
            SubCategory qo'shish
          </q-toolbar-title>
        </q-toolbar>
        <div class="col-12">
          <q-input v-model="categoryStore.category.name.uz" outlined dense class="q-pa-sm" label="Title (o'zbek tilida)"
            required lazy-rules :rules="[ v => !!v || 'required']"></q-input>
          <q-input v-model="categoryStore.category.name.ru" outlined dense class="q-pa-sm" label="Title (rus tilida)"
            required lazy-rules :rules="[ v => !!v || 'required']"></q-input>
        </div>

        <div class="col-12">
          <q-select behavior="dialog" lazy-rules :rules="[ v => !!v || 'required']" outlined dense v-model="categoryStore.category.parentId" :options="categoryStore.categories"
                emit-value map-options label="Categoryni otasi" options-selected-class="text-deep-orange" class="q-pa-sm">
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-img :src="scope.opt.icon" width="25px" height="38px" class="q-pa-md q-ma-sm"></q-img>
                    {{ scope.opt.name?.uz }}
                    <br>
                    {{ scope.opt.name?.ru }}
                  </q-item>
                </template>
                <template #selected-item="props">
                  <q-item v-bind="props">
                    <q-img :src="props.opt.icon" width="25px" height="38px" class="q-pa-md q-ma-sm"></q-img>
                      {{ props.opt.name?.uz}}
                      <br>
                      {{ props.opt.name?.ru}}
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
