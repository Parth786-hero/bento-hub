export default function Section() {
  return (
    <>
      <h1 className="text-left my-4 text-4xl font-semibold pl-0">
        Category <span className="text-green">Hub</span>
      </h1>
      <p className="text-justify pl-0 mb-7 tracking-wider text-gray-700 mt-[-.4rem] text-justify" id="vegetables">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
        assumenda inventore repellendus incidunt doloremque, officiis laboriosam
        voluptatem sed autem. Esse voluptatum minima tenetur, officiis id odit
        molestiae beatae laudantium impedit mollitia dolore quae omnis quibusdam
        possimus iusto hic molestias sunt.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Ut, ducimus at voluptate minima quae esse aut
        deserunt, labore iusto non debitis in quo facere exercitationem! Dolore
        et ipsum eum ratione.Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Laboriosam ex dolor reiciendis molestias eaque totam quibusdam,
        delectus id. Exercitationem, voluptates.
      </p>
      <div className="my-6 flex flex-col px-0 mt-4 gap-y-1 w-[100%] mx-auto relative">
        <div className="absolute overflow-hidden w-[16%] h-[16%] rounded-full right-[35rem] top-[16.5rem]">
          <img
            src="./apple.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-800 opacity-[5%]"></div>
        </div>
        <div className="absolute overflow-hidden w-[12%] h-[12%] rounded-full right-[49rem] top-[36rem]">
          <img
            src="./kiwi.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-300 opacity-[6%]"></div>
        </div>
        <div className="absolute overflow-hidden w-[10%] h-[10%] rounded-full right-[2rem] top-[56.5rem]">
          <img
            src="./bean.jpg"
            alt=""
            className="w-full h-full object-contain"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-400 opacity-[4%]"></div>
        </div>

        <div className="absolute overflow-hidden w-[8%] h-[8%] rounded-full right-[2rem] top-[-1rem]">
          <img
            src="./orange.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-800 opacity-[5%]"></div>
        </div>
       
        <div
          className="parent flex justify-between items-center min-h-[12rem] relative"
          
        >
          <i className="fa-solid fa-apple-whole text-green absolute text-[0rem] bottom-[-4rem] right-[30rem]"></i>
          <div className="w-[35%] self-stretch flex items-center justify-center">
            <div className="img-box-section1 rounded-full w-[20rem] h-[20rem] shadow-lg overflow-hidden"></div>
          </div>
          <div className="w-[60%] py-8 border-green">
            <h1 className="text-4xl mb-2 tracking-wide">
              Vegetables : <span className="text-green">The Catalyst</span>
            </h1>
            <p className="text-gray-700 tracking-wider leading-[1.5rem] text-justify" id="fruits">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at
              rem nisi provident inventore eaque expedita consectetur ea fugiat
              recusandae. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Aliquid placeat perferendis rerum sint sapiente sunt
              incidunt labore esse beatae quis?
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              repellat blanditiis nihil necessitatibus dignissimos, nostrum quam
              facere commodi, minima, unde iusto nulla sint animi alias magnam
              eaque tenetur quaerat odit.
            </p>
          </div>
        </div>
        <div
          className="parent flex justify-between items-center min-h-[12rem]"
          
        >
          <div className="w-[35%] self-stretch flex items-center justify-center order-1">
            <div className="img-box-section rounded-full w-[20rem] h-[20rem] shadow-lg overflow-hidden"></div>
          </div>
          <div className="w-[60%] py-8">
            <h1 className="text-4xl mb-2 tracking-wide">
              Fruits : <span className="text-green">The Healthy Dose</span>
            </h1>
            <p className="text-gray-700 tracking-wider leading-[1.5rem] text-justify" id="drinks">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at
              rem nisi provident inventore eaque expedita consectetur ea fugiat
              recusandae. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              placeat perferendis rerum sint sapiente sunt incidunt labore esse
              beatae quis? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ipsam quis ducimus repudiandae, blanditiis eligendi ut
              magnam odio consequatur culpa, distinctio, quam quae incidunt enim
              tenetur sit architecto deserunt! Mollitia a cumque unde magnam,
              qui culpa?
            </p>
          </div>
        </div>
        <div
          className="parent flex justify-between items-center min-h-[12rem]"
          
        >
          <div className="w-[35%] self-stretch flex items-center justify-center">
            <div className="img-box-section2 rounded-full w-[20rem] h-[20rem] shadow-lg overflow-hidden"></div>
          </div>
          <div className="w-[60%] py-8 pr-6 ">
            <h1 className="text-4xl mb-2 tracking-wide">
              Drinks : <span className="text-green">Energy Booster</span>
            </h1>
            <p className="text-gray-700 tracking-wider leading-[1.5rem] text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at
              rem nisi provident inventore eaque expedita consectetur ea fugiat
              recusandae. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Aliquid placeat perferendis rerum sint sapiente sunt
              incidunt labore esse beatae quis?
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              voluptas? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis possimus qui asperiores consequatur. Deserunt, fugit.
              Cumque, nisi. Labore esse praesentium illo? Ipsam recusandae ea
              pariatur corporis numquam explicabo delectus laudantium!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
