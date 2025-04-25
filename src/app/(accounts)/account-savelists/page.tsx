"use client";

import React, { useEffect, useState } from "react";

import { httpRequest } from "@/api/hello/httpRequest";
import ProductCard from "@/components/ProductCard";
import { API } from "@/constants/common";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const AccountSavelists = () => {
  const renderSection1 = () => {
const [wishlistinfo, setWishlistinfo] = useState<any>(null);
    const wishlist = async () => {
       try {
         const response = await httpRequest({
           url: API.ADD_TO_WISHLIST,
           method: "GET",
         });
         setWishlistinfo(response.data)
         console.log("wishlist res", response);
       } catch (error) {
         console.error("Error adding to wishlist:", error);
       }
     };
     useEffect(() => {
     
     wishlist();
     }, []); 

    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of saved products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {wishlistinfo?.filter((_, i) => i < 6).map((stay) => (
            <ProductCard key={stay.id} data={stay} />
          ))}
        </div>
        <div className="flex !mt-20 justify-center items-center">
          <ButtonSecondary loading>Show me more</ButtonSecondary>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
