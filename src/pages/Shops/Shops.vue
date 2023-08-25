<template>
    <q-page class="q-pa-sm">
      <!-- <div v-if="categoryStore.isLoading">LOADING>>></div> -->
      <q-card>
        <q-table :grid="grid" :filter="filter" flat bordered title="Shops" :rows="shopStore.shops"
          :columns="columns" virtual-scroll v-model:pagination="pagination">
          <template #top>
            <q-toolbar style="padding:0 !important;">
              <q-btn flat round dense icon="category" />
              <q-toolbar-title>
                 Do'konlar
              </q-toolbar-title>
              <q-space />
              <gird-list v-model="grid"/>
              <q-btn flat round dense icon="add" class="q-mr-xs" :to="{name:'AddShop'}" />
  
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
              <q-img :src="props.row.image" draggable width="50px"></q-img>
            </q-td>
          </template>
  
  
          <template #body-cell-name="props">
            <q-td :props="props">
              {{ props.row.name }} 
            </q-td>
          </template>
  
          <template #body-cell-slug="props">
            <q-td :props="props">
              /{{ props.row.slug }}
            </q-td>
          </template>

          <template #body-cell-owner="props">
            <q-td :props="props">
              {{ props.row.owner?.firstname }} {{ props.row.owner?.lastname }}
            </q-td>
          </template>
  
          <template #body-cell-action="props">
            <q-td :props="props">
              <q-btn icon="edit" size="sm" flat dense color="blue"
                :to="{ name: 'EditShop', params: { id: props.row._id } }" />
  
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
                @click="shopStore.deleteShop(props.row._id, shopStore.shops.indexOf(props.row))" />
  
              </q-td>
          </template>
  
          <!-- GRID TEMPLATE -->
          <template v-if="grid" #item="props">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
              <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700':'hover:bg-gray-100'">
                <q-img :src="props.row.image" style="max-height: 200px;"/>
  
                <q-card-section>
                    <div class="text-subtitle1">
                   Nomi: {{ props.row.name }}
                  </div>

                  <div class="text-subtitle2">
                   URL: /{{ props.row.slug }}
                  </div>

                  <div class="text-subtitle2">
                   Egasi: {{ props.row.owner?.firstname }} {{ props.row.owner?.lastname }}
                  </div>
                </q-card-section>
  
             <q-card-actions align="right">
                <q-btn icon="edit" size="sm" flat dense color="blue"
                :to="{ name: 'EditShop', params: { id: props.row._id } }" />
                <q-btn size="sm" flat icon="delete" color="red"
                  @click="shopStore.deleteShop(props.row._id, shopStore.shops.indexOf(props.row))" />
              </q-card-actions>
  
              </q-card>
  
            </div>
          </template>
  
        </q-table>
      </q-card>
  
    </q-page>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import GirdList from "../../components/GirdList.vue";
import { useShopStore } from "../../stores/shop.store";
  
  const shopStore = useShopStore();
  shopStore.getShops()

  
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
      label: 'URL',
      align: 'center',
      required: true
    },

    {
      name: 'owner',
      field: "owner",
      label: 'Egasi',
      align: 'center',
      required: true
    },
  
  
    { name: 'action', label: 'Action', align: "center", field: 'action' },
  
  ]
  
  
  
  
  
  
  </script>
  
  <style lang="scss" scoped></style>
