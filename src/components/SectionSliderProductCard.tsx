"use client";

import React, { FC, use, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  productSectionOne: ProductSection;
  loading?: boolean;
}


interface ProductSection {
  title: string;
  products: {
    data: Product[];
  };
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  productSectionOne,
  
}) => {
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  // const [loadingProductSection , setLoadingProductSection] = useState(true);
  // const [productSectionOne, setProductSectionOne] = useState<ProductSection | null>(null);
  
  // const fetchProductSection = async () => {
  //   try {
  //     const response = await httpRequest({
  //       url: API.PRODUCT_SECTION_ONE,
  //       method: "GET",
  //     });
  //     setProductSectionOne(response.data);
  //   } catch (error) {
  //     console.error("Error fetching product section data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProductSection();
  // }, []);

  

  useEffect(() => {
   const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef, productSectionOne]);

  // const filteredData = productSectionOne?.products?.data.filter((_, i) => i < 8 && i >= 0) || [];
  const filteredData = productSectionOne?.products?.data || [];


  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          hasNextPrev
        >
           

{            productSectionOne?.title
}         
        </Heading>
      
          
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
             { filteredData.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <ProductCard data={item} />
                </li>
              ))
            }
          </ul>
        </div>
          
      </div>
    </div>
  );
};

export default SectionSliderProductCard;