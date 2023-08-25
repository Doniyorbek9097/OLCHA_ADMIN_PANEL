import { defineStore } from "pinia"
import { api } from "../api"
import { Cookies, Notify } from 'quasar';

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {},
        users: [],
        verified:false,
        isLoading: false
    }),

    actions: {
        async Register(user) {
            try {
                this.isLoading = true;
                const result = await api.post("/register", user);
                this.isLoading = false;
                this.user = {};
                Notify.create({
                    message: result.data.message || "Avval formani to'ldiring",
                    color: 'green',
                    position:"top-right"
                  });

                  this.$router.push({name:"Categories"});
            } catch (error) {
             Notify.create({
                message: error.response.data,
                color: 'red',
                position:"top-right"
              });
            }
        },


        async Login(user) {
            try {
                this.isLoading = true;
                const result = await api.post("/auth", user);
                localStorage.user = JSON.stringify(result.data.user);
                
                this.isLoading = false;
                this.user = {};
                Notify.create({
                    message: result.data.message || "Avval formani to'ldiring",
                    color: 'green',
                    position:"top-right"
                  });

                window.location.reload();
            } catch (error) {
             Notify.create({
                message: error.response.data,
                color: 'red',
                position:"top-right"
              });
            }
        },


        async Verified(url) {
            try {
                const result = await api.get(url);
                this.verified = true;
                Notify.create({
                    message: result.data.message || "",
                    color: 'green',
                    position:"top-right"
                  });

            } catch (error) {
                this.verified =false;
                Notify.create({
                    message: error.response.data,
                    color: 'red',
                    position:"top-right"
                  });
            }
        },


        async ResetPassword(url, data) {
            try {
                console.log(data)
                this.isLoading = true;
                const result = await api.post(url, data);
                this.isLoading = false;
                this.user = {};
                Notify.create({
                    message: result.data.message || "Avval formani to'ldiring",
                    color: 'green',
                    position:"top-right"
                  });
                this.$router.push({name:"Auth"});
            } catch (error) {
                Notify.create({
                    message: error.response.data,
                    color: 'red',
                    position:"top-right"
                  });
            }
        },


        async checkOut() {
            localStorage.removeItem("user");
            window.location.reload();
        },

        async getUser(url) {
            try {
                this.isLoading = true;
                const result = await api.get(url);
                this.user = result.data;
                this.isLoading = false;
            } catch (error) {
                Notify.create({
                    message: error.response.data,
                    color: 'red',
                    position:"top-right"
                  });
            }
        },


        async updateUser(url, data) {
            try {
                this.isLoading = true;
                const result = await api.put(url, data);
                console.log(result)
                this.user = result.data.result;
                this.isLoading = false;
            } catch (error) {
                Notify.create({
                    message: error.response.data,
                    color: 'red',
                    position:"top-right"
                  });
            }
        }

    }



})