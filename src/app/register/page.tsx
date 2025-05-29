"use client";

import React, { FC, useState } from "react";


import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email,"email");
  console.log(password,"password");

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6">
        
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
           <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
               Full Name
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex smith"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Phone
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="+91 987654321"
                className="mt-1"
              />
            </label>
           
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span  className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
             
              </span>
              <Input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1" />
            </label>
               <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              
              </span>
              <Input type="password" placeholder="******"  value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
            <Link className="text-green-600" href="/login">
             Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
