import { useState, useEffect , useRef} from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubCategoryByCatId } from "../store/slices/subcategorySlice";
import { insertIntoProducts , updateIntoProductsById} from "../store/slices/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../store/slices/productSlice";
import {toast} from 'react-toastify';
import { changeModalStatus } from "../store/slices/modalSlice";
import { API_URL } from "../main";
export default function NewProduct() {
  // const dispatch = useDispatch();
  // const didMountRef = useRef(false);
  // // const { data  } = useSelector((bag) => bag.category);
  // const [data , setData] = useState([]);
  // const { data: bag, error , loading : l} = useSelector((bag) => bag.subCategory);
  // const { loading , error : e} = useSelector((bag) => bag.products);
  // const { mode, payload } = useSelector((state) => state.modal);
  
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   discounted_price: 0.0,
  //   image_url: "",
  //   stock: "",
  //   quantity: "",
  //   category_id: "",
  //   sub_category_id: "",
  // });
 
  // useEffect(()=>{
  //   async function fetchCat(){
  //     try{
  //       const res = await fetch("http://localhost:5000/api/category", {
  //         method: "GET",
  //         credentials: "include",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if(res.ok){
  //         const ans = await res.json();
         
  //         setData(ans?.categories);
  //       }
  //     }catch(e){
  //       console.log(e);
  //     }
  //   }
  //   fetchCat();
  // } , []);
  // const handleChange = async (e) => {
  //   const { name, value } = e.target;
  //   if (name === "category_id") {
  //     await dispatch(fetchSubCategoryByCatId(value)).unwrap();
  //     setFormData(prev => ({
  //       ...prev,
  //       category_id: Number(value),
  //       sub_category_id: "" // temporarily clear until bag updates
  //     }));
  //     return;
  //   }
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: name.includes("_id") ? Number(value) : value
  //   }));
  // };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // normalize IDs to numbers (or null if empty)
  //     const normalizedFormData = {
  //       ...formData,
  //       price: Number(formData.price),
  //       discounted_price: Number(formData.discounted_price),
  //       stock: Number(formData.stock),
  //       category_id: formData.category_id ? Number(formData.category_id) : null,
  //       sub_category_id: formData.sub_category_id ? Number(formData.sub_category_id) : null,
  //     };
  
  //     let actionResult;
  
  //     if (mode === "ADD_PRODUCT") {
  //       actionResult = await dispatch(insertIntoProducts(normalizedFormData));
  //     } else if (mode === "UPDATE_PRODUCT") {
  //       actionResult = await dispatch(updateIntoProductsById({ id: payload.id, ...normalizedFormData }));
  //     }
  
  //     unwrapResult(actionResult); // throws if rejected
  
  //     if (mode === "UPDATE_PRODUCT") {
  //       dispatch(changeModalStatus(false));
  //     }
  
  //     setFormData({
  //       name: "",
  //       description: "",
  //       price: "",
  //       discounted_price: 0.0,
  //       image_url: "",
  //       stock: "",
  //       quantity: "",
  //       category_id: "",
  //       sub_category_id: "",
  //     });
  
  //     // refresh product list
  //     dispatch(fetchAllProducts());
  //   } catch (err) {
  //     console.error(`${mode} failed:`, err);
  //     // show toast or error message here
  //   }
  // };
  
  // useEffect(() => {
  //   if (mode === "UPDATE_PRODUCT" && payload) {
  //     setFormData({
  //       name: payload.name || "",
  //       description: payload.description || "",
  //       price: payload.price || "",
  //       discounted_price: payload.discounted_price || 0.0,
  //       image_url: payload.image_url || "",
  //       stock: payload.stock || 0,
  //       quantity: payload.quantity || "",
  //       category_id: payload.category_id || "",
  //       sub_category_id: payload.sub_category_id || "",
  //     });
  //     if (payload.category_id) {
  //       dispatch(fetchSubCategoryByCatId(payload.category_id));
  //     }
  //   }
  // }, [mode, payload, dispatch]);
  // if(error || e){
  //   toast.error(error || e);
  // }
  // useEffect(() => {
  //   console.log("Hey I am trigered");
  //   if (didMountRef.current) {
  //     // ✅ This runs only when category_id changes after mount
  //     if (bag && bag.length > 0 && mode === "UPDATE_PRODUCT") {
  //       setFormData(prev => ({
  //         ...prev,
  //         sub_category_id: bag[0].id   // assign first subcategory
  //       }));
  //     }
  //   } else {
  //     // mark that we've mounted
  //     didMountRef.current = true;
  //   }
   
  // }, [bag , formData.category_id]);
  const dispatch = useDispatch();
const didMountRef = useRef(false);

const [data, setData] = useState([]);
const { data: bag, error, loading: l } = useSelector((state) => state.subCategory);
const { loading, error: e } = useSelector((state) => state.products);
const { mode, payload } = useSelector((state) => state.modal);

const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  discounted_price: 0.0,
  image_url: "",
  stock: "",
  quantity: "",
  category_id: "",
  sub_category_id: "",
});

useEffect(() => {
  async function fetchCat() {
    try {
      const res = await fetch(`${API_URL}/api/category`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const ans = await res.json();
        setData(ans?.categories);
      }
    } catch (e) {
      console.log(e);
    }
  }
  fetchCat();
}, []);

const handleChange = async (e) => {
  const { name, value } = e.target;
  if (name === "category_id") {
    await dispatch(fetchSubCategoryByCatId(value)).unwrap();
    setFormData((prev) => ({
      ...prev,
      category_id: Number(value),
      sub_category_id: "", // clear until bag updates
    }));
    return;
  }
  setFormData((prev) => ({
    ...prev,
    [name]: name.includes("_id") ? Number(value) : value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const normalizedFormData = {
      ...formData,
      price: Number(formData.price),
      discounted_price: Number(formData.discounted_price),
      stock: Number(formData.stock),
      category_id: formData.category_id ? Number(formData.category_id) : null,
      sub_category_id: formData.sub_category_id ? Number(formData.sub_category_id) : null,
    };

    let actionResult;
    if (mode === "ADD_PRODUCT") {
      actionResult = await dispatch(insertIntoProducts(normalizedFormData));
    } else if (mode === "UPDATE_PRODUCT") {
      actionResult = await dispatch(updateIntoProductsById({ id: payload.id, ...normalizedFormData }));
    }

    unwrapResult(actionResult);

    if (mode === "UPDATE_PRODUCT") {
      dispatch(changeModalStatus(false));
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      discounted_price: 0.0,
      image_url: "",
      stock: "",
      quantity: "",
      category_id: "",
      sub_category_id: "",
    });

    dispatch(fetchAllProducts());
  } catch (err) {
    console.error(`${mode} failed:`, err);
  }
};

useEffect(() => {
  if (mode === "UPDATE_PRODUCT" && payload) {
    setFormData({
      name: payload.name || "",
      description: payload.description || "",
      price: payload.price || "",
      discounted_price: payload.discounted_price || 0.0,
      image_url: payload.image_url || "",
      stock: payload.stock || 0,
      quantity: payload.quantity || "",
      category_id: payload.category_id || "",
      sub_category_id: payload.sub_category_id || "", // keep payload value
    });
    if (payload.category_id) {
      dispatch(fetchSubCategoryByCatId(payload.category_id));
    }
  }
}, [mode, payload, dispatch]);

if (error || e) {
  toast.error(error || e);
}

// ✅ Corrected effect
useEffect(() => {
  if (didMountRef.current) {
    // only run when category_id changes after mount
    if (bag && bag.length > 0 && mode === "UPDATE_PRODUCT") {
      setFormData((prev) => ({
        ...prev,
        sub_category_id: prev.sub_category_id || bag[0].id, 
        // keep existing payload value if present, otherwise assign first subcategory
      }));
    }
  } else {
    didMountRef.current = true;
  }
}, [bag, formData.category_id]);

  
  
  return (
    <div className="flex items-center justify-between relative h-[26rem] overflow-y-auto">
      <form
        className="rounded-lg p-4 w-full relative mt-32"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category_id"
              className="block text-gray font-bold mb-2"
            >
              Select Category
            </label>
            <select
              required
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            >
              <option value="">-- Choose Category --</option>
              {data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sub_category_id"
              className="block text-gray font-bold mb-2"
            >
              Select Sub Category
            </label>
            <select
            disabled={l}
            required
              id="sub_category_id"
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleChange}
              // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green
              ${error ? "border-red-500 text-red-600" : "border-gray-300"} 
              ${l ? "text-gray-600 font-extrabold" : ""}`}
                      >
              {l && <option value="" style={{color : "red!important"}}>Fetching subcategories...</option>}
              {error && <option value="" className="text-red-500" style={{color : "red"}}>Failed to load subcategories</option>}
              {!loading && !error && mode === "ADD_PRODUCT" && (
                <option value="">-- Choose Sub Category --</option>
              )}
              {/* <option value="">-- Choose Sub Category --</option> */}

              {!loading &&
                !error &&
                bag.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter product price"
              required
            />
          </div>

          <div>
            <label
              htmlFor="discounted_price"
              className="block text-gray font-bold mb-2"
            >
              Discounted Price
            </label>
            <input
              type="number"
              step="0.01"
              id="discounted_price"
              name="discounted_price"
              value={formData.discounted_price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter discounted price"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-gray font-bold mb-2"
            >
              Image Name
            </label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-gray font-bold mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-gray font-bold mb-2"
            >
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter product quantity"
              required
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-gray font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter product description"
              required
            />
          </div>
        </div>

        {mode === "UPDATE_PRODUCT" ? (
          loading ? (
            <motion.button
              // type="submit"
              className="w-full bg-green text-white font-semibold py-2 px-3 rounded-md hover:bg-green transition duration-300 cursor-pointer mt-4"
            >
              Updating product...
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className="w-full bg-green text-white font-semibold py-2 px-3 rounded-md hover:bg-green transition duration-300 cursor-pointer mt-4"
            >
              Update Product
            </motion.button>
          )
        ) : loading ? (
          <motion.button
            // type="submit"
            className="w-full bg-green text-white font-semibold py-2 px-3 rounded-md hover:bg-green transition duration-300 cursor-pointer mt-4"
          >
            Saving product...
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            className="w-full bg-green text-white font-semibold py-2 px-3 rounded-md hover:bg-green transition duration-300 cursor-pointer mt-4"
          >
            Save Product
          </motion.button>
        )}
      </form>
    </div>
  );
}
