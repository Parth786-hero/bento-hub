import SearchBar from "./SearchBar"
import { useState } from "react";
import ProductCard from "../Products/ProductCard";
export default function AdvanceSearch() {
 const [item , setItem] = useState([]);
 
 return(
  <>
  <div className="min-h-[45vh] mt-25 relative">
    <SearchBar setItem={setItem}/>
    {
      item.length === 0 ? <div className="text-5xl text-gray-400 mt-4 tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] text-center leading-snug">
      Experience the same products with this advanced serach bar.
    </div> : <div className="grid grid-cols-6 py-1 flex-wrap gap-5 py-6" >
      {
        item.map(obj=><ProductCard key={obj.id} data = {obj}/>)
      }
    </div>
    }
    </div>
  </>
 );
}
