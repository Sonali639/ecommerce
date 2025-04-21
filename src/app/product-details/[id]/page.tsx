"use client";

import React, { FC, use, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import { Product } from "@/data/data";
// import { useRouter } from 'next/router';

 interface ProductSection {
   title: string;
   products: {
     data: Product[];
   };
 }

import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { usePathname, useRouter } from "next/navigation";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import { calculateDiscount, formatPriceWithSymbol, storeLocalStorage } from "@/common/common";
import Link from "next/link";
const LoadingSkeleton = () => (
  <div role="status" className="animate-pulse">
    <div className="h-12 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-12"></div>
    <div className="grid grid-cols-4 gap-4 w-full h-full">
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
    </div>
  </div>
);

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const ProductDetailPage = () => {
  const searchParams =new URLSearchParams(window.location.search);
  console.log(searchParams,'searchParams');

  // const router = useRouter()
  // console.log(router,"routyer----------")
  const pathname = usePathname()
  // console.log(pathname,"pathname----------")

  const onlyParams = pathname.split('/')[2];
  // console.log(onlyParams,'onlyParams');

  // const { id } = searchParams.query;
  const query = searchParams.get('query');
  const [product, setProduct] = useState(null);

// console.log(query,'idsss');

const [loading, setLoading] = useState(true);
const [productDetail, setProductDetail] = useState(null);
  const [loadingProductSection, setLoadingProductSection] = useState<boolean>(true);
  const [randomProduct, setRandomProduct]=  useState<ProductSection | null>(null);
// const randomProductSent ={
// products:randomProduct,
// title: 'Top picks for you'
// }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setLoadingProductSection(true);
  
        const response = await httpRequest({
          url: API.PRODUCT_DETAIL + onlyParams,
          method: "GET",
        });
  
        if (response?.data) {
          setProductDetail(response.data);
          setLoading(false); // Set loading to false when response 1 is received
        }
  
        const randomNum = Math.floor(Math.random() * 50) + 1;
        const response2 = await httpRequest({
          url: `${API.PRODUCT_RANDOM}/10/${randomNum}`,
          method: "GET",
        });
  
        if (response2?.data) {
       
          // console.log(response2,'radomproduct')
          const randomProductSent ={
            products:response2,
            title: 'More Items to Explore'
            }
            setRandomProduct(randomProductSent);
          setLoadingProductSection(false); // Set loadingProductSection to false when response 2 is received
        }
      } catch (error) {
        console.error("Error fetching product detail data:", error);
        setLoading(false);
        setLoadingProductSection(false);
      }
    };
  
    fetchProduct();
  }, [onlyParams]);
  

  console.log(productDetail,'productDetail');

  const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];
  //
  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);


    const notifyAddTocart = () => {
      let tempId = localStorage.getItem("tempId");
      if (!tempId) {
          tempId = generateTempId(); // Assuming generateTempId is defined elsewhere
          localStorage.setItem("tempId", tempId); // Store the new tempId
      }
    
      // const qtySelected = 1; // Default quantity
      console.log(`Temporary ID: ${tempId}`);
    
      //post data in ADD_TO_CART api
  const data = {
    temp_user_id: tempId,
    qty: qualitySelected,
   variation_id: productDetail?.variations[0]?.id,
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
            productImage={productDetail?.photos[0]}
            qualitySelected={qualitySelected}
            show={t.visible}
            name={productDetail?.name}
            price={productDetail?.base_discounted_price}
            sizeSelected={sizeSelected}
            variantActive={variantActive}
          />
        ),
        { position: "top-right", id: "nc-product-notify", duration: 3000 }
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

  const renderVariants = () => {
    if (!variants || !variants.length) {
      return null;
    }

    return (
      <div>
        <label htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
              {variants[variantActive].name}
            </span>
          </span>
        </label>
        <div className="flex mt-3">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                variantActive === index
                  ? "border-primary-6000 dark:border-primary-500"
                  : "border-transparent"
              }`}
            >
              <div
                className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover"
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
      </div>
    );
  };

  const renderSizeList = () => {
    if (!allOfSizes || !sizes || !sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size:
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="##"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {allOfSizes.map((size, index) => {
            const isActive = size === sizeSelected;
            const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  sizeOutStock
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  if (sizeOutStock) {
                    return;
                  }
                  setSizeSelected(size);
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
        {loading?<>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-[89%] mb-4"></div>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-[78%] mb-4"></div>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-[32%] mb-4"></div>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-[68%] mb-4"></div>
         </>  
           :
          <h2 className="text-2xl sm:text-3xl font-semibold">
           {productDetail?.name}
          </h2>}


          {loading?
          <>
          <div className="flex justify-between pt-4">
           <div className="h-12 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-12 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           </div>
           </>:
         <div className="flex justify-between pt-4">
<Prices  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold" price={formatPriceWithSymbol(productDetail?.base_discounted_price?.toFixed(2))} />

          <div className="flex  items-center">
              <Link
                href="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                  <span>{productDetail?.shop?.rating}</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                   {productDetail?.shop?.review_count} reviews
                  </span>
                </div>
              </Link>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ms-1 leading-none">{status}</span>
              </div>
            </div>

</div>
         }

          
          <div className="fex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            {/* <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={112}
            /> */}
            {/* <div className=" pl-5">
              <span>Price: </span> &nbsp; &nbsp;
              <span className="line-through text-red-500">
                {formatPriceWithSymbol(productDetail?.base_price)}
              </span>
              /{productDetail?.unit}
            </div> */}
            {/* <span >Price: 
              </span> <span className="line-through text-red-500">
  {formatPriceWithSymbol(product?.base_price)}
</span>/1 Pc */}
{/* <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div> */}

          {/* <div  className="flex align-center pt-2">  
            
            <Prices  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold" price={formatPriceWithSymbol(productDetail?.base_discounted_price?.toFixed(2))} /><span className="pt-2"> / {productDetail?.unit}</span>

            </div>  */}
          </div>


          {/* <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
             <div className="flex text-xl font-semibold">$112.00</div> 
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={112}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div>
          </div> */}


        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div>
        <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}


        {loading?
          <>
          <div className="flex justify-between pt-4">
           <div className="h-20 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-20 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           </div>
           </>:
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>
  }

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}
        {loading?
          <>
           <div className="h-4 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>

          <div className="flex justify-between pt-2">
           <div className="h-8 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           <div className="h-8 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
           </div>
           
           </>:
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total Price:</span>
          <span className="text-lg font-semibold">
            {formatPriceWithSymbol(productDetail?.base_discounted_price * qualitySelected)}
          </span>
        </div>

        }
        {/* ---------- 5 ----------  */}
        {loading?
          <>
          <div className="h-12 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          <div className="h-12 mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          </>:
        <AccordionInfo data ={productDetail}/>
        }

        {/* ---------- 6 ----------  */}

        <div className="hidden xl:block">
        {loading?
          <>
          <div className="flex">
          <div className="h-[120px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          <div className="h-[120px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          </div>
          <div className="flex pt-4">
          <div className="h-[120px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          <div className="h-[120px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full m"></div>
          </div>
            </>:         <Policy />}
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
              {loading?
           <div className="h-[660px] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
         :
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src={productDetail?.photos[0]}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
                }
              </div>
              {renderStatus(calculateDiscount(productDetail?.base_price, productDetail?.base_discounted_price))}
          
              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[productDetail?.photos[1], productDetail?.photos[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                        {loading?
           <div className="h-[314] mt-2 mx-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
         :
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {/* {renderDetailSection()} */}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          
          {/* <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          /> */}

          {/* SECTION */}
          <div className="pb-20 xl:pb-28 lg:pt-14">
            {/* <SectionPromo2 /> */}
            {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          randomProduct && <SectionSliderProductCard productSectionOne={randomProduct} />
        )}
          </div>
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
