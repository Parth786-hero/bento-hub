export default function Footer() {
  const usefulLinks = [
    "Blog",
    "Privacy",
    "Terms",
    "FAQs",
    "Security",
    "Contact",
    "Partner",
    "Franchise",
    "Seller",
    "Warehouse",
    "Deliver",
    "Resources",
    "Recipes",
    "Bistro",
    "District",
  ];

  const categories = [
    "Vegetables & Fruits",
    "Dairy & Breakfast",
    "Munchies",
    "Cold Drinks & Juices",
    "Instant & Frozen Food",
    "Tea, Coffee & Health Drinks",
    "Bakery & Biscuits",
    "Sweet Tooth",
    "Atta, Rice & Dal",
    "Dry Fruits, Masala & Oil",
    "Sauces & Spreads",
    "Chicken, Meat & Fish",
    "Paan Corner",
    "Organic & Premium",
    "Baby Care",
    "Pharma & Wellness",
    "Cleaning Essentials",
    "Home & Office",
    "Ice Creams & Frozen Desserts",
    "Personal Care",
    "Pet Care",
    "Beauty & Cosmetics",
    "Magazines",
    "Fashion & Accessories",
    "Electronics & Electricals",
    "Stationery Needs",
    "Books",
    "Toys & Games",
    "Print Store",
    "E-Gift Cards",
  ];
  return (
    <>
      <div className="flex items-start justify-between mb-12 gap-x-12" id="links">
        <div className="w-[30%] self-stretch relative">
          <h2 className="font-extrabold text-xl tracking-wide">Useful links</h2>
          <ul className="grid grid-cols-3 gap-4 mt-3">
            {usefulLinks.map((ele, id) => (
              <p
                key={id}
                className="text-gray-600 font-normal text-[14px] tracking-wider cursor-pointer"
              >
                {ele}
              </p>
            ))}
          </ul>
          <h2
            className="w-full ml-[-.99rem] font-extrabold tracking-wide text-[3.5rem] flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center cursor-pointer animate-bento"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>
              <i className="fa-solid fa-blog"></i>
            </span>
            Bento <span className="text-green">Hub</span>
          </h2>
        </div>
        <div className="w-[70%]">
          <h2 className="font-extrabold text-xl tracking-wide">Categories</h2>
          <ul className="grid grid-cols-3 gap-4 mt-3">
            {categories.map((ele, id) => (
              <p
                key={id}
                className="text-gray-600 font-normal tracking-wider cursor-pointer text-[14px]"
              >
                {ele}
              </p>
            ))}
          </ul>
        </div>
      </div>
      <style> {` @keyframes bentoScale { 0% { transform: scale(1); } 50% { transform: scale(1.04) ; } 100% { transform: scale(1); } } .animate-bento { animation: bentoScale 2s infinite ease-in-out; } `} </style>
    </>
  );
}
