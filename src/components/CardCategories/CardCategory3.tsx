import React, { FC , useEffect} from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { CATS_DISCOVER } from "./data";

export interface CardCategory3Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  name?: string;
  desc?: string;
  color?: string;
  slug?: string;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  featuredImage,
  name,
  desc,
  color,
  slug
}) => {
  
  return (
    <Link
      href={`/category/${slug}`}
      className={`nc-CardCategory3 block ${className}`}
    >
      {/* <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            <Image
              alt=""
              src={featuredImage}
              width={100}
              height={100}
              className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                {name}
              </span>
              {desc && (
                <h2
                  className={`text-xl md:text-2xl text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></h2>
              )}
            </div>
           <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
              >
                Show me all
              </ButtonSecondary>
            </div> 
          </div>
        </div>
      </div>  */}
          <div className={`card-category3  `} style={{ backgroundColor: '#' }}>
            <div className={`flex justify-center pt-2  ${color} `}>
            <Image
              alt=""
              src={featuredImage || ""}
              // className="p-4"
              width={120}
              height={120}
            />
            </div>
        
      <div className="card-category3__content">
        <h3 className="card-category3__name text-center pt-2">{name}</h3>
        
      </div>
    </div>
    </Link>
  );
};

export default CardCategory3;
