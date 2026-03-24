import { useState } from "react";

export default function Donation({ onToggle , checked}) {
//   const [checked, setChecked] = useState(false);

//   const handleChange = (e) => {
//     const isChecked = e.target.checked;
//     setChecked(isChecked);
//     onToggle(isChecked); 
//     console.log(isChecked);
//   };

  return (
    <div className="mt-4 shadow-xl rounded-xl p-3 bg-white-pure grid justify-between grid-cols-[15%_69%_15%]">
      <div className="flex items-center justify-center self-center rounded-xl p-[.6rem] bg-gray-100 shadow-sm">
        <i className="text-3xl fa-solid text-green fa-hand-holding-dollar"></i>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="tracking-wide text-[1.2rem] font-extrabold w-[90%]">
          Feeding India Donation
        </h2>
        <p className="text-gray-600 text-left text-[10px] tracking-wide w-[90%] mx-auto">
          Working toward malnutrition free India. Please make an initiative guys please fo...
        </p>
      </div>
      <div className="flex items-center p-0 justify-around self-center">
        <p className="font-extrabold mt-[.01rem]">₹1</p>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
          className="custom-checkbox w-4 h-4 appearance-none border-2 border-green rounded-sm checked:bg-green checked:border-green"
        />
      </div>
    </div>
  );
}
