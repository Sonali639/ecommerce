'use client';

import React, { FC, useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
// import TabFilters from "@/components/TabFilters";
import { usePathname, useRouter } from "next/navigation";
import { API } from "@/constants/common";
import { httpRequest } from "@/api/hello/httpRequest";
import Image from "next/image";
import { getLocalStorage } from "@/common/common";
import Link from "next/link";
const PageCollection = ({}) => {
  const pathname = usePathname();
  // console.log(pathname, 'pathname');
  const [brandData, setBrandData] = useState([]);


 const category = getLocalStorage('allCategory');

  const fetchProductSections = async () => {
    try {

      const response = await httpRequest({
        url: API.BRANDS,
        method: "GET",
      });
      if(response.data){
        setBrandData(response.data);
      }
     

    } catch (error) {
      console.error("Error fetching product section data:", error);
    }
  };

useEffect(() => {
  if(pathname === '/all-brands'){
  fetchProductSections();
  }
}, []);

console.log(brandData, 'brandData');


  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {
  pathname === '/all-brands' ? 'All Brands' : 
  pathname === '/all-categories' ? 'All Category' : null
}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>

{
   pathname === '/all-brands' ? <div className="flex gap-5  ">
   {brandData.map((item, index) => (
   <div key={index} className="border flex items-center p-5">
   <Image src={item.logo} alt="" width={122} height={82} className="w-full h-auto object-contain"/>
   {/* <h2>{item.name}</h2> */}
   {/* <span>{item.desc}</span> */}
 </div>
   ))  } 
   </div>: 

<div className="grid grid-cols-2 gap-4">
  { category.length!==null &&  category.map((item, index) => (
  <Link href={`category/${item.slug}`}>
   <div key={index} className="border flex items-center p-5">
    <Image src={item.banner} alt="" width={200} height={200} className="w-40 h-auto object-contain"/>
    <div className=" ">
      <h2 className="font-semibold">{item.name}</h2>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum inventore fuga quaerat.</span>
    </div>
  </div>
  </Link>
   
  ))  }
  
{/* <div className="grid grid-cols-2 gap-4">
<div className="border flex items-center p-5">
  <Image src="" alt="" width={200} height={200} className="w-full h-auto object
  -contain"/>
  <div>
    <h2>Brand Name</h2>
    <span>Brand Description</span>
  </div>
</div> */}

</div>
}
           


            
          
            {/* LOOP ITEMS */}
          
          </main>
        </div>

        {/* === SECTION 5 === */}
      

        {/* SUBCRIBES */}
        
      </div>
    </div>
  );
};

export default PageCollection;
