'use client';
import React, { useEffect, useState } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import Image from "next/image";
import { getLocalStorage, storeLocalStorage } from "@/common/common";
import { Product } from "@/data/data";

interface ProductSection {
  title: string;
  products: {
    data: Product[];
  };
}

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

function PageHome() {
  const [loadingSlider, setLoadingSlider] = useState(true);
  const [loadingProductSection, setLoadingProductSection] = useState<boolean>(true);
const [loaderHeader, setLoaderHeader] = useState<boolean>(true);
  const [productSectionOne, setProductSectionOne] = useState<ProductSection | null>(null);
  const [productSectionTwo, setProductSectionTwo] = useState<ProductSection | null>(null);
  const [productSectionThree, setProductSectionThree] = useState<ProductSection | null>(null);
  const [productSectionFour, setProductSectionFour] = useState<ProductSection | null>(null);
  const [productSectionFive, setProductSectionFive] = useState<ProductSection | null>(null);
  const [productSectionSix, setProductSectionSix] = useState<ProductSection | null>(null);
  const [allCategory, setAllCategory] = useState<ProductSection | null>(null);
  const [sliderOne, setSliderOne] = useState<ProductSection | null>(null);
  const [sliderTwo, setSliderTwo] = useState<ProductSection | null>(null);
  const [sliderThree, setSliderThree] = useState<ProductSection | null>(null);
  const [header, setHeader] = useState<ProductSection | null>(null);



    const fetchUserDetail = async () => {
      try {
        const response = await httpRequest({
          url: API.INFO,
          method: "GET",
        });
        const user = response.user;
        //save to local storage use storeLocalStorage
        storeLocalStorage("user", user);
  
  
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };
  const fetchProductSections = async () => {
    try {

const responseHeader = await httpRequest({
        url: API.HEADER,
        method: "GET",
      });
      if (responseHeader.top_banner){
        setHeader(responseHeader.top_banner);
        setLoaderHeader(false);
      }
      // setHeader(responseHeader.data);

      const responseOne = await httpRequest({
        url: API.PRODUCT_SECTION_ONE,
        method: "GET",
      });
      setProductSectionOne(responseOne.data);
      setLoadingProductSection(false);

      const responseTwo = await httpRequest({
        url: API.PRODUCT_SECTION_TWO,
        method: "GET",
      });
      setProductSectionTwo(responseTwo.data);

      const responseThree = await httpRequest({
        url: API.PRODUCT_SECTION_THREE,
        method: "GET",
      });
      setProductSectionThree(responseThree.data);

      const responseFour = await httpRequest({
        url: API.PRODUCT_SECTION_FOUR,
        method: "GET",
      });
      setProductSectionFour(responseFour.data);

      const responseFive = await httpRequest({
        url: API.PRODUCT_SECTION_FIVE,
        method: "GET",
      });
      setProductSectionFive(responseFive.data);

      const responseSix = await httpRequest({
        url: API.PRODUCT_SECTION_SIX,
        method: "GET",
      });
      setProductSectionSix(responseSix.data);

      const responseAllCategory = await httpRequest({
        url: API.ALL_CATEGORY,
        method: "GET",
      });
      setAllCategory(responseAllCategory.data);

      const responseSliderOne = await httpRequest({
        url: API.SLIDER,
        method: 'GET',
      });
      if (responseSliderOne.data.one) {
        setSliderOne(responseSliderOne.data.one);
        setLoadingSlider(false);
      }

      const responseSliderTwo = await httpRequest({
        url: API.SLIDER,
        method: 'GET',
      });
      if (responseSliderTwo.data.four) {
        setSliderTwo(responseSliderTwo.data.four);
        setLoadingSlider(false);
      }

      const responseSliderThree = await httpRequest({
        url: API.SLIDER,
        method: 'GET',
      });
      if (responseSliderThree.data.three) {
        setSliderThree(responseSliderThree.data.three);
        setLoadingSlider(false);
      }

    } catch (error) {
      console.error("Error fetching product section data:", error);
    }
  };

  console.log(header,'header---')
  useEffect(() => {
    fetchUserDetail();
    fetchProductSections();
  }, []);

  if (allCategory !== null) {
    storeLocalStorage("allCategory", allCategory);
  }

   const category = getLocalStorage('allCategory');
  
console.log(productSectionTwo,'productSectionTwo')
  return (
    <>
    
      <div className="nc-PageHome relative overflow-hidden pt-12">
      {loadingSlider && (
        <div role="status" className="animate-pulse">
          <div className="grid grid-cols-3  grid-cols-1  gap-4 w-full container h-full">
            <div className="col-span-2  h-full flex items-center justify-center">
              <div className="h-[345px] bg-gray-200 dark:bg-gray-700 w-full "></div>
            </div>
            <div className="grid grid-rows-2 gap-0 h-full">
              <div className="h-[168px] bg-gray-200 dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-[168px] bg-gray-200 dark:bg-gray-700 w-full "></div>
            </div>
          </div>
        </div>
      )}

   

      <div className="grid md:grid-cols-3  grid-cols-1 gap-6 w-full container h-full">
        <div className="col-span-2 pt-1 h-full">
          <SectionHero2 SliderData={sliderOne} className="h-full" />
        </div>
        <div className="grid grid-rows-2 gap-4 h-full">
          <SectionHero2 SliderData={sliderTwo} className="h-full" />
          <SectionHero2 SliderData={sliderThree} className="h-full" />
        </div>
      </div>



     


      <div className="mt-24 lg:mt-32">
      {loadingProductSection ? (
        <div role="status" className="animate-pulse container">
          <div className="h-12 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="grid grid-cols-5 gap-40">
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-8"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-8"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-8"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-8"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-8"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
     
          </div>
             </div>
      ) :(
        <DiscoverMoreSlider />)}
      </div>

<div className="mt-20">
{loaderHeader?(

<>
<div className="relative mt-4 container w-full h-[306px] hidden sm:block">
<div className="h-[306px] bg-gray-200 dark:bg-gray-700 w-full mb-12"></div>

</div>
</>
):( <div className="relative mt-4  w-full px-20 h-[306px] hidden sm:block">
<Image 
  fill
  className="object-contain"
  src={header?.img}
  alt="hero"
/>
</div>)}
</div>
    


      <div className="container relative space-y-24 my-24 mt-12 lg:space-y-32 lg:my-32">
        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionOne && <SectionSliderProductCard productSectionOne={productSectionOne} />
        )}

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionTwo && <SectionSliderProductCard productSectionOne={productSectionTwo} />
        )}

        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionThree && <SectionSliderProductCard productSectionOne={productSectionThree} />
        )}

        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionFour && <SectionSliderProductCard productSectionOne={productSectionFour} />
        )}

        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionFive && <SectionSliderProductCard productSectionOne={productSectionFive} />
        )}

        {loadingProductSection ? (
          <LoadingSkeleton />
        ) : (
          productSectionSix && <SectionSliderProductCard productSectionOne={productSectionSix} />
        )}

        <SectionPromo3 />
        {/* <SectionSliderLargeProduct cardStyle="style2" /> */}
        <SectionSliderCategories category={category}/>
        {/* <SectionPromo2 /> */}
        {/* <SectionGridFeatureItems /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}
        {/* <SectionClientSay /> */}
      </div>
    </div>
    </>
   
  );
}

export default PageHome;