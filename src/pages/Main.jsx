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

export default function Main() {
  return (
    <div className="max-w-[95%] mx-auto min-h-screen">
      <Navbar />

      <>
        <Routes>
          {/* Default route "/" shows your main layout */}
          <Route
            path="/"
            element={
              <>
                <Special />
                <Category />
                <Products />
              </>
            }
          />
          <Route path="/s" element={<SearchProducts />} />
          <Route path="/advanceSearch" element={<AdvanceSearch />} />
          <Route path="/productsOnScroll" element={<ProductsOnScroll />} />
          <Route path="/:category/:id" element={<SpecificItem />} />
          <Route path="/:name/:id/:name" element={<Design />} />
          <Route path="/itemspercategory/:id" element={<AllItemsPerCategory/>}/>
        </Routes>
        <br />
        <Footer />
      </>
    </div>
  );
}
