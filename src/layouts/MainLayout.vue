<template>
  <q-layout view="lHr LPR lfr">
    <q-header show-if-above bordered>
      <q-toolbar :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
        <q-toolbar-title>
          Admin dashboard
        </q-toolbar-title>
        <q-space />
        <div class="row q-gutter-xs items-center no-wrap">
          <light-night></light-night>
          <q-btn round dense flat icon="notifications">
            <q-badge color="red" text-color="white" floating>
              3
            </q-badge>
            <q-menu>
              <q-list style="min-width:100px;">
                <p>yangi Habarlar</p>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round dense flat :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
          <q-avatar @click="rightDrawerOpen = !rightDrawerOpen">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>


  <Sidebar v-model="leftDrawerOpen"/>
  <ProfileAccount v-model="rightDrawerOpen"/>
    

    <q-page-container :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
      <router-view />
    </q-page-container>

    <q-footer show-if-above bordered :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
      <q-toolbar>
        <q-card-section class="col-12 text-center q-pa-xs">
          <q-btn icon="fab fa-github" flat dense></q-btn>
          <q-btn icon="fab fa-facebook" flat dense></q-btn>
          <q-btn icon="fab fa-twitter" flat dense></q-btn>
          <q-btn icon="fab fa-instagram" flat dense></q-btn>
          <br />
          <div class="text-body1">
            © 2023 by created Doniyorbek Ergashev
          </div>
        </q-card-section>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref, watchEffect } from 'vue'
import LightNight from '../components/LightNight.vue';
import ProfileAccount from '../components/ProfileAccount.vue';
import Sidebar from '../components/Sidebar.vue';
const q = useQuasar();
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false)



</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }

  5% {
    transform: scale(1.25);
  }

  20% {
    transform: scale(1);
  }

  30% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.25);
  }

  50% {
    transform: scale(1);
  }

  55% {
    transform: scale(1.25);
  }

  70% {
    transform: scale(1);
  }
}

.q-item-no-link-highlighting:first-child {
  background-color: rgba(0, 0, 0, 0.311);
  color: wheat;
}

.q-item-no-link-highlighting {
  background-color: rgba(0, 0, 0, 0.178);
  color: white;
}
</style>
