import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../../store/slices/categorySlice";
export default function Category() {
  const { data, loading, error } = useSelector((bag) => bag.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold">
          Loading categories...
        </p>
      </div>
    );
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
     <h2 className="font-bold text-3xl tracking-wide leading-snug mt-6">Featured Categories</h2>
      <div className="my-1 grid grid-cols-11 mb-8">
       
        {
        data.map(obj=><CategoryCard key={obj.id} data={obj}/>)
        }
      </div>
    </>
  );
}
