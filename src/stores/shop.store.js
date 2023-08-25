import { defineStore } from "pinia"
import {api} from "../api"
import { Notify } from 'quasar';

export const useShopStore = defineStore("shopStore", {
    state: () => ({
        shop: {
            discription:{},
        },

        shops: []
    }),

    actions: {
        async addShop(shop) {
            try {
            shop.owner = localStorage?.user?._id || "644fc1b1caf2acf57af3e630"
                const result = await api.post("/shop", shop);
            this.$router.back();
            } catch (error) {
                console.log(error)                
            }
        },

        async getShops() {
            try {
                const result = await api.get("/shop");
                this.shops = result.data.result;
            } catch (error) {
                console.log(error)
            }
        },


        async getShop(id) {
            try {
                const result = await api.get("/shop/"+id);
                this.shop = result.data.result;
            } catch (error) {
                console.log(error)                
            }
        },


        async updateShop(shop) {
            try {
                const result = await api.put("/shop/"+shop._id, shop);
                this.$router.back();
            } catch (error) {
                console.log(error)
            }
        },


        async deleteShop(id, index) {
            Notify.create({
             message: `Rostdan ham o'chirilsinmi ?`,
             color: 'primary',
             position:"center",
             actions: [
               { label: 'O\'ochirish', color: 'red', handler: async () => Deleted()},
               { label: 'Bekor qilish', color: 'white', handler: () => false }
             ]
           });
     
         const Deleted = async() => {
             const deleted = await api.delete("/shop/" + id);
               this.shops.splice(index, 1);
               Notify.create({
                       message: 'Muoffaqiyatli o\'chirildi 🤓',
                       color: 'red',
                       position:"top-right"
                   })
           }
     
         },
    }

})