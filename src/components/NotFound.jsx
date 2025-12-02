import NotGif from "../assets/notFound.gif";

const NotFound = () => {
  return (
    <div className="w-full mt-[15vh] ">
        <h1 className="text-center text-white text-3xl">
            ...چیزی یافت نشد
        </h1>
        <img src={NotGif} className="block m-auto w-[30%] mt-10"/>
    </div>
  );
};

export default NotFound;