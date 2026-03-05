import { useLocation } from "react-router-dom";
import CatDesign from "./CatDesign";
import Loader from "../../../utilis/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubCategoryById } from "../../../store/slices/categorySlice";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../Products/ProductCard";
export default function Design() {
  const location = useLocation();

  const bag = decodeURIComponent(location.pathname).split("/");
  const dispatch = useDispatch();
  const { data, loading, error: e1 } = useSelector((bag) => bag.category);
  const [selected, setSelected] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchAllSubCategoryById(bag[2]));
  }, [dispatch]);
  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    async function fetchProducts() {
      setLoader(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/getProductsSubCatWise/${selected}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Internal Server Erro");
        }

        setProducts(data.products);
      } catch (e) {
        setError("Failed to fetch");
      } finally {
        setLoader(false);
      }
    }

    if (selected) {
      fetchProducts();
    }
  }, [selected, dispatch]);

  return (
    <>
      <div className="mt-30 h-[70vh] shadow-xl rounded-md bg-gray-100 border-1  border-gray-300 overflow-hidden">
        <h2
          className="border-b border-gray-300 font-extrabold tracking-wider h-[10%] flex items-center px-5"
          style={{ backgroundColor: "white" }}
        >
          {bag[bag.length - 1]}
        </h2>
        <div className="grid grid-cols-[8%_92%] h-[90%]">
          <div
            className="h-100% overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start gap-1 px-1 py-2"
            style={{ backgroundColor: "white" }}
          >
            {loading && (
              <div className="h-[90%] flex justify-center items-center mt-4 overflow-hidden">
                <Loader />
              </div>
            )}
            {e1 && (
              <div className="h-[90%] flex justify-center items-center mt-4 overflow-hidden text-red-500 tracking-wide text-[12px]">
                {e1}
              </div>
            )}
            {!e1 &&
              !loading &&
              data.map((obj) => (
                <CatDesign
                  key={obj.id}
                  data={obj}
                  selected={selected === obj.id}
                  selectedId={selected === obj.id && obj.id}
                  onSelect={() => setSelected(obj.id)}
                />
              ))}
          </div>
          <div className="relative p-3 overflow-y-auto">
            {!error && loader && <Loader />}
            {!loader && error && (
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-[1.3rem]">
                {error}
              </p>
            )}
            <div className=" relative grid grid-cols-5 py-1 flex-wrap gap-5 place-items-center h-auto">
              {products.length === 0 ? <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] mt-32 text-center text-gray-500 text-4xl tracking-wider font-bold">Sorry We are still buying products of this category :/</div> : 
                products.map((obj, id) => {
                  return <ProductCard key={obj.id} data={obj} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
