"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import { getLocalStorage } from "@/common/common";

const AccountPage = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 🛠️ Load user info from localStorage on mount
  useEffect(() => {
    const user = getLocalStorage("user");
    if (user) {
      setAvatar(user.avatar || "");
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, []);

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

  return (
    <div className="nc-AccountPage">
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Account information
        </h2>

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
            <div>
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
            </div>

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
