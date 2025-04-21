"use client";

import React, { FC, useEffect, useState } from "react";
import CardCategory1 from "@/components/CardCategories/CardCategory1";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import CardCategory6 from "@/components/CardCategories/CardCategory6";
import { DEMO_MORE_EXPLORE_DATA, ExploreType } from "./data";
import { getLocalStorage } from "@/common/common";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
}) => {
  const [allCategory, setAllCategory] = useState(() => {
    const storedCategories = getLocalStorage("allCategory");
    return storedCategories;
  });

  const [tabActive, setTabActive] = useState(() => {
    const storedCategories = getLocalStorage("allCategory");
    return storedCategories?.length > 0 ? storedCategories[0].name : "";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCategories = getLocalStorage("allCategory");
      setAllCategory(storedCategories);
      if (storedCategories.length > 0 && !tabActive) {
        setTabActive(storedCategories[0].name);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [tabActive]);

  const renderCard = (item: ExploreType, children: any) => {
    switch (boxCard) {
      case "box1":
        return (
          <CardCategory1 key={item.id} featuredImage={item.image} {...item} />
        );

      case "box4":
        return (
          <CardCategory4
          slug={children?.slug}
            bgSVG={item.svgBg}
            name={children?.name}
            featuredImage={children?.banner}
            key={item.id}
            color={item.color}
            {...item}
          />
        );
      case "box6":
        return (
          <CardCategory6
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            {...item}
          />
        );

      default:
        return (
          <CardCategory4
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            {...item}
          />
        );
    }
  };

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Start Exploring.
        </Heading>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
          containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {allCategory?.slice(0, 5).map((item, index) => (
            <NavItem2
              key={index}
              isActive={tabActive === item.name}
              onClick={() => setTabActive(item.name)}
            >
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                <span
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                ></span>
                <span>{item.name}</span>
              </div>
            </NavItem2>
          ))}
        </Nav>
      </div>
    );
  };

  const renderContent = () => {
    const activeCategory = allCategory?.find((category) => category.name === tabActive);
    const childrenData = activeCategory ? activeCategory.children.data : [];
console.log(childrenData,'childrenData')
    return (
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {childrenData.map((child, index) => renderCard(child, child))}
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      {renderContent()}
    </div>
  );
};

export default SectionGridMoreExplore;