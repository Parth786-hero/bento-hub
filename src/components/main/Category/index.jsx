import { useEffect , useState , useRef} from "react";
import CategoryCard from "./CategoryCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../../store/slices/categorySlice";
import { ChevronRight, ChevronLeft } from "lucide-react";
// export default function Category() {
//   const { data, loading, error } = useSelector((bag) => bag.category);
//   const [showLeft , setShowLeft] = useState(true);
//   const [showRight , setShowRight] = useState(true);
//   const [translate , setTranslate] = useState(0);
//   const dispatch = useDispatch();
//   const roadRef = useRef(null);
//   const TRANSLATE_LIMIT = 200;
//   useEffect(() => {
//     dispatch(fetchCategory());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!roadRef.current) return;
  
//     const updateVisibility = () => {
//       if(!roadRef.current) return;
//       const totalRoad = roadRef.current.scrollWidth;
//       const currentView = roadRef.current.clientWidth;
//       const totalMotion = -(totalRoad - currentView);
  
//       // Show left if we’ve moved away from the start
//       setShowLeft(translate < 0);
  
//       // Show right if we haven’t reached the end yet

//       setShowRight(translate >= totalMotion);
      
//     };
  
//     // Run once immediately
//     updateVisibility();
  
//     const observer = new ResizeObserver(() => {
//       updateVisibility();
//     });
  
//     observer.observe(roadRef.current);
  
//     return () => {
//       observer.disconnect();
//     };
//   }, [translate]);
  
  
  

//   if (loading) {
//     return (
//       <div className="h-auto flex items-start justify-center">
//         <p className="text-center mt-16 text-2xl font-bold">
//           Loading categories...
//         </p>
//       </div>
//     );
//   }
//   if (error)
//     return (
//       <div className="h-auto flex items-start justify-center">
//         <p className="text-center mt-16 text-2xl font-bold text-red-500">
//           Error: {error}
//         </p>
//       </div>
//     );
//   return (
//     <>
//       <h2 className="font-bold text-2xl md:text-3xl tracking-wide leading-snug mt-6">
//         Featured Categories
//       </h2>
//       {/* <div className="my-1 grid grid-cols-5 md:grid-cols-11 mb-8">
       
//         {
//         data.map(obj=><CategoryCard key={obj.id} data={obj}/>)
//         }
//       </div> */}
//       <div className="my-1 mb-8 w-max-content relative " ref={roadRef}>
//         <div className="flex w-max-content transition-transform ease-in-out duration-300" style={{transform : `translateX(${translate}px)`}}>
//           {[...data, ...data, ...data, ...data ,...data].map((obj , id) => (
//             <CategoryCard key={id} data={obj} />
//           ))}
        
//         </div>
//         {
//           showLeft &&  <div
//           className="z-49 absolute top-1/2 transform -translate-y-1/2 left-3
//               text-white bg-green rounded-full cursor-pointer 
//               w-[2.5rem] h-[2.5rem] flex items-center justify-center 
//               transition-transform duration-300 ease-in-out 
//               hover:scale-110"
//               onClick={() => {
//                 setTranslate(prev => {
//                   // move right (backwards toward 0)
//                   return Math.min(prev + TRANSLATE_LIMIT, 0);
//                 });
//               }}
//         >
//           <ChevronLeft />
//         </div>
//          }
//           {
//             showRight && <div
//             className="z-49 absolute top-1/2 transform -translate-y-1/2 right-3
//                 text-white bg-green rounded-full cursor-pointer 
//                 w-[2.5rem] h-[2.5rem] flex items-center justify-center 
//                 transition-transform duration-300 ease-in-out 
//                 hover:scale-110"
//                 onClick={() => {
//                   setTranslate(prev => {
//                     if (!roadRef.current) return 0;
                
//                     const totalRoad = roadRef.current.scrollWidth;   // full content width
//                     const currentView = roadRef.current.clientWidth; // visible width
//                     const totalMotion = totalRoad - currentView;     // max scroll distance
//                     console.log(translate  , totalMotion);
//                     // move left (negative direction), clamp at -totalMotion
//                     return Math.max(prev - TRANSLATE_LIMIT, -totalMotion);
//                   });
//                 }}
                
                
//           >
//             <ChevronRight />
//           </div>
//           }
//       </div>
//     </>
//   );
// }
export default function Category() {
  const { data, loading, error } = useSelector((bag) => bag.category);
  const [showLeft, setShowLeft] = useState(false); // Should default to false at position 0
  const [showRight, setShowRight] = useState(true);
  const [translate, setTranslate] = useState(0);
  
  const dispatch = useDispatch();
  
  // We need two refs: one for the visible window, one for the long track
  const outerRef = useRef(null); 
  const innerRef = useRef(null); 
  const TRANSLATE_LIMIT = 200;

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    const updateVisibility = () => {
      if (!outerRef.current || !innerRef.current) return;

      const totalWidth = innerRef.current.scrollWidth;   // Total width of all items
      const visibleWidth = outerRef.current.clientWidth; // Width of the visible screen/container
      const maxScroll = Math.max(0, totalWidth - visibleWidth);

      // Show left if we are not at the very beginning (0)
      setShowLeft(translate < 0);

      // Show right if our current translation hasn't exceeded the max possible scroll
      // We use Math.abs() because translate is a negative number
      setShowRight(Math.abs(translate) < maxScroll);
    };

    // Run immediately
    updateVisibility();

    // Re-run if the window or container resizes
    const observer = new ResizeObserver(() => {
      updateVisibility();
    });

    if (outerRef.current) observer.observe(outerRef.current);
    if (innerRef.current) observer.observe(innerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [translate, data]); // Depend on data too, so it recalculates when items load

  const handleScrollLeft = () => {
    setTranslate((prev) => Math.min(prev + TRANSLATE_LIMIT, 0));
  };

  const handleScrollRight = () => {
    setTranslate((prev) => {
      if (!outerRef.current || !innerRef.current) return prev;
      
      const totalWidth = innerRef.current.scrollWidth;
      const visibleWidth = outerRef.current.clientWidth;
      const maxScroll = Math.max(0, totalWidth - visibleWidth);

      // Move left (negative), clamp it so it doesn't scroll past the end
      return Math.max(prev - TRANSLATE_LIMIT, -maxScroll);
    });
  };

  if (loading) {
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold">
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-16 text-2xl font-bold text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold text-2xl md:text-3xl tracking-wide leading-snug mt-6">
        Featured Categories
      </h2>
      
      {/* 1. Changed to w-full overflow-hidden and added outerRef */}
      <div className="my-1 mb-8 w-full overflow-hidden relative px-0" ref={outerRef}>
        
        {/* 2. Changed to w-max and added innerRef */}
        <div 
          className="flex w-max transition-transform ease-in-out duration-800 px-0 gap-x-1" 
          ref={innerRef}
          style={{ transform: `translateX(${translate}px)` }}
        >
          {/* 3. Fixed the map loop to use a unique key string */}
          {data.map((obj) => (
            <CategoryCard key={obj.id} data={obj} />
          ))}
        </div>

        {showLeft && (
          <div
            className="z-[49] absolute top-1/2 transform -translate-y-1/2 left-1.5
              text-white bg-green rounded-full cursor-pointer 
              w-[2.5rem] h-[2.5rem] flex items-center justify-center 
              transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleScrollLeft}
          >
            <ChevronLeft />
          </div>
        )}

        {showRight && (
          <div
            className="z-[49] absolute top-1/2 transform -translate-y-1/2 right-1.5
              text-white bg-green rounded-full cursor-pointer 
              w-[2.5rem] h-[2.5rem] flex items-center justify-center 
              transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleScrollRight}
          >
            <ChevronRight />
          </div>
        )}
      </div>
    </>
  );
}

