
export const truncateDescription = (description: string | undefined, maxLength: number) => {
    if (!description) {
      return "";
    }
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }; 

// export const formatPriceWithSymbol = (price: number | undefined, symbol: string = "₹") => {
//     if (price === undefined || price === null) {
//       return `${symbol}0.00`;
//     }
//     return `${symbol}${price.toFixed(2)}`;
//   };

export const formatPriceWithSymbol = (price: number | string | undefined, symbol: string = "₹") => {
  if (price === undefined || price === null) {
    return `${symbol}0.00`;
  }
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    return `${symbol}0.00`;
  }
  return `${symbol}${numericPrice.toFixed(2)}`;
};

  // Calculate discount percentage
  export const calculateDiscount = (basePrice: number, discountedPrice: number) => {
    if (basePrice <= 0) return "0%";
    const discount = ((basePrice - discountedPrice) / basePrice) * 100;
    return `${discount.toFixed(0)}%`;
  };

  //set local storage
  export const storeLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage
        .setItem(key, JSON.stringify(value));
    }
  }

  //get local storage
  export const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }


  