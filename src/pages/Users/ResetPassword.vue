<template>
    <q-item bordered class="flex flex-col h-screen justify-center items-center overflow-auto">
        <div class="row">
            <div class="col-12 col-md-6 q-pa-md">
                <q-img style="max-width: 600px; min-width:300px;" src="https://t3.ftcdn.net/jpg/05/21/81/30/360_F_521813066_NjLz2BhOa5LS69RxgeOAzCxstXMikJtP.jpg"></q-img>
            </div>
            <div class="col-12 col-md-6 q-pa-md">
                <q-form @submit.prevent="userStore.ResetPassword('/reset-password', userStore.user)">
                    <div class="row gap-y-4">
                        <h3 class=" text-2xl">Parolni tiklash</h3>
                       
                        <div class="col-12">
                            <q-item-label class=" text-xs">Email:</q-item-label>
                            <q-input v-model="userStore.user.email" dense outlined type="text" label="Emailingizi yozing" required/>
                        </div>

                        <div class="col-12 flex gap-5 items-baseline">
                            <q-btn type="submit" color="green" label="Parolni tiklash"  />
                            <router-link :to="{name:'Register'}">Ro'yxatdan o'tish</router-link>
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