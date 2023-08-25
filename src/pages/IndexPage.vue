<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-md-6">
        <q-card class="my-card">
          <q-carousel v-model="slide" swipeable animated thumbnails infinite>
            <q-carousel-slide v-for="item, index in carouselStore.carouseles" :name="index" :img-src="item.image.uz">
            </q-carousel-slide>
          </q-carousel>
        </q-card>
      </div>
      </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useCarouselStore } from "../stores/carousel.store";

const carouselStore = useCarouselStore();

carouselStore.getCarousel()
const slide = ref(0);


</script>
