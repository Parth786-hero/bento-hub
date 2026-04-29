export function calculateTotalPrice(cartItems, allProducts) {
    return cartItems.reduce((acc, curr) => {
      const product = allProducts.find((p) => p.id === curr.id);
      if (!product) return acc;
      const unitPrice =
        product.discounted_price > 0 ? product.discounted_price : product.price;
      return acc + curr.count * unitPrice;
    }, 0);
  }
  
  export function calculateGrandTotal(basePrice) {
    const deliveryCharge = basePrice < 100 ? 30 : 0;
    const handlingCharge = 11;
    return basePrice + deliveryCharge + handlingCharge;
  }
  
export function checkAuthority(email){
  return email === "kapoorparth096@gmail.com";
}

export function formatReadableDateTime(isoString) {
  const date = new Date(isoString);

  // Format with local date and time
  return date.toLocaleString("en-IN", {
    weekday: "long",    // e.g. Tuesday
    year: "numeric",    // e.g. 2026
    month: "long",      // e.g. April
    day: "numeric",     // e.g. 28
    hour: "2-digit",    // e.g. 07
    minute: "2-digit",  // e.g. 32
   
    hour12: true        // 12-hour format with AM/PM
  });
}
