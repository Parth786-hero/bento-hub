export default function CatDesign({data}) {
    const {name , image_url} = data;
  return (
    <>
      <div className="mb-1 cursor-pointer">
        <div className="w-full h-[4rem] p-2">
          <img src={`/${image_url}`} alt="w-full" className="object-contain w-full h-full object-center"/>
        </div>
        <h2 className="text-[13px] text-center font-extrabold tracking-wider capitalize w-[80%] mx-auto">
          {name}
        </h2>
      </div>
    </>
  );
}
