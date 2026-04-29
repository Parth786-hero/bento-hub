import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utilis/Loader";
import { API_URL } from "../../../main";
import MyOrderCard from "./MyOrderCard";
export default function MyOrders() {
  const navigate = useNavigate();
  const [bag, setBag] = useState([]);
  const [loader , setLoader] = useState(false);
  const [error , setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchDetails(){
      try{
        setLoader(true);
        const res = await fetch(`${API_URL}/api/fetchOrderHistoryPerUser`, {
          headers: {
            "Authorization": `Bearer ${token}`, // send token in Authorization header
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
        
       setBag(data.orders);

      }catch(e){
        setError(e.message || "Something went wrong.")
      }finally{
        setLoader(false);
        
      }
    }
    fetchDetails();
  }, []);
  
  return (
    <>
      <div className="mt-44 md:mt-30">
       {
        loader ? <Loader/> : error ? <div  className="h-[25rem] flex flex-col gap-3 items-center justify-center text-xl text-center tracking-wide text-red-500">{error}</div> : bag.length === 0 ?  <h1 className="h-[25rem] flex flex-col gap-3 items-center justify-center text-xl text-center tracking-wide">
        <ShoppingCart className="" />
        <span>
          lets create history now by ordering from{" "}
          <span
            className="text-green font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            BentoHub.
          </span>
        </span>
      </h1> : <div className="md:w-[65%] mx-auto">
        {
          bag.map(obj=>{
            return <MyOrderCard key={obj["cart_id"]} {...obj}/>
          })
        }
      </div>
       }
      </div>
    </>
  );
}
