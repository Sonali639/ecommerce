"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "@/components/AccordionInfo";
import Image from "next/image";
import Link from "next/link";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import { calculateDiscount, formatPriceWithSymbol, storeLocalStorage } from "@/common/common";
import {Skeleton} from "@nextui-org/skeleton";

export interface ProductQuickViewProps {
  className?: string;
  slug: string;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({ className = "" , slug}) => {

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    try {

      const response = await httpRequest({
        url: `${API.PRODUCT_DETAIL}${slug}`,
  method: "GET",
      });
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
console.log(product,'product');


  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];
  const [cartItemsData, setCartItemsData] = useState(null);

  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [qualitySelected, setQualitySelected] = useState(1);
// const [tempId, setTempId] = useState(null);
const notifyAddTocart = () => {
 
  let tempId = localStorage.getItem("tempId");
  if (!tempId) {
      tempId = generateTempId(); // Assuming generateTempId is defined elsewhere
      localStorage.setItem("tempId", tempId); // Store the new tempId
  }

  // const qtySelected = 1; // Default quantity
  console.log(`Temporary ID: ${tempId}`);

  const data = {
    temp_user_id: tempId,
    qty: qualitySelected,
   variation_id: product?.variations[0]?.id,
  };
  httpRequest({
    url: API.ADD_TO_CART,
    method: "POST",
    params: data,
  })
    .then((response) => {
      console.log("Add to cart success:", response);
    })
    .catch((error) => {
      console.error("Add to cart error:", error);
    });

  //show notify

  
  // const fetchCartData = async () => {
  //   try {
  //     const response = await httpRequest({
  //       url: API.CARTS,
  //       method: "POST",
  //       params: {
  //         temp_user_id: tempId,
  //       },
  //     });
    
  //     try {
  //       if (response.cart_items && response.cart_items.data) {
  //         setCartItemsData(response.cart_items.data);
  //       } else {
  //         console.log("Cart items data is null or undefined");
  //       }
  //     } catch (jsonError) {
  //       console.error("cart data JSON parse error:", jsonError);
  //     }
  //   } catch (error) {
  //     console.error(" cart data Cart data error:", error);
  //   }
  // };
  
  // fetchCartData();

  console.log("cartItemsData", cartItemsData);

  toast.custom(
    (t) => (
      <NotifyAddTocart
      productImage={product?.photos[0]}
      qualitySelected={qualitySelected}
      show={t.visible}
      name={product?.name}
      price={product?.base_discounted_price}
      sizeSelected={sizeSelected}
      variantActive={variantActive}
    />
    ),
    { position: "top-right" }
  );
};
const generateTempId = () => {
  return Date.now().toString();
};
const addToSessionStorage = (key, value) => {
  if (typeof window !== "undefined") {
    const existingData = sessionStorage.getItem(key);
    let newData = [];
    if (existingData) {
      newData = JSON.parse(existingData);
      if (Array.isArray(newData)) {
        const index = newData.findIndex(item => item.name === value.name);
        if (index !== -1) {
          newData[index] = value; // Replace existing product data
        } else {
          newData.push(value); // Push new product data
        }
      } else {
        newData = [newData, value];
      }
    } else {
      newData = [value];
    }
    sessionStorage.setItem(key, JSON.stringify(newData));
  }
};

  // const renderVariants = () => {
  //   if (!variants || !variants.length) {
  //     return null;
  //   }

  //   return (
  //     <div>
  //       <label className="rtl:text-right block" htmlFor="">
  //         <span className="text-sm font-medium">
  //           Color:
  //           <span className="ms-1 font-semibold">
  //             {variants[variantActive].name}
  //           </span>
  //         </span>
  //       </label>
  //       <div className="flex mt-2.5">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative flex-1 max-w-[75px] h-10 rounded-full border-2 cursor-pointer ${
  //               variantActive === index
  //                 ? "border-primary-6000 dark:border-primary-500"
  //                 : "border-transparent"
  //             }`}
  //           >
  //             <div
  //               className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
  //               style={{
  //                 backgroundImage: `url(${
  //                   // @ts-ignore
  //                   typeof variant.thumbnail?.src === "string"
  //                     ? // @ts-ignore
  //                       variant.thumbnail?.src
  //                     : typeof variant.thumbnail === "string"
  //                     ? variant.thumbnail
  //                     : ""
  //                 })`,
  //               }}
  //             ></div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // const renderSizeList = () => {
  //   if (!allOfSizes || !sizes || !sizes.length) {
  //     return null;
  //   }
  //   return (
  //     <div>
  //       <div className="flex justify-between font-medium text-sm">
  //         <label htmlFor="">
  //           <span className="">
  //             Size:
  //             <span className="ms-1 font-semibold">{sizeSelected}</span>
  //           </span>
  //         </label>
  //         <a
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="##"
  //           className="text-primary-6000 hover:text-primary-500"
  //         >
  //           See sizing chart
  //         </a>
  //       </div>
  //       <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2.5">
  //         {allOfSizes.map((size, index) => {
  //           const isActive = size === sizeSelected;
  //           const sizeOutStock = !sizes.includes(size);
  //           return (
  //             <div
  //               key={index}
  //               className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
  //               text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
  //                 sizeOutStock
  //                   ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
  //                   : "cursor-pointer"
  //               } ${
  //                 isActive
  //                   ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
  //                   : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
  //               }`}
  //               onClick={() => {
  //                 if (sizeOutStock) {
  //                   return;
  //                 }
  //                 setSizeSelected(size);
  //               }}
  //             >
  //               {size}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderStatus = (status) => {
    // console.log(status, "status");
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    // if (status === "New in") {
    //   return (
    //     <div className={CLASSES}>
    //       <SparklesIcon className="w-3.5 h-3.5" />
    //       {/* <span className="ms-1 leading-none">{status}</span> */}
    //     </div>
    //   );
    // }
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status.toLowerCase().includes("%")) {
      return (
        <div className={`${CLASSES} bg-yellow-400 text-dark`}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status} Discount</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div  className={`${CLASSES} bg-red-400 text-dark`}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
        {loading?
        <>
                  <div className="h-5 mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                  <div className="h-5 mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-[80%] mb-4"></div>
                  <div className="h-5 mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-[72%] mb-4"></div>
                  <div className="h-5 mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-[84%] mb-4"></div>
                  </>

           :
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link href={`/product-details/${slug}`} >{product?.metaTitle}</Link>
          </h2>}


          <div className="flex pt-4 justify-between items-center"> 
            {loading?
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
:<>
            <Prices  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold" price={formatPriceWithSymbol(product?.base_discounted_price?.toFixed(2))} /><span className="pt-2"> </span>
            </>   }

            {loading?
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
:
              <Link
                href="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                  <span>{product?.shop?.rating}</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                   {product?.shop?.review_count} reviews
                  </span>
                </div>
              </Link>
}
              <span className="hidden sm:block mx-2.5">·</span>
              {loading?
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
:
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ms-1 leading-none">{status}</span>
              </div>
  }
            </div>

          <div className="fex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            {/* <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={112}
            /> */}
            {/* <div className=" pl-5">
              <span>Price: </span> &nbsp; &nbsp;
              <span className="line-through text-red-500">
                {formatPriceWithSymbol(product?.base_price)}
              </span>
              /{product?.unit}
            </div> */}
           

          <div  className="flex align-center pt-2">  
           
           
            </div>
           

            {/* <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div> */}

           
          </div>
          
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}
        {/* <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5 rtl:space-x-reverse">
        {loading?
           <div className="h-[60px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
:
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>}

          {loading?
           <div className="h-[60px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
:
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ms-3">Add to cart</span>
          </ButtonPrimary>}
        </div>

        

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}


        {loading?
       <div className="flex justify-between">
           <div className="h-7 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-7 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           </div>
:
<div className="flex justify-between">
       
       <span className="text-lg font-semibold">Total Price:</span>
       <span className="text-lg font-semibold">
         {formatPriceWithSymbol(product?.base_discounted_price * qualitySelected)}
       </span>
     </div>
        }

        
        


        {/* ---------- 5 ----------  */}
        {loading?
        <>
           <div className="h-12 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-32 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>

</>
:
        <AccordionInfo
          data={product}
        />}
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
            {loading?
                  <div className="h-[33vw] mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           
                  :
              <Image
                src={product?.photos[0]}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />}
            </div>

            {/* STATUS */}
            {/* <ProductStatus status={`${calculateDiscount(base_price, base_discounted_price )} Discount`} /> */}
          
            {renderStatus(calculateDiscount(product?.base_price, product?.base_discounted_price))}
            {/* META FAVORITES */}
            <LikeButton className="absolute end-3 top-3 " />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {[product?.photos[1], product?.photos[2]].map((item, index) => {
              return (
                <div key={index} className="aspect-w-3 aspect-h-4">
                  {loading?
                  <div className="h-[33vw] mt-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           
                  :

                  <Image
                    fill
                    src={item}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full rounded-xl object-cover"
                    alt="product detail 1"
                  />}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
