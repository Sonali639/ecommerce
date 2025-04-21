'use client';

import React, { useState } from "react";
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

const AccountPass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUser = async () => {
    try {
      const response = await httpRequest({
        url: API.INFO_UPDATE,
        method: "POST",
        params: {
          oldPassword,
          password,
          confirmPassword,
        },
      });
      console.log("Password updated successfully", response);
      // Optionally show a success toast or reset inputs
    } catch (error) {
      console.error("Error updating password:", error);
      // Optionally show an error message
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Update your password
      </h2>
      <div className="max-w-xl space-y-6">
        <div>
          <Label>Current password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>New password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="pt-2">
          <ButtonPrimary onClick={updateUser}>Update password</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
