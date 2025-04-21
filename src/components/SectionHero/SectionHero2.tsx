"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";
import useInterval from "beautiful-react-hooks/useInterval";
import useHorizontalSwipe from "beautiful-react-hooks/useHorizontalSwipe";

export interface SectionHero2Props {
  className?: string;
  SliderData: SliderItem[];
}

interface SliderItem {
  img: string;
  link: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "", SliderData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const swipeState = useHorizontalSwipe(ref, {
    threshold: 100,
    preventDefault: false,
    passive: true,
  });
  const [isSlided, setIsSlided] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useState(true);

  useEffect(() => {
    if (isSlided || !indexActive) {
      return;
    }
    setIsSlided(true);
  }, [indexActive, isSlided]);

  useEffect(() => {
    if (swipeState.swiping || !swipeState.direction || !swipeState.count) {
      return;
    }
    swipeState.direction === "left" && handleClickNext();
    swipeState.direction === "right" && handleClickPrev();
  }, [swipeState.direction, swipeState.swiping, swipeState.count]);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5000 : 999999
  );

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (SliderData != null && state >= SliderData.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (SliderData != null && state >= SliderData.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return SliderData.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };

  const renderDots = () => {
    return (
      <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
        {SliderData != null && SliderData.map((_, index) => {
          const isActive = indexActive === index;
          return (
            <div
              key={index}
              onClick={() => {
                setIndexActive(index);
                handleAfterClick();
              }}
              className={`relative px-1 py-1.5 cursor-pointer`}
            >
              <div className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}>
                {isActive && (
                  <div
                    className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                      isActive ? " " : " "
                    }`}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = SliderData[index];
    if (!isActive) {
      return null;
    }
    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >
        <div className="aspect-h-16 aspect-w-10 relative flex flex-col-reverse overflow-hidden sm:aspect-h-16 sm:aspect-w-13 lg:aspect-h-7 lg:aspect-w-16 2xl:aspect-h-[5.75] 2xl:aspect-w-16 lg:flex-col bg-slate-100">
          <div>{renderDots()}</div>

          <div className="bg-white">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute w-full h-full object-cover"
              src={backgroundLineSvg}
              alt="hero"
            />
          </div>

          <div className="container">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover object-right-bottom nc-SectionHero2Item__image"
              src={item.img}
              alt={item.link}
              priority
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative h-full ${className}`} ref={ref}>
      {SliderData != null &&  SliderData.map((_, index) => renderItem(index))}

      {/* <button
        type="button"
        className="absolute inset-y-px end-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
        onClick={handleClickNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button
        type="button"
        className="absolute inset-y-px start-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
        onClick={handleClickPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default SectionHero2;