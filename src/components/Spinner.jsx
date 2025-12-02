import SpinnerGIF from "../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-full mt-[10vh] ">
      <img
        src={SpinnerGIF}
        className="block m-auto w-full md:w-[40%]"
      />
    </div>
  );
};

export default Spinner;