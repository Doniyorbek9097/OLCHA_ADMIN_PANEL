<template>
 
<q-page class="q-pa-sm">
    <q-card>
      <q-inner-loading class="h-screen" :showing="true" v-if="categoryStore.isLoading">
       <q-spinner-gears size="50px" class=" -translate-y-16"/>
      </q-inner-loading>

      <q-table v-else :grid="grid"  :filter="filter" flat bordered title="Categori" :rows="categoryStore.categories"
        :columns="columns" virtual-scroll v-model:pagination="pagination">
        <template #top>
          <q-toolbar style="padding:0 !important;">
            <q-btn flat round dense icon="category" />
            <q-toolbar-title>
              Categories
            </q-toolbar-title>
            <q-space />
            <q-btn flat round dense :icon="grid ? 'apps' : 'list'" class="q-mr-xs" @click="changeLayout" />
            <q-btn flat round dense icon="add" class="q-mr-xs" :to="{ name: 'category-add' }" />

          </q-toolbar>
          <q-toolbar>
            <q-space />
            <q-input v-model="filter" dense outlined placeholder="Slug nomi bo'yicha qidirish" :class="$q.screen.lt.sm ? 'full-width' : 'w-50'">
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
            <q-img :src="props.row.icon" width="20px"/>
          </q-td>
        </template>

        <template #body-cell-name="props">
          <q-td :props="props">
            {{ props.row.name.uz }} | {{ props.row.name.ru }}
          </q-td>
        </template>

        <template v-if="grid" #item="props">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
            <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700':'hover:bg-gray-100'">
              <q-img :src="props.row.image.url"/>

              <q-card-section>
                <div class="text-subtitle1">
                O'zbekcha: <q-img width="20px" :src="props.row?.icon" /> {{ props.row.name.uz }} <br>
                Ruscha: <q-img width="20px" :src="props.row?.icon" /> {{ props.row.name.ru }} <br>
                </div>
                
              </q-card-section>

              <q-card-actions align="right">
                <q-btn icon="edit" size="sm" flat dense color="blue"
              :to="{ name: 'category-edit', params: { id: props.row._id } }" />
              <q-btn size="sm" flat icon="delete" color="red"
                @click="categoryStore.deleteCategory(props.row._id, categoryStore.categories.indexOf(props.row))" />
            </q-card-actions>

            </q-card>

          </div>
        </template>

        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense color="blue"
              :to="{ name: 'category-edit', params: { id: props.row._id } }" />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
              @click="categoryStore.deleteCategory(props.row._id, categoryStore.categories.indexOf(props.row))" />
          </q-td>
        </template>
      </q-table>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, watchEffect} from "vue"
import {useQuasar} from "quasar"
import { useRouter } from "vue-router";
import { useCategoryStore } from "../../stores/category.store";
const $q = useQuasar()
const router = useRouter();

const categoryStore = useCategoryStore();
categoryStore.getCategories()

const filter = ref("");
const pagination = ref({ rowsPerPage: 100 })
const grid = ref(JSON.parse(localStorage.isGrid));

const changeLayout = () => {
   grid.value = !grid.value;
   localStorage.isGrid = grid.value;
}




const columns = [

  {
    name: 'image',
    field: "image",
    label: 'Image',
    align: 'center',
    required: true
  },

  {
    name: 'icon',
    field: "icon",
    label: 'Icon',
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



  { name: 'action', label: 'Action', align: "center", field: 'action' },

]



</script>

<style lang="scss" scoped></style>
