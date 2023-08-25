<template>
  <q-page class="q-pa-sm">
    <q-inner-loading class="h-screen" :showing="true" v-if="productStore.isLoading">
       <q-spinner-gears size="50px" class=" -translate-y-16"/>
      </q-inner-loading>
    <q-card v-else>
      <q-table :grid="grid" :filter="filter" flat bordered title="Products" :rows="productStore.products"
        :columns="columns" virtual-scroll v-model:pagination="pagination">
        <template #top>
          <q-toolbar style="padding:0 !important;">
            <q-btn flat round dense icon="category" />
            <q-toolbar-title>
               Products
            </q-toolbar-title>
            <q-space />
            <gird-list v-model="grid"/>
            <q-btn flat round dense icon="add" class="q-mr-xs" :to="{name:'AddProduct'}" />

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
            <q-img :src="props.row.mainImage" draggable width="50px"></q-img>
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
              :to="{ name: 'EditProduct', params: { id: props.row._id } }" />

            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
            @click="productStore.deleteProduct(props.row._id, productStore.products.indexOf(props.row))" />

            </q-td>
        </template>

       <template v-if="grid" #item="props">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
            <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700':'hover:bg-gray-100'">
              <q-img :src="props.row.mainImage" style="max-height: 200px;">
              <q-badge v-if="props.row?.discount" color="red" rounded floating :label="props.row?.discount_percent+'0% Chegirma'" />
              </q-img>

              <q-card-section>
                <div class="text-subtitle1">
                O'zbekcha: <q-icon size="20px" :name="props.row?.icon" /> {{ props.row.name.uz }} <br>
                Ruscha: <q-icon size="20px" :name="props.row?.icon" /> {{ props.row.name.ru }} <br>

                </div>
                <div class="text-subtitle2">
                 Slug:  /{{ props.row.slug }}
                </div>
              </q-card-section>

              <q-card-section>
                <div class="text-bold">
                Narxi:  ${{ props.row.price  }}
                </div>
              </q-card-section>

              <q-card-actions align="right">
                 <q-btn icon="edit" size="sm" flat dense color="blue"
              :to="{ name: 'EditProduct', params: { id: props.row._id } }" />
              <q-btn size="sm" flat icon="delete" color="red"
                @click="productStore.deleteProduct(props.row._id, productStore.products.indexOf(props.row))" />
            </q-card-actions>

            </q-card>

          </div>
        </template>

      </q-table>
    </q-card> <!-- GRID TEMPLATE -->
        

  </q-page>
</template>

<script setup>
import { ref } from "vue"
import { useCategoryStore } from "../../stores/category.store";
import { useProductStore } from "../../stores/product.store"
import GirdList from "../../components/GirdList.vue";
const categoryStore = useCategoryStore();
const productStore = useProductStore();
productStore.getProducts();


const filter = ref("");
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
    label: 'Nomi',
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

]






</script>

<style lang="scss" scoped></style>
