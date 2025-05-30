"use client";

import { httpRequest } from "@/api/hello/httpRequest";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@/app/headlessui";
import { formatPriceWithSymbol, getLocalStorage, truncateDescription } from "@/common/common";
import Prices from "@/components/Prices";
import { API } from "@/constants/common";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDropdown() {
  const [addedToCart, setAddedToCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
console.log(addedToCart,'.!!!')

  //fetchh tempId from local store
  const tempId = getLocalStorage("tempId");
  const token = getLocalStorage("token");
  const fetchCartData = async () => {
    try {
      const response = await httpRequest({
        url: API.CARTS,
        method: "POST",
        params: {
          temp_user_id: tempId,
        },
      });
  
      if (response) {
        console.log("Get cart success:", response.cart_items);
        setAddedToCart(response.cart_items.data);
        setLoading(false);
      } else {
        console.log("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Get cart error:", error);
    }
  };
  useEffect(() => {
    setLoading(true);
  },[]);
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // const tempId = getLocalStorage("tempId");
      fetchCartData();
      // setAddedToCart(getSessionStorage("addedToCart"));
    }
    console.log(addedToCart,'addedToCart!!!')
  }, [isOpen]);

  const getSessionStorage = (key) => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  };

  const setSessionStorage = (key, value) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  };

    const removeFromSessionStorage = (key, card_id) => {
    // const existingData = getSessionStorage(key);
    // const newData = existingData.filter(item => item.name !== name);
    console.log("Remove from cart data:", card_id);
    httpRequest({
      url: API.DESTORY_CART,
      method: "POST",
      params: {
        temp_user_id: tempId,
        cart_id: card_id,
      },
    })
    .then((response) => {
      // console.log("Get cart success:", response.cart_items);
      if (response) {
        // setSessionStorage("addedToCart", response.data);
        console.log("Get cart success:", response.cart_items);
        setAddedToCart(response.cart_items.data);
      } else {
        console.log("Response data is null or undefined");
      }
    })
    .catch((error) => {
      console.error("Get cart error:", error);
    });

    setTimeout(() => {
      fetchCartData();
    }, 1000);
    // Find the item to remove from cart
    // const itemToRemove = existingData.find(item => item.name === name);
    // if (itemToRemove) {
    //   const data = {
    //     cart_id: 39,
    //     temp_user_id: itemToRemove.id,
    //   };

    //   console.log("Remove from cart data:", data);

    //   // Call destroy cart API 
    //   httpRequest({
    //     url: API.DESTORY_CART,
    //     method: "POST",
    //     params: data,
    //   })
    //     .then((response) => {
    //       console.log("Remove from cart success:", response);
    //     })
    //     .catch((error) => {
    //       console.error("Remove from cart error:", error);
    //     });
    // }

    // setSessionStorage(key, newData);
    // setAddedToCart(newData);
  };

// const removeFromSessionStorage = (key, name) => {
//     const existingData = getSessionStorage(key);
//     const newData = existingData.filter(item => item.name !== name);
//     //call destroy cart api 
// // Find the item to remove from cart
// const itemToRemove = existingData.find(item => item.name === name);
// if (itemToRemove) {
//    const data = {
//         cart_id: itemToRemove.product_id,
//         temp_user_id: itemToRemove.id,
//       };
//   httpRequest({
//     url: API.DESTORY_CART,
//     method: "POST",
//     params: data,
//     // console.log("Remove from cart success:", response);
//   })
//     .then((response) => {
//       console.log("Add to cart success:", response);
//     })
//     .catch((error) => {
//       console.error("Add to cart error:", error);
//     });

//   }
//     setSessionStorage(key, newData);
//     setAddedToCart(newData);
    
//   };

  
  const totalDiscountedPrice = addedToCart?.reduce((sum, item) => sum + item.dicounted_price * item.qty, 0);

  const renderProduct = (item, index, close) => {
    console.log(item, "item");
    return (

     <>
     {
      loading ? (   
        <div className="h-[94px] grid grid-cols-3 gap-4 mt-4 mb-4">
        <div className="h-full col-span-1 bg-gray-200 dark:bg-gray-700"></div>
        <div className="col-span-2">
          <div className="h-3 w-full bg-gray-200 mb-4 dark:bg-gray-700"></div>
          <div className="flex justify-between mt-2">
            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
      ):(
        <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={item?.thumbnail}
            alt={item.name}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={"/product-detail"}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className=" justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} href={"/product-detail"}>
                    {truncateDescription(item?.name, 30)}
                  </Link>
                </h3>
              </div>
              <div className="flex justify-between ">
                <span className="line-through text-red-500">
                  {formatPriceWithSymbol(item?.regular_price)}
                </span>
                <Prices
                  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-base font-medium"
                  price={formatPriceWithSymbol(item?.dicounted_price?.toFixed(2))}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">QTY: {item?.qty}</p>
            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={() => removeFromSessionStorage("addedToCart", item?.cart_id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      )
     }
     </>
   
    );
  };

  return (
    <Popover className="relative">
      {({ open, close }) => {
        useEffect(() => {
          setIsOpen(open);
        }, [open]);

        return (
          <>
            <PopoverButton
              className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                <span className="mt-[1px]">{addedToCart?.length}</span>
              </div>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Link className="block md:hidden absolute inset-0" href={"/cart"} />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <div className="relative bg-white dark:bg-neutral-800">
                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                      <h3 className="text-xl font-semibold">Shopping cart</h3>
                      <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {addedToCart?.map((item, index) => renderProduct(item, index, close))}
                      </div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                      <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                        <span>
                          <span>Subtotal</span>
                          <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                            Shipping and taxes calculated at checkout.
                          </span>
                        </span>
                        <span className="">{formatPriceWithSymbol(totalDiscountedPrice)}</span>
                      </p>
                      <div className="flex space-x-2 mt-5">
                        <ButtonSecondary
                          href={token ? "/cart" : "/login"}
                          className="flex-1 border border-slate-200 dark:border-slate-700"
                          onClick={close}
                        >
                          View cart
                        </ButtonSecondary>
                       <ButtonPrimary
  href={token ? "/checkout" : "/login"}
  onClick={close}
  className="flex-1"
>
  Check out
</ButtonPrimary>

                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
}