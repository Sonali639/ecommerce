

'use client';

import React, { FC, useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import TabFilters from "@/components/TabFilters";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Image from 'next/image';

const PageCollection = ({ }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();;
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    sort_by: "",
    min_price: 1,
    max_price: 500000,
    // priceRange: [1, 500],
    isOnSale: false,
  });
  const [sortOrder, setSortOrder] = useState("popular");
  const [selectedFilters, setSelectedFilters] = useState<any>(null); // Store selected filters
  const onlyParams = pathname.split('/')[2];
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProductSections = async () => {
  //     try {

  //       const response = await httpRequest({
  //         url: API.PRODUCT_SEARCH ,
  //         method: "GET",
  //         params: {
  //           page: currentPage,
  //           category_slug: onlyParams,
  //           brand_ids: '',
  //           attribute_values: '',
  //           sort_by: 'popular',
  //           ...filters,
  //         }
  //       });
  //       if(response){
  //         setProductData(response);
  //         // console.log(response, 'response.data');
  //       }


  //     } catch (error) {
  //       console.error("Error fetching product section data:", error);
  //     }
  //   };

  //   fetchProductSections(); 
  // }, [currentPage,filters]);

  useEffect(() => {
    const fetchProductSections = async () => {
      try {
        const paramsObj: Record<string, string> = {
          page: currentPage.toString(),
          category_slug: onlyParams,
          ...Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value.toString()])),
        };

        const params = new URLSearchParams(paramsObj).toString();

        const response = await httpRequest({
          url: `${API.PRODUCT_SEARCH}?${params}`,
          method: "GET",
        });
        if (response) {
          setProductData(response);
          setLoading(false);
          console.log(response, 'newFilters---');
        }
      } catch (error) {
        console.error("Error fetching product section data:", error);
      }
    };

    fetchProductSections();
  }, [currentPage, onlyParams, filters]);


  // const handleSortOrderChange = (newSortOrder: string) => {
  //   setSortOrder(newSortOrder);
  // };

  const handleFiltersChange = (newFilters) => {
    console.log(newFilters, 'newFilters');
    setFilters(newFilters);
    updateQueryParams(newFilters);
  };


  const handlePageChange = (page: number) => {
    console.log(page, 'page---------');
    setCurrentPage(page); // Update state when the page changes
    updateQueryParams({ page });
  };


  const updateQueryParams = (newParams) => {
    const searchParams = new URLSearchParams(window.location.search);

    // Merge new filters into existing ones
    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(",")); // Join array values with commas
        } else {
          searchParams.set(key, value);
        }
      } else {
        searchParams.delete(key); // Remove key if value is invalid
      }
    });

    // Update the URL
    const newUrl = `${pathname}?${searchParams.toString()}`;
    if (newUrl !== window.location.href) {
      router.push(newUrl);
    }
  };


  console.log(productData?.products, 'productData-------');
  return (
    <>
    <div className="relative container w-full  h-[112px]">
      <Image 
        fill
        className="object-contain"
        src='https://www.cartwings.com/public/uploads/all/YZ8qV6nmxE5onEwodDYus9kkSpuFI8kt9JHEnE35.png'
        alt="hero"
      />
    </div>
  
     <div className={`nc-PageCollection`}>
     <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
    
       <div className="space-y-10 lg:space-y-14">
         {/* HEADING */}
       
         {loading ?
           <div role="status" className="animate-pulse  max-w-screen-sm ">
             <div className="h-12 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-2"></div>
             <div className="h-12 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-[70%] mb-12"></div>
             {/* <div className="h-3 block mt-12 bg-gray-200 rounded-md dark:bg-gray-700 w-[92%] mb-4"></div> */}
             <div className="h-3 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-[74%] mb-4"></div>
             <div className="h-3 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-[96%] mb-4"></div>
             {/* <div className="h-3 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-[62%] mb-4"></div> */}
             <div className="h-3 block mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-[32%] mb-4"></div>
           </div> :
           <div className="max-w-screen-sm">
             <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
               {productData?.categoryMetaTitle}
             </h2>
             <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
               {productData?.categoryMetaDescription}
             </span>
           </div>
         }




         <hr className="border-slate-200 dark:border-slate-700" />
         <main>
           {/* TABS FILTER */}
           <TabFilters onFiltersChange={handleFiltersChange} />

           {/* LOOP ITEMS */}
           
           {loading ?
               <div role="status" className="animate-pulse flex gap-12">

             <div className="grid sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">

                 {/* <div className="grid grid-cols-4 gap-4 w-full h-full"> */}
                 {Array(4).fill(0).map((_, index) => (
                   <div key={index} className="pt-1 h-full justify-center">
                     <div className="h-[300px] rounded-2xl bg-gray-200 dark:bg-gray-700 w-full mb-4"></div>
                     <div className="h-3 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
                     <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
                     <div className="flex justify-between">
                       <div className="h-3 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
                       <div className="h-3 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                     </div>
                   </div>
                 ))}
                 {/* </div> */}
               </div>
             </div> :
             <>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
               {productData?.products?.data?.length > 0 ? (
  productData.products.data.map((item, index) => (
    <ProductCard data={item} key={index} />
  ))
) : (
  // <p className="text-center text-gray-500">NO DATA</p>
  <img src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg?t=st=1742486944~exp=1742490544~hmac=33a400f4942c13438187bba4fea2de92c0462b7ed7cf57ab4800598c9eaaed0d&w=1380" alt=""  />
)}


                
                 </div>
                 </>}
       {/* </div> */}

       {/* PAGINATION */}
       <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
         <Pagination onPageChange={handlePageChange} />
         {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
       </div>
     </main>
   </div>

       {/* === SECTION 5 === */ }
       <hr className="border-slate-200 dark:border-slate-700" />

       {/* <SectionSliderCollections />
       <hr className="border-slate-200 dark:border-slate-700" /> */}

 {/* SUBCRIBES */ }
 <SectionPromo1 />
     </div >
   </div >

    </>
   
  );
};

export default PageCollection;
