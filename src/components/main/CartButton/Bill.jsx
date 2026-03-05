export default function Bill(props) {
    const obj = [
      {
        id: 1,
        iconOne: "fa-solid fa-table-list",
        text: "Items Total",
        price: props.price,
        bold: false,
        free: false,
      },
      {
        id: 2,
        iconOne: "fa-solid fa-truck",
        text: "Delivery Charge",
        price: 30,
        bold: false,
        free: props.price >= 100, // free delivery if price >= 100
      },
      {
        id: 3,
        iconOne: "fa-solid fa-bag-shopping",
        text: "Handling Charge",
        price: 11,
        bold: false,
        free: false,
      },
      {
        id: 4,
        iconOne: null,
        text: "Grand Total",
        // Items + Delivery (if not free) + Handling
        price: (
          props.price + (props.price < 100 ? 30 : 0) + 11
        ).toFixed(2),
        bold: true,
        free: false,
      },
    ];
  
    return (
     <>
         <div className="mt-4 shadow-2xl rounded-xl p-3 bg-gray-50">
        <h1 className="font-extrabold mb-2">Bill Details</h1>
        <div>
          {obj.map((ele) => (
            <div
              key={ele.id}
              className="flex items-center justify-between font-bold mb-2 text-[12px]"
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
      <div className="mt-4 shadow-2xl rounded-xl p-3 bg-gray-50">
      <h1 className="font-extrabold mb-1">Cancellation Policy</h1>
      <p className="text-gray-600 text-[12px] tracking-wide">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
      </div>
     </>
    );
  }
  