import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import formSlice from "./slices/formSlice";
import loginSlice from "./slices/loginSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import productByCategorySlice from "./slices/productByCategorySlice";
import searchProductsSlice from "./slices/searchProductsSlice";


const store = configureStore({
    name : "myStore",
    reducer : {
        modal : modalSlice,
        form : formSlice,
        login : loginSlice,
        category : categorySlice,
        products : productSlice,
        productsByCategory : productByCategorySlice,
        searchProducts : searchProductsSlice,
       
    }
});

export default store;