import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../store/slices/productSlice";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCart";
import { toast } from "react-toastify";
export default function Products() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((bag) => bag.products);

  const { error: fault } = useCartContext();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  if (loading) {
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold">
          Fetching Products...
        </p>
      </div>
    );
  }
  if (fault) {
    toast.error(fault);
  }
  if (error)
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold text-red-500">
          Error: {error}
        </p>
      </div>
    );

  const sliceLength = isSmallScreen ? 3 : 6;
  return (
    <>
      <div className="mt-2">
        {products.map((obj, id) => {
          return (
            <div key={id} className="mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl md:text-3xl md:tracking-wide md:leading-snug mb-2">
                  {obj.category_name}
                </h2>
                {obj.products.length > sliceLength && (
                  <p
                    className="text-green font-extrabold cursor-pointer tracking-wide text-[1.1rem]"
                    onClick={() =>
                      navigate(`/itemspercategory/${obj.category_name}`)
                    }
                  >
                    See All
                  </p>
                )}
              </div>
              {
                <div className="grid grid-cols-3 md:grid-cols-6 md:py-1 flex-wrap gap-2 md:gap-5">
                  {/* {
                  obj.products.length > 6 ?  obj.products.slice(0 , 6).map((ele) => {
                    return <ProductCard key={ele.id} data={ele} />;
                  }) :  obj.products.map((ele) => {
                    return <ProductCard key={ele.id} data={ele} />;
                  })
                 } */}
                  {(obj.products.length > sliceLength
                    ? obj.products.slice(0, sliceLength)
                    : obj.products
                  ).map((ele) => (
                    <ProductCard key={ele.id} data={ele} />
                  ))}
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  );
}
