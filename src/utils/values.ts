export const STORE_CATEGORY_VALUES = [
  { label: "Fashion", value: "FASHION" },
  { label: "Beauty", value: "BEAUTY" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Home Appliances", value: "HOME_APPLIANCES" },
  { label: "Groceries", value: "GROCERIES" },
  { label: "Furniture", value: "FURNITURE" },
  { label: "Books", value: "BOOKS" },
  { label: "Toys", value: "TOYS" },
  { label: "Sports", value: "SPORTS" },
  { label: "Pharmacy", value: "PHARMACY" },
  { label: "Pet Supplies", value: "PET_SUPPLIES" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Baby Products", value: "BABY_PRODUCTS" },
  { label: "Jewelry", value: "JEWELRY" },
  { label: "Tools Hardware", value: "TOOLS_HARDWARE" },
];

export const convertToValueLabelMap = (
  arr: { label: string; value: string }[]
) => {
  return arr.reduce((acc, curr) => {
    acc[curr.value] = curr.label;
    return acc;
  }, {} as Record<string, string>);
};

export const STORE_CATEGORY_VALUES_OBJ = convertToValueLabelMap(
  STORE_CATEGORY_VALUES
);

export const ASSISTANT_PERSONA_VALUES = [
  { label: "Formal", value: "FORMAL" },
  { label: "Witty", value: "WITTY" },
  { label: "Luxurious", value: "LUXURIOUS" },
  { label: "Professional", value: "PROFESSIONAL" },
];

export const ASSISTANT_PERSONA_VALUES_OBJ = convertToValueLabelMap(
  ASSISTANT_PERSONA_VALUES
);

export const ASSISTANT_LANGUAGES_VALUES = [
  {
    value: "ARABIC",
    label: "Arabic",
  },
  {
    value: "ENGLISH",
    label: "English",
  },
];

export const RETURN_SHIPPING_PAYER_VALUES = [
  { label: "Customer", value: "CUSTOMER" },
  { label: "Store", value: "STORE" },
  { label: "Shared", value: "SHARED" },
];

export const REFUND_TYPES_VALUES = [
  { label: "Original Payment Method", value: "ORIGINAL_PAYMENT_METHOD" },
  { label: "Store Credit", value: "STORE_CREDIT" },
  { label: "Bank Transfer", value: "BANK_TRANSFER" },
  { label: "Cash", value: "CASH" },
  { label: "Exchange Only", value: "EXCHANGE_ONLY" },
];

export const RETURN_CONDITIONS_VALUES = [
  { label: "item must be unused", value: "item must be unused" },
  {
    label: "original packaging required",
    value: "original packaging required",
  },
  {
    label: "include receipt or proof of purchase",
    value: "include receipt or proof of purchase",
  },
  {
    label: "product must be in resellable condition",
    value: "product must be in resellable condition",
  },
  {
    label: "sealed items must be unopened",
    value: "sealed items must be unopened",
  },
  {
    label: "return not accepted for clearance items",
    value: "return not accepted for clearance items",
  },
  {
    label: "return not accepted for custom orders",
    value: "return not accepted for custom orders",
  },
];

export const PAYMENT_METHODS_VALUES = [
  // General
  { label: "Cash on Delivery", value: "cod" },
  { label: "Credit/Debit Card", value: "card" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Mobile Wallet", value: "mobile_wallet" },

  // Egypt
  { label: "Fawry", value: "fawry" },
  { label: "Vodafone Cash", value: "vodafone_cash" },
  { label: "Orange Money", value: "orange_money" },
  { label: "Etisalat Cash", value: "etisalat_cash" },

  // Gulf
  { label: "STC Pay", value: "stc_pay" }, // KSA, Bahrain
  { label: "Mada", value: "mada" }, // Saudi payment network
  { label: "BenefitPay", value: "benefitpay" }, // Bahrain
  { label: "KNET", value: "knet" }, // Kuwait
  { label: "OmanNet", value: "omannet" }, // Oman
  { label: "NAPS", value: "naps" }, // Qatar

  // North Africa
  { label: "CIB Smart Wallet", value: "cib_smart_wallet" }, // Egypt
  { label: "BaridPay", value: "baridpay" }, // Morocco
  { label: "D17", value: "d17" }, // Tunisia

  // International
  { label: "PayPal", value: "paypal" },
  { label: "Apple Pay", value: "apple_pay" },
  { label: "Google Pay", value: "google_pay" },
];

export const CURRENCIES_VALUES = [
  { label: "EGP", value: "EGP" }, // Egypt & local market
  { label: "USD", value: "USD" }, // Global standard
  { label: "EUR", value: "EUR" }, // Europe
  { label: "GBP", value: "GBP" }, // UK
  { label: "SAR", value: "SAR" }, // Saudi Arabia
  { label: "AED", value: "AED" }, // UAE
];
