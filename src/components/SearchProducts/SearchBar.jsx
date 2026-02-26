
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import CartButton from "../main/CartButton";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../store/slices/searchProductsSlice";
import { clearResults } from "../../store/slices/searchProductsSlice";
export default function SearchBar({search , setSearch}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const id = setTimeout(() => {
      if (search.trim()) {
        dispatch(searchProducts(search));
      }else{
        dispatch(clearResults());
      }
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [search, dispatch]);

  return (
    <>
      <div className="fixed w-full top-0 left-0 z-50 bg-gray-100">
        <nav
          className={`w-[95%] mx-auto flex items-center justify-between py-2 mt-2`}
        >
          <h2
            className="font-black tracking-wide text-2xl flex items-center justify-between cursor-pointer"
            id="logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
          >
            <span>
              <i className="fa-solid fa-blog"></i>
            </span>
            Bento <span className="text-green">Hub</span>
          </h2>

          <form className="relative flex items-center max-w-4xl mx-auto w-[100%] overflow-hidden px-1">
            <i className="fa-solid fa-magnifying-glass absolute text-[1rem] text-gray-500 left-[.8rem] top-1/2 transform -translate-y-1/2"></i>
            {search && (
              <i
                className="fa-solid fa-xmark absolute text-[1rem] text-gray-900 right-[1rem] top-1/2 transform -translate-y-1/2 cursor-pointer p-2 flex items-center justify-center hover:scale-110"
                onClick={() => {
                  dispatch(clearResults()); 
                  setSearch("");
                }}
                style={{ width: "2rem" }}
              ></i>
            )}

            <input
              type="text"
              placeholder="Search items..."
              className="rounded-lg px-9 py-3 focus:outline-none w-full"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0 , 0 , 0 , .2)",
              }}
            />
          </form>

          <section className="flex items-center gap-x-8">
            <CartButton />
          </section>
        </nav>
      </div>
    </>
  );
}
