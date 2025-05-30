import { PRODUCTS } from "@/data/data";

export const API = Object.freeze({

    BASE_URL: "https://www.cartwings.com/",

    VERSION: "api/v1/",

    LOGIN: "auth/login",

    REGISTER: "/auth/signup",

    FORGOT_PASSWORD: "auth/password/create",

    HEADER: "setting/header",

    BRANDS: "all-brands",

    SLIDER: "setting/home/sliders",

    ALL_CATEGORY: "all-categories",

    POPULAR_CATEGORY: "setting/home/popular_categories",

    PRODUCT_DETAIL: "product/details/",

    PRODUCT_SECTION_ONE: "setting/home/product_section_one",

    PRODUCT_SECTION_TWO: "setting/home/product_section_two",

    PRODUCT_SECTION_THREE: "setting/home/product_section_three",

    PRODUCT_SECTION_FOUR: "setting/home/product_section_four",

    PRODUCT_SECTION_FIVE: "setting/home/product_section_five",

    PRODUCT_SECTION_SIX: "setting/home/product_section_six",

    PRODUCT_RANDOM: "product/random",

    CARTS:'carts',

    ADD_TO_CART: "carts/add",

ADD_TO_WISHLIST: "user/wishlists",

    CHANGE_QUANTITY: "carts/change-quantity",

    DESTORY_CART: "carts/destroy",

    PRODUCT_SEARCH: "product/search",

    // SUBSCRIBE: "subscribe",

    SEARCH: "search.ajax",

    //user 

    INFO: "user/info",

    INFO_UPDATE:"user/info/update",

    CREATE_ADDRESS:"user/address/create",

    USER_ADDRESSES:"user/addresses",

    UPDATE_ADDRESS:"address/update"

});


export const DEVICE = Object.freeze({
    WEB: 1
})

