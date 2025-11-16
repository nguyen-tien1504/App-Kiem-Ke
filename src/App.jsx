import { Outlet } from "react-router";
import Navbar from "../components/navbar";

const App = () => {
  return (
    <div className="pb-2">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
