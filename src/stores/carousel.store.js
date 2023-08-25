import { defineStore } from "pinia"
import { api } from "../api"
import { Notify } from 'quasar';

export const useCarouselStore = defineStore('carouselStore', {
    state: () => ({
        carouseles: [],
        carousel: {
            image: {},
            url: ""
        },
        isLoading: false,
        isError: ""
    }),

    getters: {

    },

    actions: {
        async addCarousel(carousel) {
            try {
                this.isLoading = true;
                const result = await api.post("/carousel", carousel);
                console.log(result)
                this.isLoading = false;
                this.$router.back();
            } catch (error) {
                console.log(error)
            }
        },

        async getCarousel() {
            try {
                this.isLoading = true;
                const result = await api.get("/carousel")
                console.log(result)
                this.carouseles = result.data.result;
                this.isLoading = false;
            } catch (error) {

            }
        },


        async deleteCarousel(id, index) {
            console.log(id, index)
            Notify.create({
                message: `Rostdan ham o'chirilsinmi ?`,
                color: 'primary',
                position: "center",
                actions: [
                    { label: 'O\'ochirish', color: 'red', handler: async () => Deleted() },
                    { label: 'Bekor qilish', color: 'white', handler: () => false }
                ]
            });

            const Deleted = async () => {
                try {
                    const result = await api.delete("/carousel/" + id);
                    this.carouseles.splice(index, 1);
                    Notify.create({
                        message: 'Muoffaqiyatli o\'chirildi 🤓',
                        color: 'red',
                        position: "top-right"
                    })
                } catch (error) {
                    console.log(error)
                }
            }


        }


    }




});