"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";

interface PhoneNumberFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultCountry?: string;
}

export default function PhoneNumberField({
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder = "0123 456 7890",
  defaultCountry = "eg",
}: PhoneNumberFieldProps) {
  const smRadius = "2px !important"; // Tailwind rounded-sm value with important

  return (
    <PhoneInput
      country={defaultCountry}
      value={value}
      onChange={onChange}
      disabled={disabled}
      inputProps={{
        required,
        placeholder,
      }}
      inputStyle={{
        width: "100% !important",
        height: "40px !important",
        borderRadius: smRadius,
        backgroundColor: "#eaedf1 !important",
        border: "none !important",
        paddingLeft: "4rem !important", // space for flag
        fontSize: "14px !important",
        fontWeight: "500 !important",
        color: "#101418 !important",
        fontFamily: "Poppins !important",
      }}
      buttonStyle={{
        borderRadius: `2px 0 0 2px !important`,
        backgroundColor: "#eaedf1 !important",
        border: "none !important",
        padding: "0 8px !important",
      }}
      dropdownStyle={{
        borderRadius: smRadius,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1) !important",
        border: "1px solid #ccc !important",
      }}
    />
  );
}
