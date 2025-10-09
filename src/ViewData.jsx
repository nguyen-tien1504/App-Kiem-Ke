import { useEffect, useState } from "react";

const ViewData = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("productList");
    if (saved) setList(JSON.parse(saved));
  }, []);
  return (
    <div className="p-2">
      <div className="row text-center">
        <div className="col-2">Ma sp</div>
        <div className="col-4">Ten sp</div>
        <div className="col-2">Ton he thong</div>
        <div className="col-2">Ton thuc te</div>
        <div className="col-2">Chenh lech</div>
      </div>
      <div
        className="overflow-auto mt-2"
        style={{ height: "65vh" }}>
        {list.map((item) => (
          <div
            key={item.MaSp}
            className={`row px-0 py-1 text-center rowProduct ${
              item.TonThucTe == 0 ? "bg-danger-subtle" : ""
            }`}>
            <div className="col-2">{item.MaSp}</div>
            <div className="col-4">{item.TenSp}</div>
            <div className="col-2">{item.TonHeThong}</div>
            <div className="col-2">{item.TonThucTe}</div>
            <div className="col-2">{item.TonThucTe - item.TonHeThong}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewData;
