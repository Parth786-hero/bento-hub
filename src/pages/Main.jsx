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
import CartButton from "../components/main/CartButton";
import { useSelector } from "react-redux";
export default function Main() {
  const { isAuthenticated } = useSelector((bag) => bag.login);
  return (
    <div className="max-w-[95%] mx-auto min-h-screen relative">
      <Navbar />
      {isAuthenticated && (
       <section className="fixed bottom-6 z-200 right-6 flex items-center gap-x-8 md:hidden">
       <CartButton />
     </section>
     
      )}
      <>
        <Routes>
          {/* Default route "/" shows your main layout */}
          <Route
            path="/"
            element={
              <>
                <div className="overflow-hidden">
                  <Special />
                  <Category />
                  <Products />
                </div>
              </>
            }
          />
          <Route path="/s" element={<SearchProducts />} />
          <Route path="/advanceSearch" element={<AdvanceSearch />} />
          <Route path="/productsOnScroll" element={<ProductsOnScroll />} />
          <Route path="/:category/:id" element={<SpecificItem />} />
          <Route path="/:name/:id/:name" element={<Design />} />
          <Route
            path="/itemspercategory/:id"
            element={<AllItemsPerCategory />}
          />
        </Routes>
        <br />
        <Footer />
      </>
    </div>
  );
}
