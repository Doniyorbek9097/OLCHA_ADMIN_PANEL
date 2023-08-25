<template>
  <q-page class="q-pa-sm">
    <q-inner-loading class="h-screen" :showing="true" v-if="categoryStore.isLoading">
      <q-spinner-gears size="50px" class=" -translate-y-16" />
    </q-inner-loading>
    <div v-else class="row">
      <div class="q-pa-xs col-12">
        <q-card>
          <q-table :filter="search" :grid="grid" flat bordered title="Sub Categories" :rows="categoryStore.subCategories"
            :columns="columns" row-key="index" virtual-scroll v-model:pagination="pagination"
            :rows-per-page-options="[0]">
            <template #top="props">
              <q-toolbar style="padding:0 !important;">
                <q-btn flat round dense icon="category" />
                <q-toolbar-title>
                  Sub Category
                </q-toolbar-title>
                <q-space />
                <q-btn flat round dense :icon="grid ? 'apps' : 'list'" class="q-mr-xs" @click="grid = !grid" />
                <q-btn flat round dense icon="add" :to="{ name: 'AddSubCategory' }" />
              </q-toolbar>
              <q-toolbar>
                <q-space />
                <q-input v-model="search" dense outlined placeholder="Search"
                  :class="$q.screen.lt.sm ? 'full-width' : 'w-50'">
                  <template #append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-space />
              </q-toolbar>
            </template>


            <template #body-cell-image="props">
              <q-td :props="props">
                <q-img :src="props.row.image.url" draggable></q-img>
              </q-td>
            </template>

            <template #body-cell-icon="props">
              <q-td :props="props">
                <q-icon :name="props.row.icon" size="20px"></q-icon>
              </q-td>
            </template>

            <template #body-cell-name="props">
              <q-td :props="props">
                {{ props.row.name.uz }} | {{ props.row.name.ru }}
              </q-td>
            </template>

            <template #body-cell-slug="props">
              <q-td :props="props">
                /{{ props.row.slug }}
              </q-td>
            </template>

            <template #body-cell-action="props">
              <q-td :props="props">
                <q-btn icon="edit" size="sm" flat dense color="blue"
                  :to="{ name: 'EditSubCategory', params: { id: props.row._id } }" />
                <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
                  @click="categoryStore.deleteCategory(props.row._id, categoryStore.subCategories.indexOf(props.row))" />
              </q-td>
            </template>

            <template v-if="grid" #item="props">
              <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
                <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
                  <q-img :src="props.row.image.url" />

                  <q-card-section>
                    <div class="text-subtitle1">
                      O'zbekcha: <q-icon size="20px" :name="props.row?.icon" /> {{ props.row.name.uz }} <br>
                      Ruscha: <q-icon size="20px" :name="props.row?.icon" /> {{ props.row.name.ru }} <br>

                    </div>
                    <div class="text-subtitle2">
                      Slug: /{{ props.row.slug }}
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn icon="edit" size="sm" flat dense color="blue"
                      :to="{ name: 'EditSubCategory', params: { id: props.row._id } }" />
                    <q-btn size="sm" flat icon="delete" color="red"
                      @click="categoryStore.deleteCategory(props.row._id, categoryStore.subCategories.indexOf(props.row))" />
                  </q-card-actions>

                </q-card>

              </div>
            </template>

          </q-table>
        </q-card>
      </div>


    </div>

  </q-page>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import { useCategoryStore } from "../../stores/category.store";
import { useQuasar } from "quasar";
const categoryStore = useCategoryStore();
categoryStore.getCategories();

const $q = useQuasar();
const search = ref("");
const pagination = ref({ rowsPerPage: 100 })
const grid = ref(JSON.parse(localStorage.isGrid));


const columns = [

  {
    name: 'image',
    field: "image",
    label: 'Image',
    align: 'center',
    required: true
  },

  {
    name: 'name',
    label: 'Categories',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,
    required: true
  },

  {
    name: 'slug',
    field: "slug",
    label: 'Slug',
    align: 'center',
    required: true
  },


  { name: 'action', label: 'Action', align: "center", field: 'action' },

];






</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
