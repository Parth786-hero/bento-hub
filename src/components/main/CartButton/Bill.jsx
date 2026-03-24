import { calculateGrandTotal } from "../../../utilis/priceUtils";

import Donation from "./Donation";
export default function Bill({ price, donation, setDonation }) {
  

  const basePrice = price + (donation ? 1 : 0);
  const grandTotal = calculateGrandTotal(basePrice);

  const obj = [
    {
      id: 1,
      iconOne: "fa-solid fa-table-list",
      text: "Items Total",
      price: price.toFixed(2),
      bold: false,
      free: false,

    },
    {
      id: 2,
      iconOne: "fa-solid fa-truck",
      text: "Delivery Charge",
      price: 30,
      bold: false,
      free: price >= 100,

    },
    {
      id: 3,
      iconOne: "fa-solid fa-bag-shopping",
      text: "Handling Charge",
      price: 11,
      bold: false,
      free: false,

    },
    ...(donation
      ? [
          {
            id: 5,
            iconOne: "fa-solid fa-hand-holding-dollar",
            text: "Donation Amount",
            price: Number(1),
            bold: false,
            free: false,
          },
        ]
      : []),
    {
      id: 4,
      iconOne: null,
      text: "Grand Total",
      price: grandTotal.toFixed(2),
      bold: true,
      free: false,

    },
    
  ];

  return (
    <>
      {/* Bill Details */}
      <div className="mt-4 shadow-xl rounded-xl p-3 bg-white-pure">
        <h1 className="font-extrabold mb-2 text-sm">Bill Details</h1>
        <div>
          {obj.map((ele) => (
            <div
              key={ele.id}
              className="flex items-center justify-between font-bold mb-2 text-xs"
            >
              <p className="flex items-center gap-2">
                {ele.iconOne && <i className={ele.iconOne}></i>}
                <span className={ele.bold ? "font-extrabold" : ""}>
                  {ele.text}
                </span>
              </p>

              {ele.free ? (
                <p className={`${ele.bold ? "font-extrabold" : ""} text-green`}>
                  FREE
                </p>
              ) : ele.text.toLowerCase() === "grand total" ? (
                <p className={ele.bold ? "font-extrabold" : ""}>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(ele.price)}
                </p>
              ) : (
                <p className={ele.bold ? "font-extrabold" : ""}>
                  ₹{ele.price}
                </p>
              )}
            </div>
          ))}

        </div>
      </div>
      <Donation checked={donation} onToggle={setDonation} />     
      {/* Cancellation Policy */}
      <div className="mt-4 shadow-xl rounded-xl p-3 bg-white-pure mb-4">
        <h1 className="font-extrabold mb-1 text-sm">Cancellation Policy</h1>
        <p className="text-gray-600 text-xs leading-relaxed">
          Orders cannot be cancelled once packed for delivery. In case of
          unexpected delays, a refund will be provided, if applicable.
        </p>
      </div>
    </>
  );
}
