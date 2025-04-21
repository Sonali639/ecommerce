"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // For detecting click outside

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
    } else {
      searchProduct(value);
    }
  };

  const searchProduct = async (value: string) => {
    try {
      const response = await httpRequest({
        url: `${API.SEARCH}/${value}`,
        method: "GET",
      });

      if (response?.products?.data) {
        setSearchResults(response.products.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setShowResults(false);
    }
  };

  const renderMagnifyingGlassIcon = () => (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const renderSearchForm = () => (
    <div className="relative w-full" ref={dropdownRef}>
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search");
          inputRef.current?.blur();
        }}
      >
        <div className="bg-slate-50 pt-2 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
            value={inputValue}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => {
              inputRef.current?.blur(); // 🔥 blur input first
              setShowSearchForm(false);
              setInputValue("");
              setShowResults(false);
              setSearchResults([]);
            }}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showResults && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-neutral-800 shadow-lg rounded-md z-50 max-h-80 overflow-y-auto">
          {searchResults.map((product, index) => (
            <React.Fragment key={index}>
              <div
                className="px-4 py-2 flex gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  router.push(`/product-details/${product.slug}`);
                  setShowResults(false);
                  setInputValue("");
                }}
              >
                <img
                  src={product.thumbnail_image}
                  className="h-14 w-14"
                  alt={product.name}
                />
                <div>
                  <span className="text-sm leading-[14px]">
                    {product.name}
                  </span>
                  <div className="flex gap-2">
                    <span className="line-through text-slate-500">
                      ₹{product.base_price}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-red-500">
                      ₹{product.base_discounted_price}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => (
    <div className="h-20 flex justify-between">
      <div className="flex items-center lg:hidden flex-1">
        <MenuBar />
      </div>
      <div className="l flex items-center">
        <Logo className="flex-shrink-0" />
      </div>
      <div className="flex-[2] pl-4 hidden lg:flex justify-center mx-4">
        {showSearchForm ? renderSearchForm() : <Navigation />}
      </div>
      <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
        {!showSearchForm && (
          <button
            className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
            onClick={() => setShowSearchForm(true)}
          >
            {renderMagnifyingGlassIcon()}
          </button>
        )}
        <AvatarDropdown />
        <CartDropdown />
      </div>
    </div>
  );

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
