import { useLocation } from "react-router-dom";
import CatDesign from "./CatDesign";
import { useDispatch  , useSelector} from "react-redux";
import { fetchCategory } from "../../../store/slices/categorySlice";
import { useEffect } from "react";
export default function Design() {
  const location = useLocation();
  const bag = decodeURIComponent(location.pathname).split("/");
  const dispatch = useDispatch();
  const {data , loading , error} = useSelector(bag=>bag.category);
  console.log(data , error , loading);
  useEffect(()=>{
    dispatch(fetchCategory());
  } , [dispatch]);
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
            className="h-100% overflow-auto flex flex-col items-center justify-start gap-2 py-3"
            style={{ backgroundColor: "white" }}
          >
          {
            data.map(obj=> <CatDesign key={obj.id} data={obj}/>)
          }
          </div>
          <div className="p-3">I am father grid</div>
        </div>
      </div>
    </>
  );
}
