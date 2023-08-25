import { defineStore } from "pinia"
import { Notify } from "quasar";
import { api } from "../api";

export const useProductStore = defineStore("productStore", {
  state:() => ({
      products:[],
      product: {
        name: {},
        discription: {},
        brend: {
          discription: {
            uz: "",
            ru: ""
          }
        }
      },
      isLoading:false,
      isError:null
  }),

  getters: {

  },

  actions: {

    // add new Product
    async addProduct(product) {
      try {
        this.isLoading = true;
          const result = await api.post("/product", product);
          this.product = {
            name: {},
            discription: {},
            brend: {
              discription: {
                uz: "",
                ru: ""
              }
            }
          };

          this.$router.back();
          this.isLoading = false;
      } catch (error) {
          console.log(error)
      } 
    },

    // all Products
    async getProducts() {
      try {
        this.isLoading = true;
        this.product = {
          name: {},
          discription: {},
          brend: {
            discription: {
              uz: "",
              ru: ""
            }
          }
        }
        const result = await api.get("/product");
        this.products = result.data.result;
        console.log(this.products)
        this.isLoading = false;
      } catch (error) {
        
      }
    },

    // one Product
    async getProduct(id) {
      try {
        this.isLoading = true;
        const result = await api.get("/product/"+id);
        console.log(result)
        this.product = result.data.result;
        this.isLoading = false;
      } catch (error) {
        console.log(error)  
      }
    },

    // update Product
    async updateProduct(product) {
      try {
        this.isLoading = true;
        const result = await api.put("/product/"+product._id, product);
        if(result.status == 200) {

          this.product = {
            name: {},
            discription: {},
            brend: {
              discription: {
                uz: "",
                ru: ""
              }
            }
          };

          Notify.create({
            message: 'Muoffaqiyatli yangilandi 🤓',
            color: 'purple',
            position:"top-right"
          });
          this.isLoading = false;
          this.$router.back();
         
        }
      } catch (error) {
        console.log(error)
      }
    },

    // delete Product
    async deleteProduct(id, index) {
      try {
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
        this.isLoading = true;
        const result = await api.delete('/product/'+id);
        if(result.status == 200) {
          this.products.splice(index, 1);
          Notify.create({
            message: 'Muoffaqiyatli o\'chirildi 🤓',
            color: 'red',
            position:"top-right"
          })
       }
            this.isLoading = false;
      }

      } catch (error) {
        
      }
    }

  }

});
