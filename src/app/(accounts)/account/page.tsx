"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import { getLocalStorage } from "@/common/common";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import Textarea from "@/shared/Textarea/Textarea";
import toast from "react-hot-toast";
import Select from "@/shared/Select/Select";

const AccountPage = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]);
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

  // Example: Replace these with your actual code mappings
  const countryOptions = [
    { label: 'India', value: 102 },
   ,
  ];
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

  // 🛠️ Load user info from localStorage on mount
  useEffect(() => {
    const user = getLocalStorage("user");
    if (user) {
      setAvatar(user.avatar || "");
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }

    //get address from get api
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
    addAddress();
  }, []);

  const addAddress = async () => {
    try {
      const response = await httpRequest({
        url: API.CREATE_ADDRESS,
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
      if (response.status === 200) {
        toast.success("Address Added Successfully");
        setAddressData(prev => ({ ...prev, address: "" }));
        setAddressData(prev => ({ ...prev, country: "" }));
        setAddressData(prev => ({ ...prev, city: "" }));
        setAddressData(prev => ({ ...prev, state: "" }));
        setAddressData(prev => ({ ...prev, postal_code: "" }));
        setAddressData(prev => ({ ...prev, phone: "" }));
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await httpRequest({
        url: API.INFO_UPDATE,
        method: "POST",
        params: {
          name,
          email,
          phone,
        },
      });

      console.log("User updated successfully", response);
      // Optionally update localStorage or show success toast
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  console.log(addressData,"addressData")
  return (
    <div className="nc-AccountPage">
      <div className="space-y-10 sm:space-y-12">
        <div className="flex justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Account information
          </h2>
          <NcModal
            modalTitle="Add New Address"
            contentExtraClass="max-w-xl"
            renderTrigger={(openModal) => (
              <ButtonSecondary onClick={openModal}>
                + Add New Address
              </ButtonSecondary>
            )}
            renderContent={({ closeModal }) => (
              <div>
                <div className="mt-4">
                  {/* address */}
                  <div className="py-2">
                    <Label className="">Address</Label>
                    <div className="mt-1.5 flex">
                      <Textarea
                        value={addressData.address}
                        onChange={e => setAddressData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>
                  {/* country */}
                  {/* <div className="py-2">
                    <Label>Country</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-map-signs"></i>
                      </span>
                      <select
                        className="!rounded-l-none w-full border px-3 py-2"
                        value={addressData.country}
                        onChange={e => setAddressData(prev => ({ ...prev, country: e.target.value ? Number(e.target.value) : '', state: '', city: '' }))}
                      >
                        <option value="">Select Country</option>
                        {countryOptions.map((opt: {label: string; value: number}) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div> */}
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
                          value={addressData.state}
                          onChange={e => setAddressData(prev => ({ ...prev, state: e.target.value ? Number(e.target.value) : '', city: '' }))}
                          disabled={!addressData.country}
                        >
                          <option value="">Select State</option>
                          {addressData.country && stateOptions[addressData.country as number]?.map((opt: {label: string; value: number}) => (
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
                          value={addressData.city}
                          onChange={e => setAddressData(prev => ({ ...prev, city: e.target.value ? Number(e.target.value) : '' }))}
                          disabled={!addressData.state}
                        >
                          <option value="">Select City</option>
                          {addressData.state && cityOptions[addressData.state as number]?.map((opt: {label: string; value: number}) => (
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
                        <Input className="!rounded-l-none" placeholder="Postal Code" value={addressData.postal_code} onChange={e => setAddressData(prev => ({ ...prev, postal_code: e.target.value }))} />
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className="py-2">
                      <Label>Phone Number</Label>

                      <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                        <Input className="!rounded-l-none" placeholder="Phone" value={addressData.phone} onChange={e => setAddressData(prev => ({ ...prev, phone: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-6 gap-2">
                    <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
                    <ButtonPrimary onClick={() => addAddress()}>Update account</ButtonPrimary>
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row">
          {/* AVATAR */}
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overflow-hidden flex">
              {avatar && (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover z-0"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5H7.5C6.837 5 6.201 5.263 5.732 5.732C5.263 6.201 5 6.837 5 7.5V20M5 20V22.5C5 23.163 5.263 23.799 5.732 24.268C6.201 24.737 6.837 25 7.5 25H22.5C23.163 25 23.799 24.737 24.268 24.268C24.737 23.799 25 23.163 25 22.5V17.5M5 20L10.732 14.267C11.201 13.799 11.837 13.536 12.5 13.536C13.163 13.536 13.799 13.799 14.268 14.267L17.5 17.5M25 12.5V17.5M25 17.5L23.018 15.518C22.549 15.049 21.913 14.786 21.25 14.786C20.587 14.786 19.951 15.049 19.483 15.518L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.513"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            {/* Full Name */}
            <div>
              <Label>Full name</Label>
              <Input
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Address (static) */}
            {/* <div>
              <Label>Address</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  defaultValue="New York, USA"
                  disabled
                />
              </div>
            </div> */}
          
            {/* Phone Number */}
            <div>
              <Label>Phone number</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
            <Label>Default Shipping Address</Label>
            <div className=" rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 mt-1.5 p-3 text-neutral-500 dark:text-neutral-400  text-sm rounded-xl">
            {addresses.length > 0 && (
  <div key={addresses[addresses.length - 1].id}>
    <Label>{addresses[addresses.length - 1].address}</Label>
    <p>{addresses[addresses.length - 1].postal_code}, {addresses[addresses.length - 1].city}, {addresses[addresses.length - 1].state}</p>
 <p>{addresses[addresses.length - 1].phone}</p>
  </div>
)}

            </div>
            </div>
         


            {/* Submit */}
            <div className="pt-2">
              <ButtonPrimary onClick={updateUser}>Update account</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
