import { useCartContext } from "../../../hooks/useCart";
export default function AddToCartBtn({ id }) {
  const { getItemsPerCard, addToCart, removeFromCart , error} = useCartContext();
  const nums = getItemsPerCard(id);
 
  return (
    <>
      {nums === 0 ? (
        <button
          className="product-btn shadow-xl font-semibold cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
            // triggerSnapshot();
          }}
          disabled={error ? true : false}
        >
          Add
        </button>
      ) : (
        <div
          className="border-green border-1 adding-to-cart-btn shadow-xl font-semibold flex items-center justify-between gap-2 cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <i
           disabled={error ? true : false}
            className="fa-solid fa-minus inline-block cursor-pointer"
            onClick={() => {
              removeFromCart(id);
              // triggerSnapshot();
            }}
          ></i>
          <p className="font-extrabold text-[16px]">{nums}</p>
          <i
           disabled={error ? true : false}
            className="fa-solid fa-plus inline-block cursor-pointer"
            onClick={() => {
              addToCart(id);
              // triggerSnapshot();
            }}
          ></i>
        </div>
      )}
    </>
  );
}
