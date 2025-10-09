import { useEffect, useState } from "react";
import Row from "../components/row";
import ImportExcel from "../utils/importExcel";
function HomePage() {
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMasp, setSelectedMasp] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (list && list.length > 0) {
      localStorage.setItem("productList", JSON.stringify(list));
    }
  }, [list]);

  useEffect(() => {
    const saved = localStorage.getItem("productList");
    if (saved) setList(JSON.parse(saved));
  }, []);

  const onChangeQuantity = (quantity) => {
    if (!selectedMasp) return;
    const findProduct = list.find((p) => p.MaSp === selectedMasp);
    if (amount) {
      findProduct.TonThucTe = Number(amount);
      setList([...list]);
      setAmount("");
      return;
    }
    if (findProduct) {
      findProduct.TonThucTe += Number(quantity);
      setList([...list]);
    }
  };
  const data = list.filter(
    (item) =>
      String(item.MaSp).toLowerCase().includes(searchValue.toLowerCase()) ||
      String(item.TenSp).toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div
      className="p-1"
      style={{ fontSize: "14px" }}>
      <div className="px-5">
        <ImportExcel
          list={list}
          setList={setList}
        />
      </div>

      <div className="container mt-3">
        <div className="row text-center">
          <div className="col-2">Ma sp</div>
          <div className="col-6">Ten sp</div>
          <div className="col-2">Ton he thong</div>
          <div className="col-2">Ton thuc te</div>
        </div>
        <div
          className="row overflow-auto g-0 align-content-start"
          style={{ height: "50vh" }}>
          {data.map((item, index) => (
            <Row
              item={item}
              key={index}
              onHandleClick={() =>
                setSelectedMasp((prev) => (prev == item.MaSp ? null : item.MaSp))
              }
              isSelected={item.MaSp == selectedMasp}
            />
          ))}
        </div>
        <div className="mt-2">Tong so luong san pham: {data.length}</div>
      </div>

      <div className="input-group mt-2">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="productSearching"
            placeholder="Tim kiem san pham"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <label htmlFor="productSearching">Tim kiem san pham</label>
        </div>
      </div>
      <div className="input-group mt-2 gap-2">
        <div className="form-floating px-0">
          <input
            className="form-control rounded-2"
            id="floatingInputGrid"
            placeholder="Nhap so luong"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="floatingInputGrid">Nhap so luong</label>
          <button
            className="btn btn-primary py-2 mt-2"
            onClick={() => {
              onChangeQuantity(amount);
              setAmount("");
            }}>
            Cap nhat so luong
          </button>
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="row align-items-center justify-content-between">
            <button
              className="btn btn-success py-2 col-cus-4"
              onClick={() => onChangeQuantity(1)}>
              +1
            </button>
            <button
              className="btn btn-success py-2 col-cus-4"
              onClick={() => onChangeQuantity(6)}>
              +6
            </button>
            <button
              className="btn btn-success py-2 col-cus-4"
              onClick={() => onChangeQuantity(12)}>
              +12
            </button>
          </div>

          <div className="row align-items-center justify-content-between">
            <button
              className="btn btn-danger py-2 col-cus-4"
              onClick={() => onChangeQuantity(-1)}>
              -1
            </button>
            <button
              className="btn btn-danger py-2 col-cus-4"
              onClick={() => onChangeQuantity(-6)}>
              -6
            </button>
            <button
              className="btn btn-danger py-2 col-cus-4"
              onClick={() => onChangeQuantity(-12)}>
              -12
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
