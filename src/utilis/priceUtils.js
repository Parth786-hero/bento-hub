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
  