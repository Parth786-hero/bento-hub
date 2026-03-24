import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCart";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch , useSelector} from "react-redux";
import { changeModalStatus } from "../../../store/slices/modalSlice";
export default function ProductCard(props) {
  const dispatch = useDispatch();
  const { getItemsPerCard, productLimitError } = useCartContext();
const {user} = useSelector(bag=>bag.login);

  const {
    description,
    name,
    price,
    image_url,
    quantity,
    id,
    category_name,
    discounted_price,
  } = props.data;
  const nums = getItemsPerCard(id);

  const navigate = useNavigate();

  function shoot(e) {
    navigate(`/${name}/${id}`, { state: { item: props.data } });
  }

  function handleEditFunc(e) {
    e.stopPropagation();
    dispatch(changeModalStatus({ show: true, mode: "UPDATE_PRODUCT", payload : props.data}));
    // if (props.onUpdated) props.onUpdated();
  }

  return (
    <>
      <div
        key={id}
        className="w-[12.5rem] h-[17.5rem] rounded-xl shadow-xl cursor-pointer border-gray-900"
        style={{
          backgroundColor: "white",
          border: "1px solid rgba(0 , 0 , 0 , .2)",
        }}
        onClick={shoot}
      >
        <div className="w-full h-[45%] overflow-hidden p-4 relative">
          {
            user.email === "kapoorparth096@gmail.com" && <i
            className="absolute top-1 left-2 fa-solid fa-pencil grid text-center items-center justify-center block shadow-xl rounded-full text-md bg-gray-200 hover:scale-110"
            onClick={handleEditFunc}
            style={{ padding: ".7rem", width: "2.5rem", height: "2.5rem" }}
          ></i>
          }
          {discounted_price > 0 && (
            <div
              className="bg-green text-white w-[2.2rem] h-[2.2rem] rounded-b-full text-[11px] text-center p-2 font-extrabold tracking-wide absolute right-2 top-0 leading-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${Math.floor(100 - (discounted_price / price) * 100)}% off`}
            </div>
          )}
          <img
            src={`/${image_url}`}
            alt="scene description"
            className="w-full h-full object-contain transition-transform duration-300"
          />
        </div>

        <div className="w-full h-[55%] p-3 flex-col flex justify-betwee pb-4">
          <h2 className="font-extrabold tracking-wide">{name}</h2>
          {description.length > 15 ? (
            <p className="text-[14px] tracking-wide leading-snug my-1">
              {description.slice(0, 16) + "..."}
            </p>
          ) : (
            <p className="text-[14px] tracking-wide leading-snug my-1">
              {description}
            </p>
          )}
          <p className="text-[12px] tracking-wide text-gray-500">{quantity}</p>
          <div className="relative flex items-center justify-between self-end w-full h-[2.7rem] mt-3">
            {productLimitError?.id === id && (
              <p className="text-[11px] text-red-600 absolute right-0 top-[-1rem] font-bold tracking-wide animate-fade">
                {productLimitError.message}
              </p>
            )}

            <div>
              {discounted_price > 0 && (
                <p className="font-bold text-[13px] ">₹{discounted_price}</p>
              )}
              <p
                className={`font-bold text-[12.5px] ${
                  discounted_price > 0 ? "text-gray-400 line-through" : ""
                }`}
              >
                ₹{price}
              </p>
            </div>
            <AddToCartBtn id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
