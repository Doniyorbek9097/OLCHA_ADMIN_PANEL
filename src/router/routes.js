import { createRouter, createWebHistory } from "vue-router"
import { api } from "../api";

const routes = [

  // {
  //   path: "/",
  //   redirect: "/register",
  //   beforeEnter: async (to, from, next) => {
  //     let user = localStorage.user;
  //     if(!user) return next();
  //     user = JSON.parse(user);
  //     console.log(user)
  //     const result = await api.get("/user/"+user._id, {
  //       headers: {
  //         token:user.token
  //       }
  //     });
      
  //     if(!result.data) {
  //       delete localStorage.user;
  //       return next();
  //     }else{
  //       result.data.verified ? next("/dashboard") : next();
  //     }
  //   },
  //   component: () => import("../layouts/RegisterLayout.vue"),
  //   children: [
  //     { path: "register", name: "Register", component: () => import("../pages/Users/Register.vue") },
  //     { path: "auth", name: "Auth", component: () => import("../pages/Users/Auth.vue") },
  //     { path: "users/:id/verify/:token", name: "Verified", component: () => import("../pages/Users/Verified.vue") },
  //     { path: "reset-password", name: "ResetPassword", component: () => import("../pages/Users/ResetPassword.vue") },
  //     { path: "reset-password/:id/:token", name: "NewPassword", component: () => import("../pages/Users/NewPassword.vue") },
  //   ]
  // },



  {
    path: "/dashboard",
    //  beforeEnter: async (to, from, next) => {
    //   let user = localStorage.user;
    //   if(!user) return next("/");
    //   user = JSON.parse(user);
    //   const result = await api.get("/user/"+user._id, {
    //     headers: {
    //       token:user.token
    //     }
    //   });

    //   if(!result.data) {
    //     delete localStorage.user;
    //     return next("/")
    //   }else{
    //     result.data.verified ? next() : next("/");
    //   }
    // },

    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: '',
        name: "IndexPage",
        component: () => import('../pages/IndexPage.vue')
      },

      {
        path: 'categories',
        name: "Categories",
        component: () => import('../pages/Categories/Categories.vue'),
      },

      {
        path: 'category-add',
        name: "category-add",
        component: () => import('../pages/Categories/AddCategory.vue'),
      },

      {
        path: 'category-edit/:id',
        name: "category-edit",
        component: () => import('../pages/Categories/EditCategory.vue'),
      },


      { path: 'sub-categories', name: "SubCategories", component: () => import('../pages/SubCategory/SubCategoryList.vue') },
      { path: 'add-sub-category', name: "AddSubCategory", component: () => import('../pages/SubCategory/AddSubCategory.vue') },
      { path: 'edit-sub-category/:id', name: "EditSubCategory", component: () => import('../pages/SubCategory/EditSubCategory.vue') },

      { path: 'child-categories', name: "ChildCategories", component: () => import('../pages/ChildCategory/ChildCategories.vue') },
      { path: 'add-child-category', name: "AddChildCategory", component: () => import('../pages/ChildCategory/AddChildCategory.vue') },
      { path: 'edit-child-category/:id', name: "EditChildCategory", component: () => import('../pages/ChildCategory/EditChildCategory.vue') },



      { path: 'products', name: "Products", component: () => import('../pages/Products/Products.vue') },
      { path: 'add-product', name: "AddProduct", component: () => import('../pages/Products/AddProduct.vue') },
      { path: 'edit-product/:id', name: "EditProduct", component: () => import('../pages/Products/EditProduct.vue') },

      { path: 'carousel', name: "Carousel", component: () => import("../pages/Carousels/Carousel.vue") },
      { path: 'add-carousel', name: "AddCarousel", component: () => import("../pages/Carousels/AddCarousel.vue") },

      { path: "shops", name: "Shops", component: () => import("../pages/Shops/Shops.vue") },
      { path: "add-shop", name: "AddShop", component: () => import("../pages/Shops/AddShop.vue") },
      { path: "edit-shop/:id", name: "EditShop", component: () => import("../pages/Shops/EditShop.vue") },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  },

];


const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createWebHistory()
});



export default router
