import { Outlet } from "react-router";
import Navbar from "../components/navbar";
// import Scanner from "../utils/scanner";

const App = () => {
  return (
    <div className="pb-4">
      <Navbar />
      <Outlet />
      {/* <div style={{ padding: 20 }}>
        <h3>Demo quét QR / Barcode</h3>
        <Scanner onDetected={(text) => setResult(text)} />
        <div style={{ marginTop: 16 }}>
          <strong>Kết quả:</strong>
          <div
            style={{
              marginTop: 8,
              padding: 12,
              background: "#f7f7f7",
              borderRadius: 6,
              minHeight: 40,
            }}>
            {result || <span style={{ color: "#888" }}>Chưa quét</span>}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default App;
