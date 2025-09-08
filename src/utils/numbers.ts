export const formatNumber = (number = 0) => {
  return new Intl.NumberFormat().format(number);
};

export const formatMoney = (number = 0, lang = "en", currency = "EGP") => {
  return new Intl.NumberFormat(lang, { style: "currency", currency }).format(
    number
  );
};

export const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }
  return ((current - previous) / previous) * 100;
};
