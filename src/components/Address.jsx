import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";
import { updateFormData , resetFormData} from "../store/slices/formSlice";
import { toast } from "react-toastify";
import { postUser } from "../store/slices/formSlice";
export default function Address() {
  const dispatch = useDispatch();
  const {form : formData , loading , error , success} = useSelector(bag=>bag.form);

  function checkAllFields(bag){
    for(let key in bag){
      
      if(!bag[key]) return false;
    }
    return true;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const btn = e.nativeEvent.submitter;
    
    if (btn.classList.contains("previousBtn")) {
      dispatch(changeModalStatus({ show: true, mode: "REGISTER" }));
    }else{
      if(checkAllFields(formData)){
        try{
          await dispatch(postUser(formData)).unwrap();
          toast.success("data submitted successfully");
          dispatch(resetFormData());
          dispatch(changeModalStatus({mode : "LOG_IN" , show : true}))

        }catch(err){
          toast.error(err);
        }
        
      }else{
        toast.error("All Fields are mandatory");
      }
    }

   
  }
  const mapper = {
    Mumbai: "Maharashtra",
    Pune: "Gujarat",
    Bengaluru: "Karnataka",
    Chennai: "Tamil Nadu",
    Ahmedabad: "Delhi"
  };
  
  function handleChange(e){
    const {id , value} = e.target;
   
    if(id === "city"){
    
      dispatch(updateFormData({city : value , "state" : mapper[value]}));
    }else{
      dispatch(updateFormData({[id] : value}));
    }
   
  }
 
  return (
    <>

   
      <div className="flex items-center justify-between h-auto relative">
     
        <form
          className="rounded-lg p-4 w-full relative mb-2"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
           

            {/* City Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray font-medium mb-2"
              >
                City
              </label>
              <select
                id="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                onChange={handleChange}
                value={formData.city}
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

             {/* State Dropdown */}
             <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-gray font-medium mb-2"
              >
                State
              </label>
              <select
                id="state"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                onChange={handleChange}
                value={formData.state}
                disabled
              >
                <option value="" disabled>
                  Select State
                </option>
                <option value="Maharashtra" className="option-theme">
                  Maharashtra
                </option>
                <option value="Gujarat" className="option-theme">
                  Gujrat
                </option>
                <option value="Karnataka" className="option-theme">
                  Karnataka
                </option>
                <option value="Tamil Nadu" className="option-theme">
                  Tamil Nadu
                </option>
                <option value="Delhi" className="option-theme">
                  Delhi
                </option>
              </select>
            </div>

            {/* Street Input */}
            <div className="mb-6">
              <label
                htmlFor="street"
                className="block text-gray font-medium mb-2"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter your locality/street"
                onChange={handleChange}
                value={formData.street}
              />
            </div>

            {/* ZipCode Input */}
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray font-medium mb-2"
              >
                ZipCode
              </label>
              <input
                type="number"
                id="zipcode"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter your zip code"
                onChange={handleChange}
                value={formData.zipcode}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            {
              loading ? <motion.button
              type="submit"
              disabled
              className="w-[70%] bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer tracking-wider"
            >
              Submitting...
            </motion.button> : <motion.button
              type="submit"
              className="w-[70%] bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer tracking-wider"
            >
              Final Process 2/2
            </motion.button>
            }
            <motion.button
              type="submit"
              className="previousBtn w-auto tracking-wide bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
            >
              Previous Stage
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );
}
