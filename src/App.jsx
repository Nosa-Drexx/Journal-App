import { Provider } from "react-redux";
import { store } from "./store/store";
import AllRoutes from "./Routes";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </>
  );
};

export default App;
