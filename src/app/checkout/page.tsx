"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { NextResponse } from 'next/server';
import { Product, PRODUCTS } from "@/data/data";
import { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";

import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import emailjs from '@emailjs/browser';
import { formatPriceWithSymbol, getLocalStorage } from "@/common/common";
import toast from 'react-hot-toast'; // Import toast
import Razorpay from 'razorpay';

const CheckoutPage = () => {
  const handlePhonePePayment = () => {
    const upiLink = `upi://pay?pa=6395673945@ybl&pn=Ayush%20Rana&am=1000&cu=INR`;
    window.location.href = upiLink;
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
// // 1. Load Razorpay Script
// useEffect(() => {
//   const script = document.createElement('script');
//   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//   script.async = true;
//   document.body.appendChild(script);
//   return () => {
//     document.body.removeChild(script);
//   };
// }, []);

// // 2. Trigger Razorpay Checkout
// const openRazorpayCheckout = () => {
//   const options = {
//     key: 'ttRXQ0ZeBE4H61AK26zgTVrm', // This is safe on frontend
//     amount: 50000, // in paise (₹500)
//     currency: 'INR',
//     name: 'HJ Real Estates',
//     description: 'Booking Fee',
//     image: '/avatar/white-logo.png',
//     handler: function (response: any) {
//       console.log('Payment successful:', response);
//       alert(`Payment ID: ${response.razorpay_payment_id}`);
//     },
//     prefill: {
//       name: 'Ayush Rana',
//       email: 'sonalisaluja9005@gmail.com',
//       contact: '6395673945',
//     },
//     theme: {
//       color: '#2B3886',
//     },
//   };

//   const rzp = new (window as any).Razorpay(options);
//   rzp.open();
// };
const openRazorpayCheckout = async () => {
  try {
    const res = await fetch('/api/create-order/payment', {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Order created:', data);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // safe to expose
      "amount": parseFloat("1.5")*100,
      "currency": data.order.currency,
      "name": 'Ecommerce1',
      description: 'Booking Fee',
      order_id: data.order.id,
      image: '/avatar/white-logo.png',
      method: {
        upi: true
      },
      handler: function (response: any) {
        console.log('Payment successful:', response);
        toast.success(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Ayush Rana',
        email: 'sonalisaluja9005@gmail.com',
        // contact: '6395673945',
      },
      theme: {
        color: '#2B3886',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Failed to create order:', err);
    toast.error('Payment initialization failed. Please try again.');
  }
};




  const sendOrderConfirmationEmail = () => {
    emailjs.send(
      'service_57ilfcf',       // Replace with your EmailJS service ID
      'template_m7cvwr7',      // Replace with your EmailJS template ID
      {
        // user_name: 'Ayush Rana',
        // order_id: '690267',
        // shipping: '49.00',
        // tax: '12.00',
        // total: '199.00',
        // to_email: 'sonalisaluja9005@gmail.com',
      },
      'FQzdKCcgIKxc1xrf1'        // Replace with your public key from EmailJS
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      // alert('Order confirmation email sent!');
      toast.success("Order confirmation email sent!");
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    });



  };

  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    console.log("useeffct")
const addAddress = async () => {
    try {
      const response = await httpRequest({
        url: API.USER_ADDRESSES,
        method: "GET",
      });
      if (response && response.data) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };


  //get tempId from localstorage
  const tempId = getLocalStorage("tempId");

  const buyProducts = async () => {
    try {
      console.log("cartItemswww")
      const response = await httpRequest({
        url: API.CARTS,
        method: "POST",
        params: {
          temp_user_id: tempId,
        }
      });
      if (response) {
        setCartItems(response.cart_items.data);
      }
      console.log(response.cart_items.data,"cartItems")
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  addAddress();
  buyProducts();
}, []);


  const renderProduct = (item: Product, index: number) => {
    const { image, price, name } = item;
    console.log("useeffct")



  console.log(addresses,"addressescheckout")

    return (

      // cartItems.map((item: any, index: number) => {
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={item.thumbnail}
            fill
            alt={item.name}
            className="h-full w-full object-contain object-center"
            sizes="150px"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">

                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>

                </div>

                {/* <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>

                </div> */}

              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <div>
                  <Prices price={formatPriceWithSymbol(item.dicounted_price*item.qty)} className="mt-0.5" />
                  <br />
                  <span className="mt-2 ">Qty:{item.qty}</span>
                </div>


              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* <div className="hidden sm:block text-center relative">
              <NcInputNumber className="relative z-10" />
            </div> */}

            {/* <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span>Remove</span>
            </a> */}
          </div>
        </div>
      </div>
      // })
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        {/* <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div> */}

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
          addresses={addresses}
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        {/* <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div> */}
        <ButtonPrimary onClick={openRazorpayCheckout}>
 Click here to pay
</ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={"/collection-2"} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {cartItems?.map(renderProduct)}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between py-2.5">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $249.00
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $5.00
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $24.90
                </span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>$276.00</span>
              </div>
            </div>
            

      {/* <button onClick={handlePhonePePayment} className="p-2 bg-slate-400">paynow</button> */}
            <ButtonPrimary className="mt-8 w-full" onClick={sendOrderConfirmationEmail}>Confirm order</ButtonPrimary>
            <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
