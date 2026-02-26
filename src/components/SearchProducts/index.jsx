import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import Loader from "../../utilis/Loader";
import ProductCard from "../main/Products/ProductCard";
import { useState } from "react";
export default function SearchProducts() {
  const { data, loading, error } = useSelector((bag) => bag.searchProducts);
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="min-h-[45vh] mt-25 relative">
        <SearchBar search = {search} setSearch={setSearch}/>
        {loading ? (
          <Loader />
        ) : data.length === 0 && search ? (
          <div className="text-5xl text-gray-400 mt-4 tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] text-center">
           We dont have that products :/
          </div>
        ) : data.length === 0 && (
          <div className="text-5xl text-gray-400 mt-4 tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] text-center">
            Search You fav Products here...
          </div>
        )}
        {data.length > 0 && (
          <div className="grid grid-cols-6 py-6 flex-wrap gap-5">
            {data.map((obj) => {
              return <ProductCard key={obj.id} data={obj} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
