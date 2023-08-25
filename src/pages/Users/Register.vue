<template>
    <q-item bordered class="flex flex-col h-screen justify-center items-center overflow-auto">
        <div class="row">
            <div class="col-12 col-md-6 q-pa-md" v-show="!$q.screen.xs">
                <q-img style="max-width: 600px; min-width:300px;" src="https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-online-registration-or-sign-up-login-for-account-on-smartphone-app-png-image_4740838.png"></q-img>
            </div>
            <div class="col-12 col-md-6 q-pa-md">
                <q-form @submit.prevent="userStore.Register(userStore.user)">
                    <div class="row gap-y-4">
                        <h3 class=" text-2xl">Ro'yxatdan o'tish</h3>
                        <div class="col-12">
                            <q-item-label class=" text-xs">Ismingiz:</q-item-label>
                            <q-input v-model="userStore.user.firstname" dense outlined type="text" label="Ismingingizni yozing" required/>
                        </div>

                        <div class="col-12">
                            <q-item-label class=" text-xs">Familyangiz:</q-item-label>
                            <q-input v-model="userStore.user.lastname" dense outlined label="Familyangingizni yozing" required/>
                        </div>
                        
                        <div class="col-12">
                            <q-item-label class=" text-xs">Email:</q-item-label>
                            <q-input v-model="userStore.user.email" dense outlined label="Emailingizi yozing" requied/>
                        </div>

                        <div class="col-12">
                            <q-item-label class=" text-xs">Phone:</q-item-label>
                            <q-input type="tel" v-model="userStore.user.phone" dense outlined label="Telefon raqamingizni yozing" required />
                        </div>

                        <div class="col-12">
                            <q-item-label class=" text-xs">Password:</q-item-label>
                            <q-input type="password" v-model="userStore.user.password" dense outlined label="Parol" required />
                        </div>

                        <div class="col-12 flex gap-5 items-baseline">
                            <q-btn type="submit" color="green" label="Ro'yxatdan o'tish" />
                            <router-link :to="{name:'Auth'}">Kirish</router-link>
                        </div>
                        
                    </div>
                </q-form>
            </div>
        </div>
    </q-item>
</template>

<script setup>
import { useUserStore } from "../../stores/user.store";

const userStore = useUserStore();
userStore.user = {};



</script>

<style lang="scss" scoped>

</style>