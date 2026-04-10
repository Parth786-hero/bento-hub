import { useState, useEffect } from "react";
import CartButton from "../CartButton";
import { useSelector, useDispatch } from "react-redux";
import {
  searchProducts,
  clearResults,
} from "../../../store/slices/searchProductsSlice";

export default function SearchBar({ setItem }) {
  // term now has two properties: text and id
  const [term, setTerm] = useState({ text: "", id: null });
  const { data, loading, error } = useSelector((bag) => bag.searchProducts);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const dispatch = useDispatch();

  function handleTrigger(e) {
    e.preventDefault();
  }

  const handleSelect = (item) => {
    console.log(item);
    // set both text and id when selecting
    setTerm({ text: item.name, id: item.id });
    dispatch(clearResults());
    setShowSuggestions(false);
    if (setItem) setItem([item]); // pass selected item up to parent
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (term.text.trim()) {
        dispatch(searchProducts(term.text));
      } else {
        dispatch(clearResults());
      }
    }, 300);

    return () => clearTimeout(id);
  }, [term.text, dispatch]);

  console.log(term, data);

  return (
    <>
      <div className="fixed w-full top-0 left-0 z-50 bg-gray-100">
        <nav className="w-[95%] mx-auto flex items-center justify-between py-5">
          <h2
            className="font-black tracking-wide text-2xl flex items-center justify-between cursor-pointer"
            id="logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
          >
            <span>
              <i className="fa-solid fa-blog"></i>
            </span>
            Bento <span className="text-green">Hub</span>
          </h2>

          <div className="w-1/2 relative">
            <p className="absolute text-center bottom-12 left-1/2 transform -translate-x-1/2 text-[12.5px] font-extrabold text-gray-600 tracking-wide w-full">
              Welcome to more enhanced, robust and advanced{" "}
              <span className="text-green">Search bar !</span>
            </p>

            {/* Input */}
            <form
              className="relative flex items-center w-full mx-auto h-12"
              onSubmit={handleTrigger}
            >
              <i className="fa-solid fa-magnifying-glass absolute text-[1rem] text-gray-500 left-[.6rem] top-1/2 transform -translate-y-1/2"></i>
              <i
                className="fa-solid fa-xmark absolute text-[1rem] text-gray-900 right-[1rem] top-1/2 transform -translate-y-1/2 cursor-pointer p-2 flex items-center justify-center hover:scale-110"
                style={{ width: "2rem" }}
                onClick={() => {
                  setTerm({ text: "", id: null });
                  dispatch(clearResults()); // clear suggestions when input is reset
                }}
              ></i>

              <input
                type="text"
                placeholder="Search items..."
                value={term.text}
                onChange={(e) => {
                  setTerm({ text: e.target.value, id: null });
                  setShowSuggestions(true);
                }}
                className="px-9 py-3 focus:outline-none w-full rounded-t-md"
                style={{ backgroundColor: "white" }}
              />
            </form>

            {/* Suggestions dropdown */}
            {term.text.trim() && showSuggestions && (
              <ul
                className="absolute w-full rounded-b-md shadow-md max-h-[12rem] overflow-y-auto"
                style={{ backgroundColor: "white" }}
              >
                {loading ? (
                  <li className="px-4 py-2 text-gray-500 font-semibold">
                    fetching...
                  </li>
                ) : data.length > 0 ? (
                  [...data]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((s) => (
                      <li
                        key={s.id}
                        onClick={() => handleSelect(s)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-start gap-2"
                      >
                        <img
                          src={s.image_url}
                          alt="dump image"
                          className="w-[1.8rem] h-[1.8rem] rounded-xl"
                        />
                        <span className="font-bold">{s.name}</span>
                      </li>
                    ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 font-semibold">
                    No such product found
                  </li>
                )}
              </ul>
            )}
          </div>

          <section className="flex items-center gap-x-8">
            <CartButton />
          </section>
        </nav>
      </div>
    </>
  );
}
