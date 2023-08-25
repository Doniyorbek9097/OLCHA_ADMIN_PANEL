<template>
    <q-item bordered class="flex flex-col h-screen justify-center items-center overflow-auto">
        <div class="row">
    
            <div class="col-12 q-pa-md" v-if="userStore.verified">
                    <div class="row gap-y-5 justify-center flex-col items-center">
                        <q-icon name="verified" size="200px" color="green" />
                        <div class="flex flex-col items-center">
                            <h5>Muoffaqqiyatli Ro'yxatdan o'tdingiz!</h5>
                            <p>Tasdiqlash tugmasi bosing </p>
                        </div>
                        <q-btn :to="{name:'Auth'}" color="green" label="Tasdiqlash" icon='verified'/>
                    </div>
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
console.log(route.params)
userStore.Verified(`/users/${route.params.id}/verify/${route.params.token}`);









</script>

<style lang="scss" scoped>

</style>