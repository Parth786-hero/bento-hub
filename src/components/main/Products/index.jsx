import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../store/slices/productSlice";
import ProductCard from "./ProductCard";
import { useCartContext } from "../../../hooks/useCart";
import { toast } from "react-toastify";
export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((bag) => bag.products);
  const {error : fault} = useCartContext();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold">
          Fetching Products...
        </p>
      </div>
    );
  }
  if(fault){
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
  return (
    <>
      <div className="mt-2">
        {products.map((obj , id) => {
          return (
            <div key={id} className="mb-12">
              <div className="flex items-center justify-between">
              <h2 className="font-bold text-3xl tracking-wide leading-snug mb-2">
                {obj.category_name}
              </h2>
              {
                obj.products.length > 6 && <p className="text-green font-extrabold cursor-pointer tracking-wide text-[1.1rem]">See All</p> 
              }
              </div>
              {
                <div className="grid grid-cols-6 py-1 flex-wrap gap-5">
                 {
                  obj.products.length > 6 ?  obj.products.slice(0 , 6).map((ele) => {
                    return <ProductCard key={ele.id} data={ele} />;
                  }) :  obj.products.map((ele) => {
                    return <ProductCard key={ele.id} data={ele} />;
                  })
                 }
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  );
}
