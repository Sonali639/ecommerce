"use client";

import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

interface Category {
  banner: string;
  name: string;
  slug:string;
}

const DiscoverMoreSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [popularCategoryData, setPopularCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch popular categories
  const allCategory = async () => {
    try {
      const response = await httpRequest({
        url: API.POPULAR_CATEGORY,
        method: "GET",
      });
      console.log(response.data.data, "Popular Categories Data"); // Debugging
      setPopularCategoryData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular categories:", error);
      setLoading(false); // Ensure loading is cleared even on failure
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 6,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 5.5,
        },
        1279: {
          gap: 20,
          perView: 5.15,
        },
        1023: {
          gap: 20,
          perView: 5.6,
        },
        768: {
          gap: 20,
          perView: 2.2,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };

    if (!sliderRef.current || popularCategoryData.length === 0) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);

    return () => {
      slider.destroy();
    };
  }, [popularCategoryData]);

// console.log(popularCategoryData,"popularCategoryData")

  return (
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider container ${isShow ? "" : "invisible"} w-full`}
    >
      {loading ? (
        <div role="status" className="animate-pulse flex justify-center">
          <div className="h-12 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
        </div>
      ) : (
        <>
          <Heading
            className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
            desc=""
            hasNextPrev
          >
            Popular Categories
          </Heading>


          {loading ? (
        <div role="status" className="animate-pulse flex justify-center">
          <div className="grid grid-cols-5">
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
          <div>
          <div className="h-[120px] mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          <div className="h-8 mt-2 bg-gray-200 rounded-md dark:bg-gray-700 w-60 mb-12"></div>
          </div>
     
          </div>
             </div>
      ) : (


          <div
            data-glide-el="track"
            className="w-full overflow-hidden relative"
          >
            <ul
              className="glide__slides flex gap-8"
              style={{ width: "100%" }}
            >
              {popularCategoryData.map((item, index) => (
                <li
                  key={index}
                  className="glide__slide"
                  style={{ width: "200px" }}
                >
                  <CardCategory3
                    name={item.name}
                    slug={item.slug}
                    featuredImage={item.banner}
                  />
                </li>
              ))}
            </ul>
          </div>

          )}
        </>
      )}
    </div>
  );
};

export default DiscoverMoreSlider;
