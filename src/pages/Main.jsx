// import { Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Special from "../components/main/Special";
// import Category from "../components/main/Category";
// import Footer from "../components/Footer";
// import Products from "../components/main/Products";
// import SearchProducts from "../components/SearchProducts";
// import SpecificItem from "../components/main/SpecificItem";
// import Design from "../components/main/Design";
// import ProductsOnScroll from "../components/main/ProductsOnScroll";
// import AllItemsPerCategory from "../components/main/AllItemsPerCategory";
// import AdvanceSearch from "../components/main/AdvanceSearch/index.jsx";
// import MyOrders from "../components/main/customers/MyOrders";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// export default function Main() {
//   const { pathname } = useLocation();
//   const {show , durationMinutes} = useSelector(bag=>bag.hitDiscount);
 
//   useEffect(() => {
//     // only scroll to top on specific routes
//     if (pathname === "/") {
//       window.scrollTo(0, 0);
//     }
//   }, [pathname]);
//   return (
//     <div className="max-w-[95%] mx-auto min-h-screen">
//      {
//       show &&  <div
//       className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
//               bg-green text-white shadow-lg 
//               w-[90%] max-w-xl rounded-lg 
//               flex items-center justify-center 
//               px-4 py-1.5 z-50 animate-bounce"
//     >
//       <p className="font-bold tracking-wider text-lg flex items-center justify-between w-full">
//         🔥Discount Activated for {durationMinutes} minutes!
//         <span>0:34</span>
//       </p>
//     </div>
//      }
//       <Navbar />

//       <>
//         <Routes>
//           {/* Default route "/" shows your main layout */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <div className="overflow-hidden">
//                   <Special />
//                   <Category />
//                   <Products />
//                 </div>
//               </>
//             }
//           />
//           <Route path="/s" element={<SearchProducts />} />
//           <Route path="/advanceSearch" element={<AdvanceSearch />} />
//           <Route path="/productsOnScroll" element={<ProductsOnScroll />} />
//           <Route path="/:category/:id" element={<SpecificItem />} />
//           <Route path="/:name/:id/:name" element={<Design />} />
//           <Route
//             path="/itemspercategory/:id"
//             element={<AllItemsPerCategory />}
//           />
//           <Route path="/my-orders" element={<MyOrders />} />
//         </Routes>
//         <br />
//         <Footer />
//       </>
//     </div>
//   );
// }
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Special from "../components/main/Special";
import Category from "../components/main/Category";
import Footer from "../components/Footer";
import Products from "../components/main/Products";
import SearchProducts from "../components/SearchProducts";
import SpecificItem from "../components/main/SpecificItem";
import Design from "../components/main/Design";
import ProductsOnScroll from "../components/main/ProductsOnScroll";
import AllItemsPerCategory from "../components/main/AllItemsPerCategory";
import AdvanceSearch from "../components/main/AdvanceSearch/index.jsx";
import MyOrders from "../components/main/customers/MyOrders";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { switchOn } from "../store/slices/discountScheduler";
import confetti from "canvas-confetti";
export default function Main() {
  const { pathname } = useLocation();
  const { show, durationMinutes} = useSelector((bag) => bag.hitDiscount);
  const dispatch = useDispatch();
  // local countdown state in seconds
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes ? durationMinutes * 60 : 0
  );

  useEffect(() => {
    // reset countdown whenever a new discount is triggered
    if (show && durationMinutes) {
      setRemainingSeconds(durationMinutes * 60);
    }
  }, [show, durationMinutes]);

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);
  useEffect(() => {
    const saved = localStorage.getItem("discount");
    if (saved) {
      const { startedAt, durationMinutes } = JSON.parse(saved);
      const elapsed = (Date.now() - startedAt) / 1000;
      const remaining = durationMinutes * 60 - elapsed;
  
      if (remaining > 0) {
        // ✅ Banner should show again
        setRemainingSeconds(Math.floor(remaining));
        // setBannerVisible(true);   // local state for banner
        // setTriggerDisabled(true); // local state for disabling button
        dispatch(switchOn());
      } else {
        localStorage.removeItem("discount");
      
      }
    }
  }, []);
  

  // format seconds into mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  useEffect(() => {
    if (show) {
      confetti({
        particleCount: 1500, // increase this number
        spread: 360,         // full circle
        origin: { y: 0.7 }
      });
    }
  }, [show]);
  

  return (
    <div className="max-w-[95%] mx-auto min-h-screen">
    

      {show && (
        <div
          className={`fixed bottom-0.5 md:bottom-4 left-1/2 transform -translate-x-1/2 
          ${remainingSeconds <= 10 ?"bg-gray-600" : "bg-gray-900"} text-white shadow-lg 
          w-[90%] max-w-xl rounded-lg 
          flex items-center justify-center 
          px-3.5 py-1 z-50 animate-bounce`}
        >
          <p className="font-bold tracking-wider text-md md:text-lg">
            🔥50% OFF Activated for<span
            className={`ml-1.5 ${
              remainingSeconds <= 10 ? "text-red-500" : ""
            }`}
          >
            {formatTime(remainingSeconds)}
          </span> &nbsp;minutes!🔥
           
          </p>
        </div>
      )}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-hidden">
              <Special />
              <Category />
              <Products />
            </div>
          }
        />
        <Route path="/s" element={<SearchProducts />} />
        <Route path="/advanceSearch" element={<AdvanceSearch />} />
        <Route path="/productsOnScroll" element={<ProductsOnScroll />} />
        <Route path="/:category/:id" element={<SpecificItem />} />
        <Route path="/:name/:id/:name" element={<Design />} />
        <Route path="/itemspercategory/:id" element={<AllItemsPerCategory />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <br />
      <Footer />
    </div>
  );
}
