<template>
    <q-page padding>
            <q-form @submit.prevent="shopStore.updateShop(shopStore.shop)">

                <q-card class="q-pa-md">
                    <q-toolbar>
                        <q-btn flat round dense icon="store" />
                        <q-toolbar-title>
                            Do'kon qo'shish
                        </q-toolbar-title>
                    </q-toolbar>

                    <div class="row">
                        <div class="col-12 q-py-sm">
                            <q-item-label class="q-pl-sm">Do'kon nomi majburiy* </q-item-label>
                            <q-input v-model="shopStore.shop.name" label="Do'kon nomi" lazy-rules
                                :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
                        </div>

                     
                        <div class="col-12 q-py-sm">
                            <q-item-label class="q-px-xs">Do'kon haqida batafsil (o'zbek tilida) ixtiyoriy*</q-item-label>
                            <CreatePost v-model="shopStore.shop.discription.uz" isEmpty="Iltimos maydon to'ldiring"
                                @uploadImage="(img) => shopStore.shop.discription.uz += img"
                                placeholder="Do'kon haqida batafsil (o'zbek tilida)" lazy-rules
                                :rules="[v => !!v || 'required']" />


                        </div>

                        <div class="col-12 q-py-sm">
                            <q-item-label class="q-px-xs">Do'kon haqida batafsil (rus tilida) ixtiyoriy*</q-item-label>
                            <CreatePost v-model="shopStore.shop.discription.ru" isEmpty="Iltimos maydon to'ldiring"
                                @uploadImage="(img) => shopStore.shop.discription.ru += img"
                                placeholder="Do'kon haqida batafsil (rus tilida)" lazy-rules
                                :rules="[v => !!v || 'required']" />
                        </div>


                       
                    </div>

                    <q-btn type="button" color="red" icon="undo" label="Orqaga" @click="$router.back()" />
                    <q-btn type="submit" color="primary" icon-right="save" label="Saqlash" class="q-ml-sm" />
                    
                </q-card>
            </q-form>
    </q-page>
</template>
  
<script setup>
import { ref } from 'vue';
import {useRoute} from "vue-router";
import CreatePost from '../../components/CreatePost.vue';
import FileUploader from '../../components/FileUploader.vue';
import { useShopStore } from "../../stores/shop.store"

const shopStore = useShopStore();
const route = useRoute();
shopStore.getShop(route.params.id);

</script>
  
<style lang="scss" scoped></style>
  