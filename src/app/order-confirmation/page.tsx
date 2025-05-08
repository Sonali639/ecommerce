import React from "react";
import { TfiCheck } from "react-icons/tfi";
import { VscCheck } from "react-icons/vsc";

import { TiTick } from "react-icons/ti";

const OrderConfirmation = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl py-12 scree px-6 max-w-xl mx-auto my-10 shadow-md text-center">
   
   <div className="flex justify-center ">
    <span className="rounded-full p-2 bg-[#03820a]" >
    <VscCheck  size={32} color="white" />
    </span>

   </div>
      
      <h2 className="text-2xl font-semibold pt-5 text-green-700">Your order has been placed!</h2>
      <p className="text-green-800 mt-2">Order Number: <strong>898666786</strong></p>
      <p className="text-green-700 mt-1">
        A confirmation has been sent to your phone number.
      </p>
    </div>
  );
};

export default OrderConfirmation;
