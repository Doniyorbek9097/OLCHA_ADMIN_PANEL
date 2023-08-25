<template>
    <q-item bordered class="flex flex-col h-screen justify-center items-center overflow-auto">
        <div class="row">
            <div class="col-12 q-pa-md" v-if="userStore.verified">
                <q-form @submit.prevent="userStore.ResetPassword(`/reset-password/${route.params.id}/${route.params.token}`, userStore.user)">
                    <div class="row gap-y-4">
                        <h3 class=" text-2xl">Parolni tiklash</h3>
                       
                        <div class="col-12">
                            <q-item-label class=" text-xs">Yangi parolingiz:</q-item-label>
                            <q-input v-model="userStore.user.password" dense outlined type="text" label="Parolingizni yozing" required/>
                        </div>

                        <div class="col-12 flex gap-5 items-baseline">
                            <q-btn type="submit" color="green" label="Saqlash"  />
                            <router-link :to="{name:'Register'}">Ro'yxatdan o'tish</router-link>
                        </div>

                    </div>
                </q-form>
            </div>

            <!-- User not found -->
            <div class="col-12 q-pa-md" v-else>
                    <div class="row gap-y-5 justify-center flex-col items-center">
                        <q-icon name="report" size="200px" color="red" />
                        <div class="flex flex-col items-center">
                            <h5>Afsusdamiz negadir muoffaqqiyatsizlikga uchradingiz !</h5>
                            <p>Hammasini boshidan boshlashingiz kerak!</p>
                        </div>
                        <q-btn :to="{name:'Auth'}" color="green" label="Orqaga qaytish" icon='arrow_left'/>
                    </div>
            </div>

        </div>
    </q-item>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user.store";
import { useRoute } from "vue-router";
const route = useRoute()
const userStore = useUserStore();

userStore.Verified(`/reset-password/${route.params.id}/${route.params.token}`);









</script>

<style lang="scss" scoped>

</style>