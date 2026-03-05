// import { useCartContext } from "../../../hooks/useCart";
import { useCartContext } from "../../../hooks/useCart";
export default function MiniBtn({ id }) {
  const { getItemsPerCard, addToCart, removeFromCart , error} = useCartContext();
  const nums = getItemsPerCard(id);
 
  return (
    <>
      {nums === 0 ? (
        <button
          className={`product-btn font-semibold cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
            
            // triggerSnapshot();
          }}
          disabled={error ? true : false}
          style={{backgroundColor : error ? "gray" : "var(--color-green)"}}
        >
          Add
        </button>
      ) : (
        <div
          className="adding-to-cart-btn-2 font-semibold flex items-center justify-between gap-2 cursor-auto"
          onClick={(e) => e.stopPropagation()}
          style={{backgroundColor : error ? "gray" : "var(--color-green)"}}
        >
          <i
           disabled={error ? true : false}
          
            className="fa-solid fa-minus inline-block cursor-pointer"
            onClick={() => {
              removeFromCart(id);
              // triggerSnapshot();
            }}
          ></i>
          <p className="font-extrabold text-[14px]">{nums}</p>
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
