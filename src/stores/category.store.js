import { defineStore } from "pinia";
import { api } from "../api";
import { Notify } from 'quasar';

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    isLoading: false,
    error: "",
    category: { name: {}, image:{}},
    categories: [],
    icons: [
      "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-tv-100-most-used-icons-flaticons-flat-flat-icons.png",
      "https://img.icons8.com/fluency/48/null/iphone13.png",
      "https://img.icons8.com/stickers/100/null/standing-woman.png",
      "https://img.icons8.com/color/48/null/standing-man.png",
      "https://img.icons8.com/fluency/48/null/wedding-dress.png",
      "https://img.icons8.com/fluency/48/null/shoes.png",
      "https://img.icons8.com/fluency/48/null/bag-front-view.png",
      "https://img.icons8.com/fluency/48/null/disconnected.png",
      'https://img.icons8.com/fluency/48/null/shop.png',  
      'https://img.icons8.com/fluency/48/null/mac-client.png',
      'https://img.icons8.com/fluency/48/null/football2.png',
      'https://img.icons8.com/fluency/48/null/cola.png',
      'https://img.icons8.com/fluency/48/null/dead-food.png',
      "https://img.icons8.com/fluency/48/null/doll.png",
      "https://img.icons8.com/fluency/48/null/barbershop.png",
      "https://img.icons8.com/fluency/48/null/trust.png",
      "https://img.icons8.com/fluency/48/null/clothes.png",
      "https://img.icons8.com/fluency/48/null/jewelry.png",
      "https://img.icons8.com/fluency/48/null/dog-walking.png",
      "https://img.icons8.com/fluency/48/null/manager.png",
      "https://img.icons8.com/fluency/48/null/bedroom.png",
      "https://img.icons8.com/fluency/48/null/espresso-cup.png",
      "https://img.icons8.com/flat-round/64/null/tableware.png",
      "https://img.icons8.com/fluency/48/null/book-shelf.png",
      "https://img.icons8.com/fluency/48/null/aipods-pro-max.png",
      "https://img.icons8.com/fluency/48/null/nokia-3310.png",
      "https://img.icons8.com/fluency/48/null/ipad-pro.png",
      "https://img.icons8.com/fluency/48/null/carrot.png",
      "https://img.icons8.com/arcade/64/null/pixar-lamp-2.png"
    ],
  }),

  getters: {
     subCategories: (state) => {
       let result = [];
       for (const category of state.categories) {
            result.push(...category.children);
       }
       return result;
     },

     childCategories: (state) => {
      let subCategories = [];
      for (const parentCategory of state.categories) {
           subCategories.push(...parentCategory.children);
      }
      
      let childCategories = []
      for (const subCategory of subCategories) {
          childCategories.push(...subCategory.children)
      }

      return childCategories;

    },

     
  },

  actions: {
    async getCategories() {
      try {
        this.category = { name: {}, image:{}};
        this.isLoading = true;
        let res = await api.get("/category");
        if (res.error) return (this.error = error.message);
        this.categories = res.data.result;
        console.log(this.categories);
        this.isLoading = false;
        return this.categories;
      } catch (error) {
        this.error = error.message;
      }
    },

    async addCategory(category) {
      try {
        this.isLoading = true;
        const result = await api.post("/category",  {
          parentId:category?.parentId?._id,
          icon:category?.icon,
          image:category?.image,
          name:category.name,
        });

        Notify.create({
          message: 'Muoffaqiyatli yaratildi 🤓',
          color: 'purple',
          position:"top-right"
        })

        this.category = { name: {}, image:{}};
        this.isLoading = false;
        this.$router.back();
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteCategory(id, index) {
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
        const deleted = await api.delete("/category/" + id);
          this.categories.splice(index, 1);
          this.subCategories.splice(index, 1);
          this.childCategories.splice(index, 1);
          Notify.create({
                  message: 'Muoffaqiyatli o\'chirildi 🤓',
                  color: 'red',
                  position:"top-right"
              })
      }

    },

    async updateCategory(category) {
      console.log(category)
      const result = await api.put(`/category/${category._id}`, category);
      Notify.create({
        message: 'Muoffaqiyatli yangilandi 🤓',
        color: 'purple',
        position:"top-right"
      });

      this.$router.back();
      this.category = { name: {}, image:{}};
      this.isLoading = false;
    },


    async getCategory(id) {
        try {
          const result = await api.get(`/category/${id}`);
          this.category = result.data.result;
          console.log(this.category)
        } catch (error) {

        }
    }

    
  },
});

