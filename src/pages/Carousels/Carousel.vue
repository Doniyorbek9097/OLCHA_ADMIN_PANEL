<template>
    <q-inner-loading :showing="true" v-if="carouselStore.isLoading">
        <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <q-page class="q-pa-sm" v-else>
        <q-card>
            <q-table :loading="carouselStore.isLoading" :grid="grid" :filter="filter" flat bordered title="Categori"
                :rows="carouselStore.carouseles" :columns="columns" virtual-scroll v-model:pagination="pagination">
                <template #top>
                    <q-toolbar style="padding:0 !important;">
                        <q-btn flat round dense icon="category" />
                        <q-toolbar-title>
                            Carousellar
                        </q-toolbar-title>
                        <q-space />
                        <q-btn flat round dense :icon="grid ? 'apps' : 'list'" class="q-mr-xs" @click="changeLayout" />
                        <q-btn flat round dense icon="add" class="q-mr-xs" :to="{ name: 'AddCarousel' }" />

                    </q-toolbar>
                    <q-toolbar>
                        <q-space />
                        <q-input v-model="filter" dense outlined placeholder="Slug nomi bo'yicha qidirish"
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
                        <q-img :src="props.row.image.uz" draggable></q-img>
                    </q-td>
                </template>

                <template #body-cell-slug="props">
                    <q-td :props="props">
                        /{{ props.row.slug }}
                    </q-td>
                </template>

                <template v-if="grid" #item="props">
                    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
                        <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
                            <q-img :src="props.row.image.ru" />

                            <q-card-section>
                                <div class="text-subtitle2">
                                    URL: /{{ props.row.slug }}
                                </div>
                            </q-card-section>

                            <q-card-actions align="right">
                               <q-btn size="sm" flat icon="delete" color="red" @click="carouselStore.deleteCarousel(props.row._id, carouselStore.carouseles.indexOf(props.row))" />
                            </q-card-actions>

                        </q-card>

                    </div>
                </template>

                <template #body-cell-action="props">
                    <q-td :props="props">
                        <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
                            @click="carouselStore.deleteCarousel(props.row._id, carouselStore.carouseles.indexOf(props.row))" />
                    </q-td>
                </template>
            </q-table>
        </q-card>

    </q-page>
</template>
  
<script setup>
import { ref, watchEffect } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router";
import { useCarouselStore } from "../../stores/carousel.store";
const $q = useQuasar()
const router = useRouter();

const carouselStore = useCarouselStore();
carouselStore.getCarousel();

const filter = ref("");
const pagination = ref({ rowsPerPage: 100 })
const grid = ref(JSON.parse(localStorage.isGrid));

const changeLayout = () => {
    grid.value = !grid.value;
    localStorage.isGrid = grid.value;
}




const columns = [
    { name: 'index', label: '#', field: 'index' },

    {
        name: 'image',
        field: "image",
        label: 'Image',
        align: 'center',
        required: true
    },


    {
        name: 'slug',
        field: "slug",
        label: 'URL',
        align: 'center',
        required: true
    },


    { name: 'action', label: 'Action', align: "center", field: 'action' },

]



</script>
  
<style lang="scss" scoped></style>
  