"use client";

import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";
import NcModal from "@/shared/NcModal/NcModal";
import { Textarea } from "@headlessui/react";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

interface Props {
  addresses: object[];
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  addresses,
  isActive,
  onCloseActive,
  onOpenActive,
}) => {
  const renderShippingAddress = () => {
    const stateOptions: Record<number, { label: string; value: number }[]> = {
      102: [
        { label: "Andhra Pradesh", value: 1 },
        { label: "Arunachal Pradesh", value: 2 },
        { label: "Assam", value: 3 },
        { label: "Bihar", value: 4 },
        { label: "Chhattisgarh", value: 5 },
        { label: "Goa", value: 6 },
        { label: "Gujarat", value: 7 },
        { label: "Haryana", value: 8 },
        { label: "Himachal Pradesh", value: 9 },
        { label: "Jharkhand", value: 10 },
        { label: "Karnataka", value: 11 },
        { label: "Kerala", value: 12 },
        { label: "Madhya Pradesh", value: 13 },
        { label: "Maharashtra", value: 14 },
        { label: "Manipur", value: 15 },
        { label: "Meghalaya", value: 16 },
        { label: "Mizoram", value: 17 },
        { label: "Nagaland", value: 18 },
        { label: "Odisha", value: 19 },
        { label: "Punjab", value: 20 },
        { label: "Rajasthan", value: 21 },
        { label: "Sikkim", value: 22 },
        { label: "Tamil Nadu", value: 23 },
        { label: "Telangana", value: 24 },
        { label: "Tripura", value: 25 },
        { label: "Uttar Pradesh", value: 26 },
        { label: "Uttarakhand", value: 27 },
        { label: "West Bengal", value: 28 },
        { label: "Andaman and Nicobar Islands", value: 29 },
        { label: "Chandigarh", value: 30 },
        { label: "Dadra and Nagar Haveli and Daman and Diu", value: 31 },
        { label: "Delhi", value: 32 },
        { label: "Jammu and Kashmir", value: 33 },
        { label: "Ladakh", value: 34 },
        { label: "Lakshadweep", value: 35 },
        { label: "Puducherry", value: 36 },
      ],
      840: [ // USA
        { label: 'California', value: 37 },
        { label: 'Texas', value: 38 },
      ],
      360: [ // Indonesia
        { label: 'Gandaria', value: 3001 },
        { label: 'Jakarta', value: 3002 },
      ],
    };
    const cityOptions: Record<number, { label: string; value: number }[]> = {
      1: [ // Andhra Pradesh
        { label: 'Visakhapatnam', value: 1001 },
        { label: 'Vijayawada', value: 1002 },
      ],
      2: [ // Arunachal Pradesh
        { label: 'Itanagar', value: 1003 },
      ],
      3: [ // Assam
        { label: 'Guwahati', value: 1004 },
      ],
      4: [ // Bihar
        { label: 'Patna', value: 1005 },
      ],
      5: [ // Chhattisgarh
        { label: 'Raipur', value: 1006 },
      ],
      6: [ // Goa
        { label: 'Panaji', value: 1007 },
      ],
      7: [ // Gujarat
        { label: 'Gandhinagar', value: 1008 },
        { label: 'Ahmedabad', value: 1009 },
      ],
      8: [ // Haryana
        { label: 'Chandigarh', value: 1010 },
      ],
      9: [ // Himachal Pradesh
        { label: 'Shimla', value: 1011 },
      ],
      10: [ // Jharkhand
        { label: 'Ranchi', value: 1012 },
      ],
      11: [ // Karnataka
        { label: 'Bengaluru', value: 1013 },
      ],
      12: [ // Kerala
        { label: 'Thiruvananthapuram', value: 1014 },
      ],
      13: [ // Madhya Pradesh
        { label: 'Bhopal', value: 1015 },
      ],
      14: [ // Maharashtra
        { label: 'Mumbai', value: 1016 },
        { label: 'Pune', value: 1017 },
      ],
      15: [ // Manipur
        { label: 'Imphal', value: 1018 },
      ],
      16: [ // Meghalaya
        { label: 'Shillong', value: 1019 },
      ],
      17: [ // Mizoram
        { label: 'Aizawl', value: 1020 },
      ],
      18: [ // Nagaland
        { label: 'Kohima', value: 1021 },
      ],
      19: [ // Odisha
        { label: 'Bhubaneswar', value: 1022 },
      ],
      20: [ // Punjab
        { label: 'Chandigarh', value: 1023 },
      ],
      21: [ // Rajasthan
        { label: 'Jaipur', value: 1024 },
      ],
      22: [ // Sikkim
        { label: 'Gangtok', value: 1025 },
      ],
      23: [ // Tamil Nadu
        { label: 'Chennai', value: 1026 },
      ],
      24: [ // Telangana
        { label: 'Hyderabad', value: 1027 },
      ],
      25: [ // Tripura
        { label: 'Agartala', value: 1028 },
      ],
      26: [ // Uttar Pradesh
        { label: 'Lucknow', value: 1029 },
      ],
      27: [ // Uttarakhand
        { label: 'Dehradun', value: 1030 },
      ],
      28: [ // West Bengal
        { label: 'Kolkata', value: 1031 },
      ],
      29: [ // Andaman and Nicobar Islands
        { label: 'Port Blair', value: 1032 },
      ],
      30: [ // Chandigarh
        { label: 'Chandigarh', value: 1033 },
      ],
      31: [ // Dadra and Nagar Haveli and Daman and Diu
        { label: 'Daman', value: 1034 },
      ],
      32: [ // Delhi
        { label: 'New Delhi', value: 1035 },
      ],
      33: [ // Jammu and Kashmir
        { label: 'Srinagar', value: 1036 },
      ],
      34: [ // Ladakh
        { label: 'Leh', value: 1037 },
      ],
      35: [ // Lakshadweep
        { label: 'Kavaratti', value: 1038 },
      ],
      36: [ // Puducherry
        { label: 'Puducherry', value: 1039 },
      ],
      37: [ // California
        { label: 'Los Angeles', value: 1040 },
        { label: 'San Francisco', value: 1041 },
      ],
      38: [ // Texas
        { label: 'Houston', value: 1042 },
        { label: 'Dallas', value: 1043 },
      ],
      3001: [ // Gandaria
        { label: 'Gandaria', value: 4001 },
      ],
      3002: [ // Jakarta
        { label: 'Jakarta', value: 4002 },
      ],
    };

    const [addressData, setAddressData] = useState<{
        address: string;
        country: number | '';
        state: number | '';
        city: number | '';
        postal_code: string;
        phone: string;
      }>({
        address: '',
        country: 102,
        state: '',
        city: '',
        postal_code: '',
        phone: '',
      });

     const updateAddress = async () => {
        try {
          const response = await httpRequest({
            url: API.UPDATE_ADDRESS,
            method: "POST",
            params: {
              address: addressData.address,
              country: addressData.country || null,
              state: addressData.state || null,
              city: addressData.city || null,
              postal_code: addressData.postal_code,
              phone: addressData.phone,
              id: null
            },
          });
        }
          catch(err){
error.log(err)
          }
        }


    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">
                {`Here's your shipping address`}
              </span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={onOpenActive}
          >
            View/Change
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
         

          {/* ============ */}
          {addresses.map((address: any) => (
  <label
    key={address.id}
    htmlFor={`address-${address.id}`}
    className="bg-slate-50 p-4 rounded-lg flex justify-between items-start w-full cursor-pointer border border-gray-300 mb-2 hover:border-blue-500"
  >
    <div className="flex items-start gap-4 w-full">
      <input
        type="radio"
        id={`address-${address.id}`}
        name="address"
        value={address.id}
        defaultChecked={address.default_shipping === 1}
        className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 `}
        
      />
      <div className="text-sm font-medium">
        {address.address}, {address.postal_code} <br />
        <span className="font-light">
          {address.city}, {address.state}, {address.country}
        </span>
        <br />
        <span className="font-light">{address.phone}</span>
      </div>
    </div>
    {/* <button
      type="button"
      className="underline text-red-600 hover:text-red-800"
      onClick={() => handleChangeAddress(address.id)} // Replace with your actual handler
    >
      Change
    </button> */}
    <NcModal
            modalTitle="Add New Address"
            contentExtraClass="max-w-xl"
            renderTrigger={(openModal) => (
              <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
           onClick={openModal}>
               Change
              </button>
            )}
            renderContent={({ closeModal }) => (
              <div>
                <div className="mt-4">
                  {/* address */}
                  <div className="py-2">
                    <Label className="">Address</Label>
                    <div className="mt-1.5 flex">
                      <Textarea
                        value={address.address}
                        onChange={e => setAddressData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>
                
                  <div className="flex pt-2 gap-4">
                    {/* state */}
                    <div className="py-2 w-1/2">
                      <Label>State</Label>
                      <div className="mt-1.5 flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-map-signs"></i>
                        </span>
                        <Select
                          className="!rounded-l-none w-full border px-3 py-2"
                          value={address.state}
                          onChange={e => setAddressData(prev => ({ ...prev, state: e.target.value ? Number(e.target.value) : '', city: '' }))}
                          disabled={!address.country}
                        >
                          <option value="">Select State</option>
                          {address.country && stateOptions[address.country as number]?.map((opt: {label: string; value: number}) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    {/* City */}
                    <div className="py-2 w-1/2">
                      <Label>City</Label>
                      <div className="mt-1.5 flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-map-signs"></i>
                        </span>
                        <Select
                          className="!rounded-l-none w-full border px-3 py-2"
                          value={address.city}
                          onChange={e => setAddressData(prev => ({ ...prev, city: e.target.value ? Number(e.target.value) : '' }))}
                          disabled={!address.state}
                        >
                          <option value="">Select City</option>
                          {address.state && cityOptions[address.state as number]?.map((opt: {label: string; value: number}) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex pt-2 gap-4">
                    {/* postalcode */}
                    <div className="py-2">
                      <Label>Postal Code</Label>
                      <div className="mt-1.5 flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-map-signs"></i>
                        </span>
                        <Input className="!rounded-l-none" placeholder="Postal Code" value={address.postal_code} onChange={e => setAddressData(prev => ({ ...prev, postal_code: e.target.value }))} />
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className="py-2">
                      <Label>Phone Number</Label>

                      <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                        <Input className="!rounded-l-none" placeholder="Phone" value={address.phone} onChange={e => setAddressData(prev => ({ ...prev, phone: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-6 gap-2">
                    <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
                    <ButtonPrimary onClick={() => updateAddress()}>Update account</ButtonPrimary>
                  </div>
                </div>
              </div>
            )}
          />
  </label>
))}

         


          <div>
            <Label className="text-sm">Address type</Label>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Radio
                label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                id="Address-type-home"
                name="Address-type"
                defaultChecked
              />
              <Radio
                label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                id="Address-type-office"
                name="Address-type"
              />
            </div>
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={onCloseActive}
            >
              Save and next to Payment
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={onCloseActive}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
