import { useEffect, useState } from "react";

const ViewData = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("productList");
    if (saved) setList(JSON.parse(saved));
  }, []);
  return (
    <div
      className="p-2"
      style={{ fontSize: "14px" }}>
      <div className="row text-center">
        <div className="col-2">Mã SP</div>
        <div className="col-5">Tên SP</div>
        <div className="col-2">SL</div>
        <div className="col-2">Thực tế</div>
        <div className="col-1">Chênh lệch</div>
      </div>
      <div
        className="overflow-auto mt-2"
        style={{ height: "65vh" }}>
        {list.map((item) => (
          <div
            key={item.MaSp}
            className={`row px-0 py-1 text-center rowProduct ${
              item["Thực tế"] == 0 ? "bg-danger-subtle" : ""
            }`}>
            <div className="col-2">{item["Mã SP"]}</div>
            <div className="col-5">{item["Tên SP"]}</div>
            <div className="col-2">{item["SL"]}</div>
            <div className="col-2">{item["Thực tế"]}</div>
            <div className="col-1">{item["Thực tế"] - item["SL"]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewData;
