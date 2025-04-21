"use client";

import React, { FC, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {calculateDiscount, formatPriceWithSymbol, truncateDescription} from "@/common/common";
import NotifyAddTocart from "./NotifyAddTocart";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
}) => {
  const {
    name,
    base_discounted_price,
    base_price,
    slug,
    description,
    variants='vgbj',
    variantType,
    variations,
    status,
    thumbnail_image,
    rating,
    id,
    numberOfReviews,
    sizes,
  } = data;

  

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

  // const notifyAddTocart = ({ size }: { size?: string }) => {
  //   toast.custom(
  //     (t) => (
  //       <Transition
  //         as={"div"}
  //         appear
  //         show={t.visible}
  //         className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
  //         enter="transition-all duration-150"
  //         enterFrom="opacity-0 translate-x-20"
  //         enterTo="opacity-100 translate-x-0"
  //         leave="transition-all duration-150"
  //         leaveFrom="opacity-100 translate-x-0"
  //         leaveTo="opacity-0 translate-x-20"
  //       >
  //         <p className="block text-base font-semibold leading-none">
  //           Added to cart!
  //         </p>
  //         <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
  //         {renderProductCartOnNotify({ size })}
  //       </Transition>
  //     ),
  //     {
  //       position: "top-right",
  //       id: String(id) || "product-detail",
  //       duration: 3000,
  //     }
  //   );
  // };
  const notifyAddTocart = () => {
    console.log("Add sonalito cart");
    //if tempId is present in local storage then use it otherwise generate new tempId and store it 

    let tempId = localStorage.getItem("tempId");
    if (!tempId) {
        tempId = generateTempId(); // Assuming generateTempId is defined elsewhere
        localStorage.setItem("tempId", tempId); // Store the new tempId
    }

    const qtySelected = 1; // Default quantity

  
      //post data in ADD_TO_CART api
  const data = {
    temp_user_id: tempId,
    qty: qtySelected,
   variation_id: variations[0]?.id,
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

  
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={thumbnail_image}
          // qty={qualitySelected}
          qualitySelected={qtySelected}
          show={t.visible}
          name={name}
          price={base_discounted_price}
          // sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };
  const generateTempId = () => {
    return Date.now().toString();
  };
  

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={thumbnail_image}
            alt={name}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              {/* <span>{base_price}</span> */}
              <Prices price={base_discounted_price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex gap-1.5">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                variantActive === index
                  ? getBorderClass(variant.color)
                  : "border-transparent"
              }`}
              title={variant.name}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
              variantActive === index
                ? "border-black dark:border-slate-300"
                : "border-transparent"
            }`}
            title={variant.name}
          >
            <div
              className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
              style={{
                backgroundImage: `url(${
                  // @ts-ignore
                  typeof variant.thumbnail?.src === "string"
                    ? // @ts-ignore
                      variant.thumbnail?.src
                    : typeof variant.thumbnail === "string"
                    ? variant.thumbnail
                    : ""
                })`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart({ size: "XL" })}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to bag</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 gap-2 flex flex-wrap justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              onClick={() => notifyAddTocart({ size })}
            >
              {size}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        
        <Link  href={`/product-details/${slug}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link  href={`/product-details/${slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={thumbnail_image}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductStatus status={`${calculateDiscount(base_price, base_discounted_price )}`} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
            {truncateDescription(name, 52)}
            </h2>
            {/* <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
            {truncateDescription(description, 10)}
          </p> */}
          </div>
          

          <div className="flex justify-between items-end ">
          <span className="line-through text-red-500">
  {formatPriceWithSymbol(base_price)}
</span>

            <Prices price={formatPriceWithSymbol(base_discounted_price?.toFixed(2))} />
            {/* <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
      slug={slug}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
