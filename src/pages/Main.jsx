import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Special from "../components/main/Special";
import Category from "../components/main/Category";
import Footer from "../components/Footer";
import Products from "../components/main/Products";
import SearchProducts from "../components/SearchProducts";
import SpecificItem from "../components/main/SpecificItem";
import Design from "../components/main/Design";
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
          <Route path="/:category/:id" element={<SpecificItem />} />
          <Route path="/:name/:id/:name" element={<Design />} />
        </Routes>
        <br />
        <Footer />
      </>
    </div>
  );
}
