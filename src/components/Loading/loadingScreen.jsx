import HashLoader from "react-spinners/HashLoader";
import "./loading-screen.scss";

const LoadingScreen = () => {
  const override = {
    display: "block",
    margin: "auto",
  };
  return (
    <div className="loading-screen">
      <HashLoader
        color={`#8A2BE2`}
        loading={true}
        size={150}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingScreen;
