export const formatPrice = (price) => {
  return Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
};
